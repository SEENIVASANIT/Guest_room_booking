// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPvRiQtpzRBoqcWZmzOmtjM3hLF_6kK3k",
  authDomain: "guest-room-booking-ba6e4.firebaseapp.com",
  projectId: "guest-room-booking-ba6e4",
  storageBucket: "guest-room-booking-ba6e4.appspot.com",
  messagingSenderId: "648124222780",
  appId: "1:648124222780:web:0596e003ed8c28aadd2239",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
