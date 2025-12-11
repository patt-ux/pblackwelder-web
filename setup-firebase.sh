#!/bin/bash

echo "🚀 Setting up Firebase Hosting for your React app..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "📦 Installing Firebase CLI..."
    npm install -g firebase-tools
else
    echo "✅ Firebase CLI is already installed"
fi

# Login to Firebase
echo "🔐 Logging into Firebase..."
firebase login

# Initialize Firebase hosting
echo "⚙️  Initializing Firebase hosting..."
firebase init hosting

echo ""
echo "🎉 Firebase setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .firebaserc with your project ID"
echo "2. Copy env.example to .env and fill in your Firebase details"
echo "3. Run 'npm run deploy' to build and deploy"
echo ""
echo "For detailed instructions, see firebase-deploy.md"
