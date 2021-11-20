import React, { createContext, useState } from 'react';
export const SecondUserContext = createContext();
function SecondUserProvider({ children }) {
  const [secondUserData, setSecondUserData] = useState();
  return (
    <SecondUserContext.Provider value={{ secondUserData, setSecondUserData }}>
      {children}
    </SecondUserContext.Provider>
  );
}

export default SecondUserProvider;
