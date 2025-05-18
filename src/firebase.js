// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getFirestore } from "./node_modules/firebase/firestore";



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5mTMiqi5x1_Xb8uNNKxWAluFrIUktnrI",
  authDomain: "karimyoussry-site.firebaseapp.com",
  projectId: "karimyoussry-site",
  storageBucket: "karimyoussry-site.firebasestorage.app",
  messagingSenderId: "999778133738",
  appId: "1:999778133738:web:2e5585804d79ce5cf89993",
  measurementId: "G-K62JVW7R4J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
