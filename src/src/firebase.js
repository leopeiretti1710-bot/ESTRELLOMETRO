// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJuY5Welc_EM9_nvmIuRh9mNOVhDSY9Mo",
  authDomain: "estrellometro-6e101.firebaseapp.com",
  projectId: "estrellometro-6e101",
  storageBucket: "estrellometro-6e101.firebasestorage.app",
  messagingSenderId: "1095791386780",
  appId: "1:1095791386780:web:1bbe571eb2c6ddfe650d59",
  measurementId: "G-QDT491N3VH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);