// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize Firebase inside the background worker
firebase.initializeApp({
    apiKey: "AIzaSyBpSOTKv33YniPOVosU3FHSVoG6__SNTlg",
    authDomain: "laundry-management-32c18.firebaseapp.com",
    databaseURL: "https://laundry-management-32c18-default-rtdb.firebaseio.com",
    projectId: "laundry-management-32c18",
    storageBucket: "laundry-management-32c18.firebasestorage.app",
    messagingSenderId: "195267320338",
    appId: "1:195267320338:web:a89d3deba4d318ff8616cb"
});

const messaging = firebase.messaging();

// Handles background push notifications when the website tab is completely closed
messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const notificationTitle = payload.data.title || "🧺 Laundry Alert!";
    const notificationOptions = {
        body: payload.data.body || "Your laundry completed! Please collect your clothes.",
        icon: "https://cdn-icons-png.flaticon.com/512/3003/3003984.png",
        vibrate: [200, 100, 200, 100, 200],
        tag: "laundry-reminder"
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});
