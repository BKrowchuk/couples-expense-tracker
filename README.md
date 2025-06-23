# Couple's Expense Tracker

A mobile-friendly web application built with Vue 3 and Firebase Firestore for tracking expenses between two people ("B" and "M").

## Features

- 🔐 Simple login system (no authentication required, just username validation)
- 💰 Add expenses with amount, description, category, and date
- 🔄 Split expenses between partners with custom or 50/50 splits
- 📊 Real-time expense tracking and balance calculations
- 📱 Mobile-responsive design
- 🔍 Search and sort expenses
- 📈 Dashboard with spending summaries
- 📥 CSV export functionality
- ⚡ Real-time synchronization across devices

## Tech Stack

- **Frontend**: Vue 3 with Composition API
- **Backend**: Firebase Firestore
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Authentication**: Manual username input (no Firebase Auth)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Configuration

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Set up Firestore security rules (see below)
4. Get your Firebase configuration from Project Settings
5. Replace the placeholder values in `src/firebase/config.js` with your actual Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-actual-app-id"
}
```

### 3. Firestore Security Rules

Set up these Firestore rules in your Firebase console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to expenses collection
    match /expenses/{document} {
      allow read, write: if true;
    }
  }
}
```

> **Note**: These rules allow public access. For production use, consider implementing proper authentication and more restrictive rules.

### 4. Run the Application

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

### Login
- Enter either "b" or "m" (case-insensitive) as your username
- The username is stored locally and used to tag your expenses

### Adding Expenses
1. Fill in the expense form with:
   - **Amount**: The expense amount (required)
   - **Description**: What the expense was for (required)
   - **Category**: Optional category (e.g., Food, Transport)
   - **Date**: Date of expense (defaults to today)
   - **Split Type**: 
     - "Shared" - split between both users
     - "Individual" - only for the current user
2. For shared expenses, optionally specify a custom amount the other person owes
3. Click "Add Expense" to save

### Dashboard Features
- **Summary Cards**: Shows total expenses, individual totals, and current balance
- **Settlement Details**: Shows who owes whom and how much
- **Expense Table**: 
  - Search by description or category
  - Sort by date, user, or amount
  - Mobile-responsive design
  - Export to CSV

### Balance Calculations
- **Individual expenses**: Only affect the person who made them
- **Shared expenses**: 
  - Default 50/50 split if no custom amount specified
  - Custom split if amount specified for what the other person owes
  - Balance shows net amount owed between users

## File Structure

```
src/
├── components/
│   ├── ExpenseForm.vue      # Form for adding expenses
│   ├── ExpenseSummary.vue   # Dashboard summary cards
│   └── ExpenseTable.vue     # Expense list with search/sort
├── firebase/
│   ├── config.js           # Firebase configuration
│   └── expenses.js         # Firestore operations
├── router/
│   └── index.js            # Vue Router configuration
├── views/
│   ├── Dashboard.vue       # Main app view
│   └── Login.vue          # Login page
├── App.vue                # Main app component
├── main.js               # App entry point
└── style.css            # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Security Notes

- This app uses manual username input without authentication
- Firestore rules are set to public access for simplicity
- For production use, implement proper Firebase Authentication
- Consider adding user-specific data isolation

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

If you encounter any issues:
1. Check that your Firebase configuration is correct
2. Ensure Firestore is enabled in your Firebase project
3. Verify that the security rules are properly set
4. Check the browser console for any error messages

Happy expense tracking! 💰📱 