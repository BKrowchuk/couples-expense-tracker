# Environment Variables Setup

This guide explains how to set up environment variables for secure configuration management.

## Local Development Setup

### 1. Create Local Environment File

Copy the example file and fill in your Firebase configuration:

```bash
cp .env.example .env.local
```

### 2. Update .env.local with Your Firebase Config

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-actual-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### 3. Get Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon → "Project settings"
4. Scroll down to "Your apps" section
5. Copy the configuration values

## Production Deployment (GitHub Pages)

### 1. Add GitHub Secrets

1. Go to your GitHub repository
2. Click "Settings" tab
3. Click "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Add each environment variable:

| Secret Name                         | Value                             |
| ----------------------------------- | --------------------------------- |
| `VITE_FIREBASE_API_KEY`             | Your Firebase API key             |
| `VITE_FIREBASE_AUTH_DOMAIN`         | Your Firebase auth domain         |
| `VITE_FIREBASE_PROJECT_ID`          | Your Firebase project ID          |
| `VITE_FIREBASE_STORAGE_BUCKET`      | Your Firebase storage bucket      |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Your Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID`              | Your Firebase app ID              |
| `VITE_FIREBASE_MEASUREMENT_ID`      | Your Firebase measurement ID      |

### 2. Verify Deployment

After pushing to GitHub:

1. Go to "Actions" tab
2. Check that the build completes successfully
3. Your app will be deployed with the environment variables

## Environment Variable Naming Convention

- **VITE\_** prefix: Required for Vite to expose variables to the client
- **FIREBASE\_** prefix: Identifies Firebase-related variables
- **Uppercase with underscores**: Standard environment variable format

## Security Best Practices

### ✅ Do's

- Use environment variables for all sensitive data
- Keep `.env.local` in `.gitignore`
- Use different Firebase projects for development and production
- Regularly rotate API keys
- Use Firebase security rules to restrict access

### ❌ Don'ts

- Never commit `.env.local` to version control
- Don't hardcode API keys in source code
- Don't share environment files publicly
- Don't use the same Firebase project for development and production

## Troubleshooting

### Environment Variables Not Loading

1. Check that variables start with `VITE_`
2. Restart your development server
3. Verify `.env.local` file exists and is in the root directory

### Build Failures

1. Check GitHub Actions logs for missing environment variables
2. Verify all secrets are set in GitHub repository settings
3. Ensure variable names match exactly (case-sensitive)

### Firebase Connection Issues

1. Verify Firebase configuration values are correct
2. Check Firebase project settings
3. Ensure Firestore is enabled in your Firebase project

## Alternative Deployment Platforms

### Vercel

```bash
# Add environment variables in Vercel dashboard
# Or use vercel.json
{
  "env": {
    "VITE_FIREBASE_API_KEY": "your-api-key"
  }
}
```

### Netlify

```bash
# Add environment variables in Netlify dashboard
# Or use netlify.toml
[context.production.environment]
  VITE_FIREBASE_API_KEY = "your-api-key"
```

### Firebase Hosting

```bash
# Environment variables are automatically available
# No additional configuration needed
```
