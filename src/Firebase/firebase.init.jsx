// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFAXLRA9aFYdzWGXbSseixzXlq4yAHqhg",
  authDomain: "blue-line-bus.firebaseapp.com",
  projectId: "blue-line-bus",
  storageBucket: "blue-line-bus.appspot.com",
  messagingSenderId: "326642093261",
  appId: "1:326642093261:web:d1fc2974e679f99f54ad84"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);