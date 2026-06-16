import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import { getMessaging, getToken, onMessage }
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyA_he6ELh7Xmhqj96tE2XKbSfS6VEMUOiE",
  authDomain: "order-it-72e77.firebaseapp.com",
  projectId: "order-it-72e77",
  storageBucket: "order-it-72e77.firebasestorage.app",
  messagingSenderId: "1049929708349",
  appId: "1:1049929708349:web:8c909b4f6decb6324acb54",
  measurementId: "G-VW4PJ3NSDW"
};



export async function generateFCMToken(){

    try{

        const registration = await navigator.serviceWorker.register("./firebase-messaging-sw.js", {updateViaCache:"none"});

        await registration.update();


        const token = await getToken(messaging, {vapidKey: "BMoXamBGKrOsra6ZXVVs4BsfjLDqb55Lh7cr4ZGzwWgJd6qfW1IjAuYIBobjM0gqF1Z0qokDuA2hEBg75CUcZJI"});

        console.log("FCM TOKEN: ", token);

        return token;
    } catch (err){
        console.error("FCM ERROR: ", err);

        return null;
    }
}


const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);


export {messaging};

// console.log("Firebase loaded");