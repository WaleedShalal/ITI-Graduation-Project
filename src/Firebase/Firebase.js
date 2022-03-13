import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { createContext } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyDEV7VD8bxklB0UZdMofTIohiaDfgIQ1jc",
  authDomain: "in-a-minute-a51b9.firebaseapp.com",
  projectId: "in-a-minute-a51b9",
  storageBucket: "in-a-minute-a51b9.appspot.com",
  messagingSenderId: "297137913239",
  appId: "1:297137913239:web:08f79e5c4947236bacd8d2",
  measurementId: "G-QZQFC91BC2",
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
