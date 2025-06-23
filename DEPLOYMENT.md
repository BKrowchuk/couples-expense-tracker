# Deployment Guide

## GitHub Pages Deployment

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

### Prerequisites

1. A GitHub account
2. Your code pushed to a GitHub repository

### Setup Steps

1. **Create GitHub Repository**

   - Go to GitHub.com and create a new repository
   - Name it `couples-expense-tracker` (or update the base path in `vite.config.js`)

2. **Push Your Code**

   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/couples-expense-tracker.git
   git branch -M main
   git push -u origin main
   ```

3. **Set Up Environment Variables**

   - Go to your repository on GitHub
   - Click "Settings" tab
   - Click "Secrets and variables" → "Actions"
   - Add the following repository secrets:
     - `VITE_FIREBASE_API_KEY`
     - `VITE_FIREBASE_AUTH_DOMAIN`
     - `VITE_FIREBASE_PROJECT_ID`
     - `VITE_FIREBASE_STORAGE_BUCKET`
     - `VITE_FIREBASE_MESSAGING_SENDER_ID`
     - `VITE_FIREBASE_APP_ID`
     - `VITE_FIREBASE_MEASUREMENT_ID`

4. **Enable GitHub Pages**

   - Go to your repository on GitHub
   - Click "Settings" tab
   - Scroll down to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "gh-pages" branch and "/ (root)" folder
   - Click "Save"

5. **Enable GitHub Actions**
   - Go to "Actions" tab in your repository
   - The workflow should automatically run on your first push
   - You can monitor the deployment progress here

### Custom Domain (Optional)

If you want to use a custom domain:

1. Add your domain in GitHub Pages settings
2. Update the `base` path in `vite.config.js` to `/`
3. Add a `CNAME` file in the `public` folder with your domain

## Firebase Hosting (Alternative)

You can also deploy to Firebase Hosting:

1. **Install Firebase CLI (if not already installed)**

   ```bash
   npm install -g firebase-tools
   ```

   Or use the local version:

   ```bash
   npm install
   ```

2. **Login to Firebase**

   ```bash
   npx firebase login
   ```

3. **Initialize Firebase (if not already done)**

   ```bash
   npx firebase init hosting
   ```

4. **Build and Deploy**

   ```bash
   npm run deploy
   ```

   Or manually:

   ```bash
   npm run build
   firebase deploy
   ```

## Environment Variables

For production deployment, make sure to:

1. Update Firebase configuration in `src/firebase/config.js`
2. Set up proper Firestore security rules
3. Use environment variables for sensitive data (already configured)

## Troubleshooting

### GitHub Pages 404 Errors

1. **Check Repository Name**: Make sure the base path in `vite.config.js` matches your repository name exactly
2. **Environment Variables**: Ensure all Firebase environment variables are set in GitHub Secrets
3. **Build Logs**: Check the Actions tab for build errors
4. **Base Path**: If your repository name is different, update the base path in `vite.config.js`:

   ```javascript
   base: process.env.NODE_ENV === "production" ? "/YOUR_REPO_NAME/" : "/",
   ```

### Firebase Issues

- **Command Not Found**: Install firebase-tools globally or use `npx firebase deploy`
- **Build Failures**: Check that all dependencies are installed with `npm install`
- **Configuration Issues**: Verify your Firebase configuration and security rules

### Common Solutions

- **Clear Cache**: Delete `node_modules` and `package-lock.json`, then run `npm install`
- **Rebuild**: Run `npm run build` locally to test the build process
- **Check Logs**: Always check the GitHub Actions logs for specific error messages
