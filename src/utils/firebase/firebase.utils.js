import { initializeApp } from 'firebase/app';
import { 
        getAuth,
        signInWithRedirect,
        signInWithPopup,
        GoogleAuthProvider,
        createUserWithEmailAndPassword
    } from 'firebase/auth';
    

    
  import {

      getFirestore,
      doc,
      getDoc,
      setDoc
  } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCLyd0X6Bg3BrEQc-lE3aJehQpCD0rbd1Q",
    authDomain: "crwn-clothing-db-31c7d.firebaseapp.com",
    projectId: "crwn-clothing-db-31c7d",
    storageBucket: "crwn-clothing-db-31c7d.appspot.com",
    messagingSenderId: "446267601559",
    appId: "1:446267601559:web:dacc36419e66e018322fd2"
  };

  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
      prompt: "select_account"
  });

  export const auth = getAuth();

  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

    if(!userAuth) return;

     const userDocRef =  doc(db, 'users', userAuth.uid);
     console.log(userDocRef);

     const userSnapshot = await getDoc(userDocRef);
     console.log(userSnapshot);
     console.log(userSnapshot.exists());

     if(!userSnapshot.exists()){
         const { displayName, email} = userAuth;
         const createdAt = new Date();

         try{
          await setDoc(userDocRef, {
              displayName,
              email,
              createdAt,
              ...additionalInformation
          })
         }catch(err) {
           console.log('There is an error creating the user!', err.message);
         };
     }

     return userDocRef;

       //If user data exists

     //Check if user data exists

     //Return userDocRef

  }

  export const createAuthUserEmailAndPassword = async (email, password) => {

    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);

   }
  