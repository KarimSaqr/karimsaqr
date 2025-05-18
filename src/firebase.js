import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
// Your web app's Firebase configuration
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