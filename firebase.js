// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
import {getAuth, initializeAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAid8QBnuXn1m4kns_N5QMrKpLc9WXPeZQ",
  authDomain: "verse-app-cb602.firebaseapp.com",
  projectId: "verse-app-cb602",
  storageBucket: "verse-app-cb602.appspot.com",
  messagingSenderId: "1066218028662",
  appId: "1:1066218028662:web:27712841b1de080b4e2957",
  measurementId: "G-2EP2TMF4WB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const db=getFirestore(app)
export {auth,db}
