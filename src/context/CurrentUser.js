import React, { createContext, useContext, useEffect, useState } from "react";
import { db, FirebaseContext } from "../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
export const currentUserContext = createContext();

function CurrentUserProvider({ children }) {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: [""],
    phoneNumber: "",
    website: "",
    followedHashtags: "",
    subscribeUs: false,
  });
  const { auth, messagingUsersCollection } = useContext(FirebaseContext);
  const [userData] = useAuthState(auth);
  const query =
    userData?.uid &&
    messagingUsersCollection.where("userId", "==", userData.uid);
  const [currentUser] = useCollectionData(query, { idField: "id" });
  useEffect(() => {
    if (currentUser && currentUser?.length === 0) {
      messagingUsersCollection.add({
        userId: userData.uid,
        userName: userData.displayName,
        userPhoto: userData.photoURL,
      });
    }
    db.collection("users")
      .doc(auth.currentUser?.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setData(snapshot.data());
        }
      });
  }, [currentUser]);

  console.log(data);
  return (
    <currentUserContext.Provider value={{ userData }}>
      {children}
    </currentUserContext.Provider>
  );
}

export default CurrentUserProvider;
