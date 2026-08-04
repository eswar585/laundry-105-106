// ==========================================
// Firebase Configuration
// Laundry Tracker V2
// ==========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    set,
    get,
    child,
    remove
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

// ==========================================
// Firebase Config
// ==========================================

const firebaseConfig = {
    apiKey: "AIzaSyBpSOTKv33YniPOVosU3FHSVoG6__SNTlg",
    authDomain: "laundry-management-32c18.firebaseapp.com",
    databaseURL: "https://laundry-management-32c18-default-rtdb.firebaseio.com",
    projectId: "laundry-management-32c18",
    storageBucket: "laundry-management-32c18.firebasestorage.app",
    messagingSenderId: "195267320338",
    appId: "1:195267320338:web:a89d3deba4d318ff8616cb",
    measurementId: "G-XZYPE7WQBN"
};

// ==========================================

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

// ==========================================
// Save Laundry Record
// ==========================================

export async function saveLaundry(record) {

    try {

        const newRef = push(ref(db, "laundry"));

        await set(newRef, record);

        return true;

    } catch (error) {

        console.error(error);

        return false;

    }

}

// ==========================================
// Load Laundry Records
// ==========================================

export async function loadLaundry() {

    try {

        const snapshot = await get(child(ref(db), "laundry"));

        if (!snapshot.exists()) return [];

        let records = [];

        snapshot.forEach(item => {

            records.push({

                id: item.key,

                ...item.val()

            });

        });

        return records.reverse();

    } catch (error) {

        console.error(error);

        return [];

    }

}

// ==========================================
// Delete Laundry Record
// ==========================================

export async function deleteLaundry(id) {

    try {

        await remove(ref(db, "laundry/" + id));

        return true;

    } catch (error) {

        console.error(error);

        return false;

    }

}

console.log("✅ Firebase Connected Successfully");
