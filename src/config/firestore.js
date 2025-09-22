import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAXpDyrIFTDlNXWihJJAoQXz1yfinTcsoM",
  authDomain: "fir-website-6c074.firebaseapp.com",
  projectId: "fir-website-6c074",
  storageBucket: "fir-website-6c074.firebasestorage.app",
  messagingSenderId: "638053395708",
  appId: "1:638053395708:web:7a4284788ef012bb967b79"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);