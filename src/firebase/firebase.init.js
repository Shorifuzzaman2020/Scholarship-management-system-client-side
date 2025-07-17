

// firebase.init.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBMHQBFSPvDSsQf4ZEjezqrFsp2AVyihYA",
  authDomain: "scholarship-handle.firebaseapp.com",
  projectId: "scholarship-handle",
  storageBucket: "scholarship-handle.firebasestorage.app",
  messagingSenderId: "254946395854",
  appId: "1:254946395854:web:2e7d79c5a9b04a0712329f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
