import React, { createContext, useState, useEffect } from "react";
import { auth, db } from "../Firebase/Firebase";
import Loader from "../../src/components/Parts/Loader/Loader";
import avatar from "../../src/assets/images/avatar.jpg";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    imageUrl: avatar,
  });
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // get user data
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            if (snapshot.exists) {
              setData(snapshot.data());
            }
          });
      }
    });
  }, []);

  if (loading) return <Loader />;

  return (
    <AuthContext.Provider value={{ user, data, setData, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
