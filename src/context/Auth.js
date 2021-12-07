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
  const [users, setUsers] = useState([]);
  useEffect(() => {
    let isMounted = true;
    if(isMounted) {
      auth.onAuthStateChanged((user) => {
        setUser(user);
        setLoading(false);
      });
    }
    return ()=>{isMounted = false};
  },[user?.uid]);


  // get user data
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
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
    }
    return ()=>{isMounted = false};
  });

  // get all users 
  useEffect(() => { 
    let isMounted = true;
    if (isMounted) {
      db.collection("users").onSnapshot((snapshot) => {
        setUsers(snapshot.docs.map((doc) => doc.data()));
      });
    }
    return () => {isMounted = false}
  },[]);
  if (loading) return <Loader />;

  return (
    <AuthContext.Provider value={{ user,users, data,setData, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
