# Firebase Hosting Deployment Guide

## Prerequisites
1. Node.js and npm installed
2. Firebase CLI installed globally: `npm install -g firebase-tools`

## Setup Steps

### 1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Login to Firebase
```bash
firebase login
```

### 3. Initialize Firebase in your project
```bash
firebase init hosting
```
- Select "Use an existing project" or create a new one
- Set public directory to: `build`
- Configure as single-page app: `Yes`
- Don't overwrite index.html: `No`

### 4. Update .firebaserc
Replace `your-firebase-project-id` in `.firebaserc` with your actual Firebase project ID.

### 5. Set up environment variables
1. Copy `env.example` to `.env`
2. Fill in your Firebase project details from the Firebase Console

### 6. Build and Deploy
```bash
# Build the React app
npm run build

# Deploy to Firebase
firebase deploy
```

## Available Scripts
- `npm run build` - Build the production version
- `npm run deploy` - Build and deploy to Firebase
- `firebase serve` - Test locally before deploying

## Firebase Console
- Go to [Firebase Console](https://console.firebase.google.com/)
- Select your project
- Navigate to Hosting to see your deployed site

## Custom Domain (Optional)
1. In Firebase Console > Hosting
2. Click "Add custom domain"
3. Follow the verification steps
4. Update your DNS records as instructed
