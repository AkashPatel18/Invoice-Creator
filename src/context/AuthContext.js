import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseconfig/firebase";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext();

export const useAuth = () => {
  useContext(AuthContext);
}














export const AuthProvider = ({ children }) => {
  const [loading, setloading] = useState(true);
  const [user, setUser] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setloading(false);
      console.log("from authc", user);
      if (user) {
        localStorage.setItem("invoiceappuserinfo", JSON.stringify(user));
        history.push("/invoices");
      } else {
        history.push("/");
      }
    });
    return unsubscribe;
  }, []);
  const value = { user };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
