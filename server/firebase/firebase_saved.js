// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_he6ELh7Xmhqj96tE2XKbSfS6VEMUOiE",
  authDomain: "order-it-72e77.firebaseapp.com",
  projectId: "order-it-72e77",
  storageBucket: "order-it-72e77.firebasestorage.app",
  messagingSenderId: "1049929708349",
  appId: "1:1049929708349:web:8c909b4f6decb6324acb54",
  measurementId: "G-VW4PJ3NSDW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const vapid_KEY = "BMoXamBGKrOsra6ZXVVs4BsfjLDqb55Lh7cr4ZGzwWgJd6qfW1IjAuYIBobjM0gqF1Z0qokDuA2hEBg75CUcZJI"