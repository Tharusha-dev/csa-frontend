import React, { createContext, useState, useContext, FC } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [accessToken, setAccessToken] = useState(null);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};


