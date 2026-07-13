// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyANLECIVy1U87UgJsQeyuCTBNjnRilMkaQ",
  authDomain: "viral-platform-66308.firebaseapp.com",
  projectId: "viral-platform-66308",
  storageBucket: "viral-platform-66308.firebasestorage.app",
  messagingSenderId: "337136851460",
  appId: "1:337136851460:web:3b7fdd65ceaa94ce72b351",
  measurementId: "G-XL8SLFPN3H"
};

// Inisialisasi
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
