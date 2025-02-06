/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/naming-convention */
import React, {
  createContext, useState, useContext, ReactNode, useMemo
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const login = (username: string, password: string): boolean => {
    if (username === "admin" && password === "password") {
      const mockToken = "mock-jwt-token";
      setToken(mockToken);
      return true;
    }
    return false;
  };

  const logout = () => setToken(null);

  // Wrap context value in useMemo to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    isAuthenticated: !!token,
    token,
    login,
    logout,
  }), [token]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};