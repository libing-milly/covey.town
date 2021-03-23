import React, { useEffect, useState } from "react";
import firebase from "./firebase";

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any|null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return null
  }

  return (
    <AuthContext.Provider
      value={{currentUser}}
    >
     {children}
    </AuthContext.Provider>
  );
};
