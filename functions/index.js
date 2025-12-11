const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

admin.initializeApp();

// Rate limiting configuration
const RATE_LIMIT_WINDOW_HOURS = 1; // Time window in hours
const MAX_SUBMISSIONS_PER_WINDOW = 3; // Max submissions per email per window

/**
 * Verify reCAPTCHA token with Google
 */
async function verifyRecaptcha(token) {
  const secretKey = functions.config().recaptcha?.secret_key;
  
  if (!secretKey) {
    console.warn('reCAPTCHA secret key not configured. Skipping verification.');
    return { success: true, score: 1.0 }; // Allow if not configured
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
      }
    );

    const { success, score } = response.data;
    
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
    return { success: false, score: 0 };
  }
}

/**
 * Check if email has exceeded rate limit
 */
async function checkRateLimit(email) {
  const now = admin.firestore.Timestamp.now();
  const windowStart = new admin.firestore.Timestamp(
    now.seconds - (RATE_LIMIT_WINDOW_HOURS * 3600),
    now.nanoseconds
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
    return { allowed: true, count: 0, limit: MAX_SUBMISSIONS_PER_WINDOW };
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

      // Verify reCAPTCHA if token is provided
      if (submission.recaptchaToken) {
        const recaptchaResult = await verifyRecaptcha(submission.recaptchaToken);
        
        if (!recaptchaResult.success) {
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

      // Check rate limit
      if (!shouldDelete) {
        const rateLimitResult = await checkRateLimit(submission.email);
        
        if (!rateLimitResult.allowed) {
          console.warn(
            `Rate limit exceeded for ${submission.email}. ` +
            `Count: ${rateLimitResult.count}/${rateLimitResult.limit}`
          );
          shouldDelete = true;
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

