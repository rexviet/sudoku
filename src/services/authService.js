import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { auth } from "./firebase";

export const loginWithEmail = (email, password) => 
  signInWithEmailAndPassword(auth, email, password);

export const registerWithEmail = (email, password) => 
  createUserWithEmailAndPassword(auth, email, password);

export const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const logout = () => signOut(auth);

export const subscribeToAuthChanges = (callback) => 
  onAuthStateChanged(auth, callback);
