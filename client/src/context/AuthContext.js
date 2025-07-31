import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('ecom_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('ecom_token') || '');

  useEffect(() => {
    if (user && token) {
      localStorage.setItem('ecom_user', JSON.stringify(user));
      localStorage.setItem('ecom_token', token);
    } else {
      localStorage.removeItem('ecom_user');
      localStorage.removeItem('ecom_token');
    }
  }, [user, token]);

  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
  };

  const logout = () => {
    setUser(null);
    setToken('');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
