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

3. **Enable GitHub Pages**

   - Go to your repository on GitHub
   - Click "Settings" tab
   - Scroll down to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "gh-pages" branch and "/ (root)" folder
   - Click "Save"

4. **Enable GitHub Actions**
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

1. **Install Firebase CLI**

   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**

   ```bash
   firebase login
   ```

3. **Initialize Firebase**

   ```bash
   firebase init hosting
   ```

4. **Build and Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

## Environment Variables

For production deployment, make sure to:

1. Update Firebase configuration in `src/firebase/config.js`
2. Set up proper Firestore security rules
3. Consider using environment variables for sensitive data

## Troubleshooting

- **404 Errors**: Make sure the base path in `vite.config.js` matches your repository name
- **Build Failures**: Check the Actions tab for detailed error logs
- **Firebase Issues**: Verify your Firebase configuration and security rules
