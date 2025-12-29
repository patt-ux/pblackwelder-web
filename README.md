# Patricia Blackwelder - Portfolio Website

Portfolio website built with React and Firebase.

## Project Structure

```
.
├── web/              # React application
│   ├── src/          # React source code
│   ├── public/       # Public assets
│   ├── build/        # Production build (generated)
│   └── package.json  # React app dependencies
├── functions/        # Firebase Cloud Functions
│   ├── index.js      # Function definitions
│   └── package.json  # Functions dependencies
├── firebase.json     # Firebase configuration
└── package.json      # Root workspace scripts
```

## Setup

### Initial Setup

1. Install root dependencies (Firebase CLI):
```bash
npm install
```

2. Install web app dependencies:
```bash
npm run install:web
```

3. Install functions dependencies:
```bash
npm run install:functions
```

Or install everything at once:
```bash
npm run install:all
```

### Environment Variables

1. Copy `web/env.example` to `web/.env`
2. Fill in your Firebase configuration values

## Development

### Run the React app:
```bash
npm start
```
This runs the development server from the `web/` directory.

### Run Firebase emulators (for testing functions):
```bash
npm run firebase:serve
```

## Building

### Build the React app:
```bash
npm run build
```

This builds the production version to `web/build/`.

## Deployment

### Deploy everything (hosting + functions):
```bash
npm run deploy
```

### Deploy only hosting:
```bash
npm run deploy:hosting
```

### Deploy only functions:
```bash
npm run deploy:functions
```

## Firebase Configuration

- **Hosting**: Serves from `web/build/`
- **Functions**: Located in `functions/`
- See `firebase.json` for full configuration

## Notes

- The React app is now in the `web/` directory for better organization
- Firebase hosting is configured to serve from `web/build/`
- All React-specific files (src, public, build) are in `web/`
- Cloud Functions remain in `functions/` at the root level

