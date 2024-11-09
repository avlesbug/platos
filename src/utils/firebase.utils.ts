import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  type NextOrObserver,
  type User,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "recipie-b8629.firebaseapp.com",
  projectId: "recipie-b8629",
  storageBucket: "recipie-b8629.appspot.com",
  messagingSenderId: "12393883968",
  appId: "1:12393883968:web:14ddaef1da4e8c6c56f2a5",
  measurementId: "G-75XHJYE151",
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account ",
});
export const auth = getAuth(app);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const userStateListener = (callback: NextOrObserver<User>) => {
  return onAuthStateChanged(auth, callback);
};
export const SignOutUser = async () => await signOut(auth);
export const firestoreDatabase = getFirestore(app);
export const firebaseStorage = getStorage(app);
