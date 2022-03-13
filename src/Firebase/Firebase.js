import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { createContext } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyC742BlXH5KQw2LEJZlTzI2kblVrfnRLOc",
  authDomain: "in-a-minute-b2931.firebaseapp.com",
  projectId: "in-a-minute-b2931",
  storageBucket: "in-a-minute-b2931.appspot.com",
  messagingSenderId: "239553102278",
  appId: "1:239553102278:web:9c1b818f8620ff3e9872c7",
  measurementId: "G-40RY910WM8",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();
export { db, auth, provider, storage };
/* ----------------------------- start messages ----------------------------- */
export const FirebaseContext = createContext();
const messagesCollection = db.collection("messages");
const msgCounterFlag = db.collection("msgCounterFlag");
const messagingUsersCollection = db.collection("users");
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
