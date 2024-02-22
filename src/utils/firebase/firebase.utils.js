import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    GoogleAuthProvider,
    signInWithPopup, 
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCOtvT8Iz3vGqh68dplH6Zad7Sk2a0dedI",
    authDomain: "clothing-db-e96bb.firebaseapp.com",
    projectId: "clothing-db-e96bb",
    storageBucket: "clothing-db-e96bb.appspot.com",
    messagingSenderId: "850713603770",
    appId: "1:850713603770:web:c239d7e431f88cf7bb5c83"
};
  
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInwithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid );

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
};

