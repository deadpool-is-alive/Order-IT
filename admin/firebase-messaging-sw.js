
importScripts(
  "https://www.gstatic.com/firebasejs/12.2.1/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/12.2.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
    apiKey: "AIzaSyA_he6ELh7Xmhqj96tE2XKbSfS6VEMUOiE",
    authDomain: "order-it-72e77.firebaseapp.com",
    projectId: "order-it-72e77",
    storageBucket: "order-it-72e77.firebasestorage.app",
    messagingSenderId: "1049929708349",
    appId: "1:1049929708349:web:8c909b4f6decb6324acb54"
});

// add to firebase-messaging-sw.js
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});


const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {
    
    console.log("[firebase-messaging-sw.js]", payload);

    const notificationTitle = payload.data.title;

    const notificationOptions = { body: payload.data.body};

    self.registration.showNotification(notificationTitle, notificationOptions);
});