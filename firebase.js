// Firebase Configuration

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// Firebase Config

const firebaseConfig = {

    apiKey: "AIzaSyBpSOTKv33YniPOVosU3FHSVoG6__SNTlg",

    authDomain: "laundry-management-32c18.firebaseapp.com",

    projectId: "laundry-management-32c18",

    storageBucket: "laundry-management-32c18.firebasestorage.app",

    messagingSenderId: "195267320338",

    appId: "1:195267320338:web:a89d3deba4d318ff8616cb",

    measurementId: "G-XZYPE7WQBN"

};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Firestore Database

const db = getFirestore(app);

// Export Database

export { db };
