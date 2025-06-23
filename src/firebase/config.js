// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCUwoqFgcERGRIltVqv61rJin2SIaqh5c",
  authDomain: "expense-tracker-29077.firebaseapp.com",
  projectId: "expense-tracker-29077",
  storageBucket: "expense-tracker-29077.firebasestorage.app",
  messagingSenderId: "332868270887",
  appId: "1:332868270887:web:962a5db8e09493d91b8702",
  measurementId: "G-MZQ5TKZBHQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

// Export the database instance
export { db };
