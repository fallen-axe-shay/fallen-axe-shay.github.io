// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-analytics.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDutUW0S8hpc-jdph5H7o4kM3kjeRyk9KQ",
  authDomain: "shopify-internship-5b8ce.firebaseapp.com",
  databaseURL: "https://shopify-internship-5b8ce-default-rtdb.firebaseio.com",
  projectId: "shopify-internship-5b8ce",
  storageBucket: "shopify-internship-5b8ce.appspot.com",
  messagingSenderId: "737517945675",
  appId: "1:737517945675:web:abe6b090cc24dfa55bdece",
  measurementId: "G-2T6RE4J5BH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

window.database = database;
window.ref = ref;
