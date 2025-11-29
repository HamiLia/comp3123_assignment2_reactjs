import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("userEmail");
    if (storedToken) setToken(storedToken);
    if (storedEmail) setUserEmail(storedEmail);
    setLoading(false);
  }, []);

  const login = (newToken, email) => {
    setToken(newToken);
    setUserEmail(email);
    localStorage.setItem("token", newToken);
    if (email) localStorage.setItem("userEmail", email);
  };

  const logout = () => {
    setToken(null);
    setUserEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
  };

  const value = {
    token,
    userEmail,
    isAuthenticated: !!token,
    login,
    logout,
  };

  if (loading) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
