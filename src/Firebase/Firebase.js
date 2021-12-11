import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { createContext } from 'react';


const firebaseConfig = {
  apiKey: "AIzaSyAnumzaQ9MW_fTFzW17q2thVQgS-L1FFHM",
  authDomain: "in-a-minute-8cfa9.firebaseapp.com",
  projectId: "in-a-minute-8cfa9",
  storageBucket: "in-a-minute-8cfa9.appspot.com",
  messagingSenderId: "993750853391",
  appId: "1:993750853391:web:b739f996c664dce381c07a",
  // measurementId: `${config.measurementId}`
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
