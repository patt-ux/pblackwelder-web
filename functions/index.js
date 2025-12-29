const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

// Load environment variables for local development (emulator only)
// Use try-catch to avoid errors during Firebase deployment analysis
try {
  // Only load dotenv when not in production and when running locally
  if (process.env.NODE_ENV !== 'production' && !process.env.FIREBASE_CONFIG) {
    require('dotenv').config();
  }
} catch (error) {
  // dotenv is optional - ignore if not available
  // This can happen during Firebase deployment analysis
}

admin.initializeApp();

// Rate limiting configuration
const RATE_LIMIT_WINDOW_HOURS = 1; // Time window in hours
const MAX_SUBMISSIONS_PER_WINDOW = 3; // Max submissions per email per window

/**
 * Verify reCAPTCHA token with Google
 * @param {string} token - The reCAPTCHA token to verify
 * @return {Promise<{success: boolean, score: number}>} Verification result
 */
async function verifyRecaptcha(token) {
  // Use environment variable instead of deprecated functions.config()
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.warn('reCAPTCHA secret key not configured. Skipping verification.');
    return {success: true, score: 1.0}; // Allow if not configured
  }

  try {
    const response = await axios.post(
        'https://www.google.com/recaptcha/api/siteverify',
        null,
        {
          params: {
            secret: secretKey,
            response: token,
          },
        },
    );

    const {success, score} = response.data;

    // reCAPTCHA v3 returns a score from 0.0 to 1.0
    // 1.0 is very likely a human, 0.0 is very likely a bot
    // We'll accept scores >= 0.5
    const minScore = 0.5;

    return {
      success: success && score >= minScore,
      score: score || 0,
    };
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return {success: false, score: 0};
  }
}

/**
 * Detect spam patterns in submission content
 *
 * This function analyzes contact form submissions for common spam indicators:
 * - Explicit/adult content (common WordPress spam)
 * - Advertising/promotional language
 * - Generic promotional phrases
 * - Suspicious URLs and domains
 * - Financial scams
 * - Missing required fields for specific submission types
 *
 * @param {Object} submission - The submission object to analyze
 * @return {Object} Object with spam detection results including score and reasons
 */
function detectSpam(submission) {
  const spamPatterns = [
    // Advertising/promotional spam
    // eslint-disable-next-line max-len
    /\b(advertise|advertising|advertisement|ads|promote|promotion|marketing|seo|search engine optimization)\b/i,
    // eslint-disable-next-line max-len
    /\b(backlink|backlinks|link building|increase traffic|website traffic|organic traffic|boost your|improve ranking)\b/i,
    /\b(click here|visit our|check out|learn more about|see more|read more|find out more)\b/i,
    /\b(limited time|act now|don't miss|special offer|exclusive deal|discount|sale|buy now)\b/i,
    /\b(guaranteed|100% free|no cost|risk free|money back|free trial)\b/i,

    // Generic promotional phrases (common spam)
    /\b(i like your website|nice website|great site|love your site|beautiful website)\b/i,
    /\b(we can help|we offer|our services|our company|our team|we provide)\b/i,
    /\b(contact us|reach out|get in touch with us|call us|email us|visit us)\b/i,
    // eslint-disable-next-line max-len
    /\b(want to advertise|advertising opportunity|sponsorship|partnership opportunity)\b/i,

    // Explicit/adult content spam (common WordPress spam)
    /\b(sex|porn|xxx|adult|nude|naked|escort|hooker|prostitute|dating|singles|meet singles)\b/i,
    /\b(casual encounters|hookup|one night stand|fuck|fucking|dick|pussy|ass|bitch)\b/i,
    /\b(cam girl|camgirl|webcam|live cam|adult cam|sex cam|porn cam)\b/i,
    /\b(erotic|erotica|fetish|bdsm|kink|kinky|milf|cougar|sugar daddy)\b/i,
    /\b(penis|penis enlargement|male enhancement|viagra|cialis|levitra)\b/i,
    /\b(breast|boobs|tits|titties|ass|butt|buttocks|thigh|thighs)\b/i,
    /\b(orgasm|climax|cum|sperm|ejaculation|masturbat|masturbation)\b/i,
    /\b(strip club|stripclub|strip tease|lap dance|peep show)\b/i,
    /\b(swingers|swinger|swinging|threesome|orgy|orgies|gangbang)\b/i,
    /\b(incest|incestuous|rape|raping|molest|molestation|pedophile)\b/i,

    // Suspicious patterns
    /\b(bit\.ly|tinyurl|short\.link|goo\.gl|t\.co|ow\.ly)\b/i, // URL shorteners
    /\b(crypto|bitcoin|cryptocurrency|investment|trading|forex|nft)\b/i,
    /\b(loan|debt|credit|refinance|mortgage|quick cash|payday)\b/i,
    /\b(pharmacy|pills|medication|prescription)\b/i,
    /\b(work from home|make money|earn \$|get rich|passive income)\b/i,

    // Generic messages (often spam)
    /^(hi|hello|hey)[\s,]*$/i,
    /^(thanks?|thank you)[\s,]*$/i,
    /^(test|testing|test message)[\s,]*$/i,
    /^(spam|junk)[\s,]*$/i,
  ];

  // Combine all text fields for analysis
  const textContent = [
    submission.name || '',
    submission.email || '',
    submission.subject || '',
    submission.message || '',
    submission.company || '',
    submission.position || '',
    submission.location || '',
    submission.jobDescription || '',
    submission.projectDescription || '',
    submission.website || '',
    submission.budget || '',
    submission.timeline || '',
  ]
      .join(' ')
      .toLowerCase();

  // Check for spam patterns
  const matchedPatterns = [];
  for (const pattern of spamPatterns) {
    if (pattern.test(textContent)) {
      matchedPatterns.push(pattern.source);
    }
  }

  // Check for suspicious email domains
  const suspiciousEmailDomains = [
    /@(tempmail|guerrillamail|10minutemail|mailinator|throwaway)\./i,
    /@[a-z]{1,3}\.[a-z]{1,3}$/i, // Very short domains like a.b
  ];

  let suspiciousEmail = false;
  if (submission.email) {
    for (const pattern of suspiciousEmailDomains) {
      if (pattern.test(submission.email)) {
        suspiciousEmail = true;
        break;
      }
    }
  }

  // Check for excessive links
  const linkPattern = /https?:\/\/[^\s]+/gi;
  const links = textContent.match(linkPattern) || [];
  const hasExcessiveLinks = links.length > 2;

  // Check for repeated characters (spam technique)
  const repeatedCharPattern = /(.)\1{4,}/i; // Same character repeated 5+ times
  const hasRepeatedChars = repeatedCharPattern.test(textContent);

  // Check message length (very short messages are often spam)
  const messageText = (
    submission.message ||
    submission.jobDescription ||
    submission.projectDescription ||
    ''
  ).trim();
  const isTooShort = messageText.length < 10 && messageText.length > 0;

  // Check for generic names
  const genericNames = ['test', 'admin', 'user', 'guest', 'spam', 'bot'];
  const isGenericName = genericNames.some((name) =>
    submission.name && submission.name.toLowerCase().trim() === name,
  );

  // Calculate spam score
  let spamScore = 0;
  const reasons = [];

  if (matchedPatterns.length > 0) {
    // Check if explicit content patterns were matched
    const explicitPatterns = [
      /sex|porn|xxx|adult|nude|escort|hooker|prostitute|dating|singles|hookup/i,
      /fuck|dick|pussy|ass|bitch|cam girl|erotic|fetish|bdsm/i,
      /penis|breast|orgasm|strip|swinger|incest|rape|molest/i,
    ];

    const hasExplicitContent = explicitPatterns.some((pattern) =>
      pattern.test(textContent),
    );

    if (hasExplicitContent) {
      // Explicit content gets higher penalty
      spamScore += matchedPatterns.length * 5;
      reasons.push(`Explicit content detected (${matchedPatterns.length} pattern(s))`);
    } else {
      spamScore += matchedPatterns.length * 2;
      reasons.push(`Matched ${matchedPatterns.length} spam pattern(s)`);
    }
  }

  if (suspiciousEmail) {
    spamScore += 3;
    reasons.push('Suspicious email domain');
  }

  if (hasExcessiveLinks) {
    spamScore += 2;
    reasons.push(`Excessive links (${links.length})`);
  }

  if (hasRepeatedChars) {
    spamScore += 2;
    reasons.push('Repeated characters detected');
  }

  if (isTooShort && submission.subject === 'general') {
    spamScore += 1;
    reasons.push('Message too short');
  }

  if (isGenericName) {
    spamScore += 2;
    reasons.push('Generic name detected');
  }

  // Check for mismatched subject/content
  // If subject is "job" but no company/position provided, might be spam
  if (submission.subject === 'job' && (!submission.company || !submission.position)) {
    spamScore += 2;
    reasons.push('Job inquiry missing required fields');
  }

  // If subject is "project" but no budget/timeline, might be spam
  if (submission.subject === 'project' && (!submission.budget || !submission.timeline)) {
    spamScore += 2;
    reasons.push('Project inquiry missing required fields');
  }

  // Threshold: score >= 3 is considered spam
  const isSpam = spamScore >= 3;

  return {
    isSpam,
    spamScore,
    reasons: reasons.join('; '),
    matchedPatterns: matchedPatterns.slice(0, 5), // Limit to first 5 patterns
  };
}

/**
 * Check if email has exceeded rate limit
 * @param {string} email - The email address to check
 * @return {Promise<{allowed: boolean, count: number, limit: number}>} Rate limit status
 */
async function checkRateLimit(email) {
  const now = admin.firestore.Timestamp.now();
  const windowStart = new admin.firestore.Timestamp(
      now.seconds - (RATE_LIMIT_WINDOW_HOURS * 3600),
      now.nanoseconds,
  );

  try {
    // Query recent submissions from this email
    const recentSubmissions = await admin
        .firestore()
        .collection('contactSubmissions')
        .where('email', '==', email)
        .where('timestamp', '>=', windowStart)
        .get();

    return {
      allowed: recentSubmissions.size < MAX_SUBMISSIONS_PER_WINDOW,
      count: recentSubmissions.size,
      limit: MAX_SUBMISSIONS_PER_WINDOW,
    };
  } catch (error) {
    console.error('Error checking rate limit:', error);
    // On error, allow the submission (fail open)
    return {allowed: true, count: 0, limit: MAX_SUBMISSIONS_PER_WINDOW};
  }
}

/**
 * Cloud Function triggered when a new contact form submission is created
 * Verifies reCAPTCHA and checks rate limits
 */
exports.onContactSubmission = functions.firestore
    .document('contactSubmissions/{submissionId}')
    .onCreate(async (snap, context) => {
      const submission = snap.data();
      const submissionId = context.params.submissionId;

      console.log('New contact submission received:', submissionId);
      console.log('From:', submission.email);
      console.log('Subject:', submission.subject);

      let shouldDelete = false;
      let deleteReason = '';

      // Check honeypot field - if filled, it's definitely a bot
      if (submission.website_url && submission.website_url.trim() !== '') {
        console.warn(`Honeypot triggered for submission ${submissionId}. Bot detected.`);
        shouldDelete = true;
        deleteReason = 'Honeypot field filled (bot detected)';
      }

      // Verify reCAPTCHA if token is provided
      if (!shouldDelete && submission.recaptchaToken) {
        const recaptchaResult = await verifyRecaptcha(submission.recaptchaToken);

        if (!recaptchaResult.success) {
          // eslint-disable-next-line max-len
          console.warn(`reCAPTCHA verification failed for submission ${submissionId}. Score: ${recaptchaResult.score}`);
          shouldDelete = true;
          deleteReason = `reCAPTCHA verification failed (score: ${recaptchaResult.score})`;
        } else {
          console.log(`reCAPTCHA verified successfully. Score: ${recaptchaResult.score}`);
        }
      } else {
        console.warn(`No reCAPTCHA token provided for submission ${submissionId}`);
        // In production, you might want to delete submissions without tokens
        // For now, we'll allow them but log a warning
      }

      // Check spam patterns
      if (!shouldDelete) {
        const spamResult = detectSpam(submission);

        if (spamResult.isSpam) {
          console.warn(
              `Spam detected for submission ${submissionId}. ` +
              `Score: ${spamResult.spamScore}, Reasons: ${spamResult.reasons}`,
          );
          shouldDelete = true;
          deleteReason = `Spam detected (score: ${spamResult.spamScore}): ${spamResult.reasons}`;
        } else if (spamResult.spamScore > 0) {
          // Log suspicious but not spam submissions
          console.log(
              `Suspicious submission ${submissionId} (score: ${spamResult.spamScore}) but below threshold`,
          );
        }
      }

      // Check rate limit
      if (!shouldDelete) {
        const rateLimitResult = await checkRateLimit(submission.email);

        if (!rateLimitResult.allowed) {
          console.warn(
              `Rate limit exceeded for ${submission.email}. ` +
              `Count: ${rateLimitResult.count}/${rateLimitResult.limit}`,
          );
          shouldDelete = true;
          // eslint-disable-next-line max-len
          deleteReason = `Rate limit exceeded: ${rateLimitResult.count} submissions in the last ${RATE_LIMIT_WINDOW_HOURS} hour(s)`;
        }
      }

      // Delete submission if it failed verification or rate limiting
      if (shouldDelete) {
        console.log(`Deleting spam submission ${submissionId}. Reason: ${deleteReason}`);
        await snap.ref.delete();

        // Optionally, log spam attempts
        await admin.firestore().collection('spamLogs').add({
          submissionId,
          email: submission.email,
          reason: deleteReason,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });

        return null;
      }

      // Submission passed all checks
      console.log(`Contact submission ${submissionId} verified and accepted`);

      // TODO: Add email notification logic here
      // Example: Send email using nodemailer, SendGrid, etc.

      return null;
    });

/**
 * Cloud Function triggered when a new CV download request is created
 * This can be used to send email notifications, track analytics, etc.
 */
exports.onCVDownloadRequest = functions.firestore
    .document('cvDownloadRequests/{requestId}')
    .onCreate(async (snap, context) => {
      const request = snap.data();
      const requestId = context.params.requestId;

      console.log('New CV download request:', requestId);
      console.log('Email:', request.email);
      console.log('Timestamp:', request.timestamp);

      // TODO: Add email notification logic here
      // Example: Send email to yourself when someone downloads your CV
      // For now, we'll just log it

      return null;
    });

/**
 * HTTP Cloud Function to send contact form email (optional alternative approach)
 * You can call this from your frontend if you prefer HTTP triggers
 */
exports.sendContactEmail = functions.https.onRequest(async (req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  try {
    const {name, email, subject, message} = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      res.status(400).json({error: 'Missing required fields'});
      return;
    }

    // Save to Firestore
    const docRef = await admin.firestore().collection('contactSubmissions').add({
      name,
      email,
      subject,
      message,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      status: 'new',
      source: 'http-function',
    });

    // TODO: Send email notification here

    res.status(200).json({
      success: true,
      id: docRef.id,
      message: 'Contact form submitted successfully',
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({error: 'Internal server error'});
  }
});

