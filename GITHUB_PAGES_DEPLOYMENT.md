# GitHub Pages Deployment Guide

This guide will help you deploy your Vue.js expense tracker to GitHub Pages while maintaining Firebase database connectivity.

## Prerequisites

1. Your code is pushed to a GitHub repository
2. Firebase project is set up and configured
3. Environment variables are properly configured

## Step 1: Configure Repository Settings

1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. This will allow the workflow to deploy automatically

## Step 2: Set Up Environment Variables

You need to add your Firebase configuration as GitHub Secrets:

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add the following secrets:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_FIREBASE_MEASUREMENT_ID`

## Step 3: Update Homepage URL

In `package.json`, update the homepage field with your actual GitHub username:

```json
{
  "homepage": "https://your-github-username.github.io/couples-expense-tracker"
}
```

## Step 4: Configure Firebase for GitHub Pages

1. Go to your Firebase Console
2. Navigate to **Authentication** → **Settings** → **Authorized domains**
3. Add your GitHub Pages domain: `your-github-username.github.io`

## Step 5: Deploy

### Option A: Automatic Deployment (Recommended)

- Push your code to the `main` branch
- GitHub Actions will automatically build and deploy to GitHub Pages

### Option B: Manual Deployment

```bash
# Install gh-pages if not already installed
npm install -g gh-pages

# Deploy manually
npm run deploy:gh-pages
```

## Step 6: Verify Deployment

1. Wait for the GitHub Actions workflow to complete
2. Visit your GitHub Pages URL: `https://your-github-username.github.io/couples-expense-tracker`
3. Test the Firebase connectivity by trying to log in or add an expense

## Troubleshooting

### Firebase Connection Issues

- Ensure all environment variables are set correctly in GitHub Secrets
- Check that your Firebase project allows your GitHub Pages domain
- Verify the Firebase configuration in `src/firebase/config.js`

### Build Issues

- Check the GitHub Actions logs for build errors
- Ensure all dependencies are properly installed
- Verify the Vite configuration is correct

### Routing Issues

- The app uses Vue Router with hash mode for GitHub Pages compatibility
- All routes should work correctly with the configured base path

## Important Notes

- GitHub Pages serves your app over HTTPS, which is required for Firebase
- The app will be available at: `https://your-github-username.github.io/couples-expense-tracker`
- Firebase database connectivity will work as long as the environment variables are properly configured
- The deployment is automatic on every push to the main branch
