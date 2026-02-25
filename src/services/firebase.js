import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your actual Firebase config from Console
const firebaseConfig = {
  apiKey: "AIzaSyCzgdJ0dP9d_VCUvKcFG6PMI7yaTVRmvcw",
  authDomain: "sudoku-93413.firebaseapp.com",
  projectId: "sudoku-93413",
  storageBucket: "sudoku-93413.firebasestorage.app",
  messagingSenderId: "771860388134",
  appId: "1:771860388134:web:7ca82083008d25d77c09e7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
