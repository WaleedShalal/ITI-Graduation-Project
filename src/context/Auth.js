import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../Firebase/Firebase';
import Loader from "../../src/components/Parts/Loader/Loader"
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return <Loader />;

  return (
    <AuthContext.Provider value={{ user ,loading,setLoading }}>{children}</AuthContext.Provider>
  );
};