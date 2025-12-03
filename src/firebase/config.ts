// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArsw8NX0TUu8MPpiZuB70h6molH2dxoGE",
  authDomain: "uang-bijak-51b82.firebaseapp.com",
  projectId: "uang-bijak-51b82",
  storageBucket: "uang-bijak-51b82.firebasestorage.app",
  messagingSenderId: "736788753766",
  appId: "1:736788753766:web:d67c331e48343fdfc5aca7",
  measurementId: "G-BQ7Q5FYG43"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}


export { app, auth, analytics };
