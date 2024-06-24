import React, { createContext, useState, useEffect } from "react";
import authService from "../services/auth.service";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    console.log("Current user from localStorage:", currentUser);
    setUser(currentUser);
  }, []);

  const login = async (username, password) => {
    const data = await authService.login(username, password);
    console.log("User logged in:", data);
    setUser(data);
    return data;
  };

  const logout = () => {
    console.log("User logged out");
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
