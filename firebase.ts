// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKUnkZ8vA8h4TKvaZ_QvtpsYrIXPv-cw0",
  authDomain: "net-yt.firebaseapp.com",
  projectId: "net-yt",
  storageBucket: "net-yt.appspot.com",
  messagingSenderId: "967416441057",
  appId: "1:967416441057:web:f9a177ba38acb14d462fa0"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }