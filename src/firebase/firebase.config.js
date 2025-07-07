// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
export default app;