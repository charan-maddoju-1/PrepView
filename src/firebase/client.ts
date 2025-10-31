// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7bSvti4P2heYQlD64DmrhQ155h__j0Ik",
  authDomain: "prepview-46928.firebaseapp.com",
  projectId: "prepview-46928",
  storageBucket: "prepview-46928.firebasestorage.app",
  messagingSenderId: "1065760866903",
  appId: "1:1065760866903:web:642e8a8db0ca83fb391912",
  measurementId: "G-JDBJFKY73F"
};

// Initialize Firebase
const app =!getApps.length? initializeApp(firebaseConfig): getApp();


export const auth=getAuth(app);
export const db=getFirestore(app);