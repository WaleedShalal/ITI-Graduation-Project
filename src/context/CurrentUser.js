import React, { createContext, useContext, useEffect } from 'react';
import { FirebaseContext } from '../Firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
export const currentUserContext = createContext();

function CurrentUserProvider({ children }) {
  const { auth, messagingUsersCollection } = useContext(FirebaseContext);
  const [userData] = useAuthState(auth);
  console.log(userData?.uid);
  const query =
    userData?.uid &&
    messagingUsersCollection.where('userId', '==', userData.uid);
  console.log(query);
  const [currentUser] = useCollectionData(query, { idField: 'id' });
  useEffect(() => {
    if (currentUser && currentUser?.length === 0) {
      messagingUsersCollection.add({
        userId: userData.uid,
        userName: userData.displayName,
        userPhoto: userData.photoURL,
      });
    }
  }, [currentUser]);
  return (
    <currentUserContext.Provider value={{ userData }}>
      {children}
    </currentUserContext.Provider>
  );
}

export default CurrentUserProvider;
