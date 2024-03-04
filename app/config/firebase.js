// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPYTiAjnzANoawO7duq3gWOsJ0HpMZytg",
  authDomain: "chat-app-p2.firebaseapp.com",
  projectId: "chat-app-p2",
  storageBucket: "chat-app-p2.appspot.com",
  messagingSenderId: "933241864805",
  appId: "1:933241864805:web:69901e5408307d6417bc8c",
  measurementId: "G-EWETP8MMH2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth =getAuth(app);
export const provider =new GoogleAuthProvider();
export const db =getFirestore(app)