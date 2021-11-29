import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { createContext } from 'react';

// const firebaseConfig = {
//   apiKey: 'AIzaSyAVk6r2ZwJfFH_36bjiqvAf3NvMDFtJbZs',
//   authDomain: 'graduation-project-f0f1e.firebaseapp.com',
//   projectId: 'graduation-project-f0f1e',
//   storageBucket: 'graduation-project-f0f1e.appspot.com',
//   messagingSenderId: '21431803109',
//   appId: '1:21431803109:web:f444191809ea620f47880c',
//   measurementId: 'G-5L52NSZ2D7',
// };
const firebaseConfig = {
  apiKey: 'AIzaSyBDJ5QZUZuYjJVqj_LocrZl_3C8UEIhVcw',
  authDomain: 'graduation-project-bf6be.firebaseapp.com',
  projectId: 'graduation-project-bf6be',
  storageBucket: 'graduation-project-bf6be.appspot.com',
  messagingSenderId: '643874349292',
  appId: '1:643874349292:web:c97a368410914bd70705c9',
  measurementId: 'G-M2TPK9T7RT',
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
const msgCounterFlag = db.collection('msgCounterFlag');
const messagingUsersCollection = db.collection('users');
const FirebaseProvider = ({ children }) => {
  firebase.initializeApp(firebaseConfig);
  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        db,
        auth,
        messagesCollection,
        msgCounterFlag,
        messagingUsersCollection,
      }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
