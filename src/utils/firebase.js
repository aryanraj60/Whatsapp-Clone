import firebase, { getApps, getApp } from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

console.log("Firebase");

const firebaseConfig = {
  apiKey: "AIzaSyDB7g7cBB66MNtAet9Vn9L_0Z_4sjI5bbE",
  authDomain: "whatsappclone-5e85b.firebaseapp.com",
  projectId: "whatsappclone-5e85b",
  storageBucket: "whatsappclone-5e85b.appspot.com",
  messagingSenderId: "585793752945",
  appId: "1:585793752945:web:e31239f3fb64fee6d770d0",
};

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
console.log(db, auth, provider);
