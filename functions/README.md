# Firebase Cloud Functions

This directory contains Firebase Cloud Functions for handling form submissions and other backend operations.

## Setup

1. Install dependencies:
```bash
cd functions
npm install
```

## Available Functions

### `onContactSubmission`
- **Type**: Firestore Trigger
- **Trigger**: When a new document is created in `contactSubmissions` collection
- **Purpose**: Handles new contact form submissions (can send email notifications, etc.)

### `onCVDownloadRequest`
- **Type**: Firestore Trigger
- **Trigger**: When a new document is created in `cvDownloadRequests` collection
- **Purpose**: Handles CV download requests (can send email notifications, track analytics, etc.)

### `sendContactEmail`
- **Type**: HTTP Function
- **Endpoint**: `https://[region]-[project-id].cloudfunctions.net/sendContactEmail`
- **Purpose**: Alternative HTTP endpoint for contact form submissions (optional)

## Development

### Test locally with emulator:
```bash
npm run serve
```

### Deploy functions:
```bash
npm run deploy
```

Or from the root directory:
```bash
firebase deploy --only functions
```

## Adding Email Notifications

To add email notifications, you'll need to:

1. Install an email service package (e.g., `nodemailer`, `@sendgrid/mail`)
2. Add your email service credentials as environment variables:
   - **For production**: Use `firebase functions:secrets:set SENDGRID_API_KEY` (or your service's key name)
   - **For local development**: Add to your `.env` file: `SENDGRID_API_KEY=your-api-key-here`
3. Update the functions in `index.js` to send emails using `process.env.SENDGRID_API_KEY` (or your service's key name)

## Environment Variables

**⚠️ IMPORTANT:** The `functions.config()` API is deprecated and will stop working after December 31, 2025. We now use environment variables instead.

### For Production (Firebase Hosting)

Set environment variables using Firebase Functions secrets:
```bash
firebase functions:secrets:set RECAPTCHA_SECRET_KEY
```

Or set them directly in the Firebase Console under Functions > Configuration > Environment Variables.

### For Local Development

1. Create a `.env` file in the `functions` directory:
```bash
cd functions
cp .env.example .env  # If .env.example exists, or create manually
```

2. Add your environment variables to `.env`:
```env
RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key-here
```

3. The `.env` file is automatically loaded when running locally (via `dotenv`).

### Accessing Environment Variables in Code

```javascript
// Use process.env instead of deprecated functions.config()
const secretKey = process.env.RECAPTCHA_SECRET_KEY;
```

### Migration from functions.config()

If you previously used:
```bash
firebase functions:config:set recaptcha.secret_key="YOUR_KEY"
```

You now need to:
1. Set the environment variable: `firebase functions:secrets:set RECAPTCHA_SECRET_KEY`
2. Update your code to use `process.env.RECAPTCHA_SECRET_KEY` instead of `functions.config().recaptcha?.secret_key`

