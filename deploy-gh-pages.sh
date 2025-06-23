#!/bin/bash

echo "🚀 Starting GitHub Pages deployment process..."

# Check if gh-pages is available
if ! command -v gh-pages &> /dev/null; then
    echo "📦 Installing gh-pages globally..."
    npm install -g gh-pages
fi

# Build the project
echo "🔨 Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Deploy to GitHub Pages
    echo "🚀 Deploying to GitHub Pages..."
    gh-pages -d dist
    
    if [ $? -eq 0 ]; then
        echo "🎉 GitHub Pages deployment successful!"
        echo "📱 Your app should be available at: https://[your-username].github.io/couples-expense-tracker"
    else
        echo "❌ GitHub Pages deployment failed!"
        exit 1
    fi
else
    echo "❌ Build failed!"
    exit 1
fi 