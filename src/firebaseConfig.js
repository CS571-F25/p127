import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace this with your own Firebase project's configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3fj0FIBglZY5CcXNpHwlBj1r4QVojy1Q",
  authDomain: "p127-8d53b.firebaseapp.com",
  projectId: "p127-8d53b",
  storageBucket: "p127-8d53b.firebasestorage.app",
  messagingSenderId: "53835413646",
  appId: "1:53835413646:web:7a4baa56ab206f7bc2f1df",
  measurementId: "G-VMMTY52SXY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the services you need
export const auth = getAuth(app);
export const db = getFirestore(app);