import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext([undefined, () => {}]);

export const AuthProvider = ({ children }) => {
  let initialState;
  try {
    initialState = Cookies.get("jwt") || localStorage.getItem("ChatApp");
    initialState = initialState ? JSON.parse(initialState) : undefined;
  } catch (error) {
    console.error("Error parsing initial auth state:", error);
    initialState = undefined;
  }

  const [authUser, setAuthUser] = useState(initialState);

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
