import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
  accessToken: string | null;
  privilegeLevel: number | null;
  setAuth: (auth: { accessToken: string | null; privilegeLevel: number  | null}) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [privilegeLevel, setPrivilegeLevel] = useState<number | null>(null);

  const setAuth = (auth: { accessToken: string | null; privilegeLevel: number | null }) => {
    setAccessToken(auth.accessToken);
    setPrivilegeLevel(auth.privilegeLevel);
  };

  return (
    <AuthContext.Provider value={{ accessToken, privilegeLevel, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};