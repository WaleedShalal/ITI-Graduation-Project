import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db, FirebaseContext } from '../Firebase/Firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export const currentUserContext = createContext();
function CurrentUserProvider({ children }) {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: [''],
    phoneNumber: '',
    website: '',
    followedHashtags: '',
    subscribeUs: false,
    id: '',
  });
  const { messagingUsersCollection } = useContext(FirebaseContext);
  const query = data.id && messagingUsersCollection.where('id', '==', data.id);
  const [currentUser] = useCollectionData(query, { idField: 'id' });

  useEffect(() => {
    
    auth.onAuthStateChanged(function(user) {
      if (user) {
        db.collection('users')
        .doc(user.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setData(snapshot.data());
          }
        });
      }
    });
   
  }, [currentUser]);

  return (
    <currentUserContext.Provider value={{ data }}>
      {children}
    </currentUserContext.Provider>
  );
}

export default CurrentUserProvider;
