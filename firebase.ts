import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkDveehAY_qv6XaSG4irKvOCtKcfR6hqk",
  authDomain: "eurobrand-49f28.firebaseapp.com",
  projectId: "eurobrand-49f28",
  storageBucket: "eurobrand-49f28.appspot.com",
  messagingSenderId: "147693476758",
  appId: "1:147693476758:web:0a22a65ccde04f1fe79bb7",
  measurementId: "G-X9VS5T767Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
const storage = getStorage();

export {app, storage};