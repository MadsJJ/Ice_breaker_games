// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjxTY9XYSu4t5qZgsMNOe7ycLH-UPc3TI",
  authDomain: "bli-kjent-lek.firebaseapp.com",
  projectId: "bli-kjent-lek",
  storageBucket: "bli-kjent-lek.appspot.com",
  messagingSenderId: "801094470182",
  appId: "1:801094470182:web:c735e4e482dc8b0e99b4e7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
// const auth = getAuth(app);
