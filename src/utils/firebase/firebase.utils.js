// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAe5Parf_6AsCRu-7HNznlU7DC_YmAvzgo',
  authDomain: 'crown-clothing-db-8e8de.firebaseapp.com',
  projectId: 'crown-clothing-db-8e8de',
  storageBucket: 'crown-clothing-db-8e8de.appspot.com',
  messagingSenderId: '649911391751',
  appId: '1:649911391751:web:6710b9e7dd54e005307ca2',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  // if user data does not exists
  // create / set the document with the data from the userAuth in my collection
  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log("Error while creating the user:", error.message);
    };
  };

  // if user data exists
  // return userDocRef
  return userDocRef;
};