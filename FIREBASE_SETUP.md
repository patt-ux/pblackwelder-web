# Firebase Project Setup Guide

Now that you have Cloud Functions set up, you need to configure a few things in your Firebase Console.

## Required Setup Steps

### 1. Enable Cloud Functions API

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **patty-web-cms**
3. Navigate to **Functions** in the left sidebar
4. If you see a "Get started" button, click it to enable Cloud Functions
5. This will automatically enable the Cloud Functions API

### 2. Enable Billing (Required for Cloud Functions)

⚠️ **Important**: Cloud Functions require a **Blaze plan** (pay-as-you-go), but you get a generous free tier:
- 2 million invocations/month free
- 400,000 GB-seconds compute time/month free
- 5 GB egress/month free

**Steps:**
1. In Firebase Console, click the **⚙️ Settings** gear icon
2. Select **Usage and billing**
3. Click **Modify plan** or **Upgrade to Blaze**
4. Follow the prompts to add a payment method
5. Don't worry - you won't be charged unless you exceed the free tier limits

### 3. Set Up Firestore Database

Your functions trigger on Firestore documents, so you need Firestore enabled:

1. In Firebase Console, go to **Firestore Database**
2. If not already created, click **Create database**
3. Choose **Start in test mode** (for now - you'll add security rules later)
4. Select a location (choose closest to your users)
5. Click **Enable**

### 4. Deploy Your Functions

Once the above is set up, deploy your functions:

```bash
# From the project root
npm run deploy:functions
```

Or:
```bash
firebase deploy --only functions
```

### 5. Verify Functions Are Deployed

1. Go to Firebase Console → **Functions**
2. You should see:
   - `onContactSubmission` (Firestore trigger)
   - `onCVDownloadRequest` (Firestore trigger)
   - `sendContactEmail` (HTTP function)

### 6. Test Your Setup

1. Submit the contact form on your website
2. Check Firebase Console → **Firestore Database** → `contactSubmissions` collection
3. Check Firebase Console → **Functions** → **Logs** to see function execution logs

## Optional: Security Rules

After testing, update Firestore security rules to prevent unauthorized access:

1. Go to **Firestore Database** → **Rules**
2. Update rules to something like:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write only from your app (client-side writes are allowed for now)
    // In production, you should restrict writes to authenticated users or use Cloud Functions
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 12, 31);
    }
  }
}
```

**Note**: The above is a temporary rule. For production, implement proper authentication or restrict writes to Cloud Functions only.

## Setting Up reCAPTCHA v3 (Spam Protection)

The contact form uses reCAPTCHA v3 for spam protection. Follow these steps:

### 1. Get reCAPTCHA Keys

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click **+ Create** to create a new site
3. Fill in the form:
   - **Label**: Your site name (e.g., "Patricia Blackwelder Portfolio")
   - **reCAPTCHA type**: Select **reCAPTCHA v3**
   - **Domains**: Add your domains:
     - `localhost` (for development)
     - Your production domain (e.g., `yourdomain.com`, `www.yourdomain.com`)
   - Accept the reCAPTCHA Terms of Service
4. Click **Submit**
5. Copy your **Site Key** and **Secret Key**

### 2. Configure Frontend (React App)

1. Copy `web/env.example` to `web/.env` (if not already done)
2. Add your reCAPTCHA Site Key:
   ```bash
   REACT_APP_RECAPTCHA_SITE_KEY=your-site-key-here
   ```
3. Restart your development server

### 3. Configure Backend (Cloud Functions)

Set the reCAPTCHA Secret Key in Firebase Functions config:

```bash
firebase functions:config:set recaptcha.secret_key="YOUR_SECRET_KEY_HERE"
```

**Important**: The secret key should never be exposed in client-side code. Only the site key goes in your React app.

### 4. Deploy Functions

After setting the config, redeploy your functions:

```bash
firebase deploy --only functions
```

### Rate Limiting

The contact form also includes rate limiting:
- **Limit**: 3 submissions per email address per hour
- Submissions exceeding this limit are automatically deleted
- Spam attempts are logged in the `spamLogs` collection

You can adjust these limits in `functions/index.js`:
- `RATE_LIMIT_WINDOW_HOURS`: Time window for rate limiting
- `MAX_SUBMISSIONS_PER_WINDOW`: Maximum submissions allowed per window

## Optional: Environment Variables

If you need to add secrets (like API keys for email services):

```bash
firebase functions:config:set sendgrid.key="YOUR_API_KEY"
```

Then access in code:
```javascript
const apiKey = functions.config().sendgrid.key;
```

## Monitoring

- **Function Logs**: Firebase Console → Functions → Logs
- **Firestore Data**: Firebase Console → Firestore Database
- **Usage/Billing**: Firebase Console → Settings → Usage and billing

## Troubleshooting

### "Billing account not found"
- You need to upgrade to Blaze plan (see step 2)

### "Functions API not enabled"
- Go to Functions section in Console and click "Get started"

### "Permission denied" errors
- Check Firestore security rules
- Ensure your Firebase project is properly initialized

### Functions not triggering
- Check that Firestore documents are being created
- Verify function names match in code and console
- Check function logs for errors

