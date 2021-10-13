// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDziv5T2lwy_1jcHriik2c9hWd1qPcY_s",
  authDomain: "blogging-platform-4ebc2.firebaseapp.com",
  projectId: "blogging-platform-4ebc2",
  storageBucket: "blogging-platform-4ebc2.appspot.com",
  messagingSenderId: "669118367342",
  appId: "1:669118367342:web:0348ae0115ae90740dc87f",
  measurementId: "G-PQXT1EE1GJ"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const database = getDatabase(firebaseApp);
//const analytics = getAnalytics(firebaseApp);