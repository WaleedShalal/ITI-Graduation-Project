import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { createContext } from 'react';

const firebaseConfig = {
  apiKey: 'AIzaSyCasUWySD2AgXFh4xf8G8Df5L9pxOseBeM',
  authDomain: 'in-a-minute-d805d.firebaseapp.com',
  databaseURL: 'https://in-a-minute-d805d-default-rtdb.firebaseio.com',
  projectId: 'in-a-minute-d805d',
  storageBucket: 'in-a-minute-d805d.appspot.com',
  messagingSenderId: '375321459604',
  appId: '1:375321459604:web:e99188c3e6051c1ccd6d81',
  measurementId: 'G-C721NQBQ53',
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();
export { db, auth, provider, storage };
/* ----------------------------- start messages ----------------------------- */
export const FirebaseContext = createContext();
const messagesCollection = db.collection('messages');
const messagingUsersCollection = db.collection('messagingUsers');
const FirebaseProvider = ({ children }) => {
  firebase.initializeApp(firebaseConfig);
  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        db,
        auth,
        messagesCollection,
        messagingUsersCollection,
      }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
