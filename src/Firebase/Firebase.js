import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { createContext } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyBsrfymXx59nKlgmXNTl5XxpsAgEqWt0cs",
  authDomain: "in-a-minute-fa5fc.firebaseapp.com",
  projectId: "in-a-minute-fa5fc",
  storageBucket: "in-a-minute-fa5fc.appspot.com",
  messagingSenderId: "397274643372",
  appId: "1:397274643372:web:5ec5efcaaaf62f05ce1809",
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
