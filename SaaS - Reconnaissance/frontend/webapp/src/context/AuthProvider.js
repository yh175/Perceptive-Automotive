import React, { createContext, useState, useEffect } from "react";
import authService from "../services/auth.service";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const navigate = useNavigate(); // Utilisez useNavigate ici

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
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
    // navigate('/Connexion'); // Redirection après déconnexion
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
