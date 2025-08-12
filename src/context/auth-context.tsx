
"use client";

import React, { createContext, useState, ReactNode, useMemo } from 'react';
import { User } from '@/lib/types';
import { getCurrentUser } from '@/lib/data';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // In a real app, you'd check a token from localStorage or a cookie.
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = () => {
    // This is where you would typically handle authentication logic,
    // e.g., calling an API, getting a token, and then setting state.
    // For this demo, we'll just set the state directly.
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Clear session state
    setUser(null);
    setIsAuthenticated(false);
  };

  const authContextValue = useMemo(() => ({
    isAuthenticated,
    user,
    login,
    logout,
  }), [isAuthenticated, user]);


  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
