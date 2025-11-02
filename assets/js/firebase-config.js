// ============================
// Firebase Config & Init
// ============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
    getFirestore, collection
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// GANTI DENGAN CONFIG PUNYAMU DARI FIREBASE CONSOLE
const firebaseConfig = {
    apiKey: "AIzaSyAFarGwBXc5G4K2gNkML5bHBO9_O0jBISw",
    authDomain: "nilai-smp-app.firebaseapp.com",
    projectId: "nilai-smp-app",
    storageBucket: "nilai-smp-app.firebasestorage.app",
    messagingSenderId: "902547975735",
    appId: "1:902547975735:web:43a3c2f2b9b18bcef119b2",
};

// Init Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const nilaiCol = collection(db, "nilai_smp");
