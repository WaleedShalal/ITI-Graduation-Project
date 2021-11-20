import React, { createContext, useContext, useEffect } from 'react';
import { FirebaseContext } from '../Firebase/Firebase';
export const currentUserContext = createContext();

function CurrentUserProvider({ children }) {
  const { messagingUsersCollection } = useContext(FirebaseContext);
  useEffect(() => {});
  return (
    <currentUserContext.Provider value={{}}>
      {children}
    </currentUserContext.Provider>
  );
}

export default CurrentUserProvider;
