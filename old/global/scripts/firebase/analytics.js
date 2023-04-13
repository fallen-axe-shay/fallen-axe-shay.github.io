// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuPMkPUIsig823_JeZvmx3JhfzAhLgzT4",
  authDomain: "my-portfolio-763d8.firebaseapp.com",
  projectId: "my-portfolio-763d8",
  storageBucket: "my-portfolio-763d8.appspot.com",
  messagingSenderId: "291546621609",
  appId: "1:291546621609:web:080cee9ed88b2ebf3a6bb8",
  measurementId: "G-ZQB5R7RSTB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);