# Setup Guide - Couple's Expense Tracker

## Quick Start

Once you have network connectivity, follow these steps:

### 1. Install Dependencies
```bash
npm install
```

If you encounter network issues, try:
```bash
# Clear npm cache
npm cache clean --force

# Try with different registry
npm install --registry https://registry.npmjs.org/

# Or use yarn as alternative
yarn install
```

### 2. Firebase Setup (IMPORTANT)

Before running the app, you **must** configure Firebase:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
4. Go to Project Settings > General > Your apps
5. Add a web app and copy the configuration
6. Replace the placeholder config in `src/firebase/config.js`:

```javascript
// Replace these values with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789"
}
```

### 3. Firestore Security Rules

In Firebase Console > Firestore Database > Rules, set:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /expenses/{document} {
      allow read, write: if true;
    }
  }
}
```

### 4. Run the App
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Testing the App

1. **Login**: Enter "b" or "m" as username
2. **Add Expense**: Fill out the form with:
   - Amount: e.g., 25.50
   - Description: e.g., "Lunch at restaurant"
   - Category: e.g., "Food" (optional)
   - Split Type: Choose "Shared" or "Individual"
   - For shared: optionally specify custom amount owed
3. **View Dashboard**: See totals and balance calculations
4. **Search/Sort**: Use the expense table features
5. **Export**: Download CSV of all expenses

## Key Features Demonstrated

- ✅ Vue 3 Composition API
- ✅ Firebase Firestore integration
- ✅ Real-time data synchronization
- ✅ Mobile-responsive design
- ✅ Tailwind CSS styling
- ✅ Split expense calculations
- ✅ CSV export functionality
- ✅ Search and sort capabilities

## Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Vue 3 App     │◄──►│   Firebase       │◄──►│   Firestore     │
│                 │    │   SDK            │    │   Database      │
│ • Login         │    │                  │    │                 │
│ • Dashboard     │    │ • Real-time      │    │ • Expenses      │
│ • Expense Form  │    │   listeners      │    │   Collection    │
│ • Expense Table │    │ • CRUD ops       │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## Troubleshooting

### Common Issues:

1. **"Firebase is not defined"**
   - Check that you've replaced the Firebase config with real values
   - Ensure Firebase project has Firestore enabled

2. **"Permission denied"**
   - Verify Firestore security rules are set correctly
   - Check that your Firebase project is active

3. **"Network error"**
   - Check internet connection
   - Try clearing npm cache: `npm cache clean --force`

4. **Styles not loading**
   - Ensure Tailwind CSS is properly installed
   - Check if `npm run dev` shows any CSS compilation errors

### Development Tips:

- Open browser dev tools to monitor Firebase operations
- Check Firestore console to see data being added
- Use Vue DevTools extension for debugging component state
- Test on mobile devices for responsive design

## Next Steps

After basic setup:

1. **Security**: Implement Firebase Authentication for production
2. **Features**: Add expense categories management
3. **UI**: Customize colors/theme in Tailwind config
4. **Analytics**: Add expense reporting and charts
5. **PWA**: Make it installable as a mobile app

Happy coding! 🚀 