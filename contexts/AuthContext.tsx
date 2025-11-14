import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (username: string, password?: string) => Promise<boolean>;
  logout: () => void;
  signup: (username: string, fullName: string, password?: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Async login function using the api service
  const login = async (username: string, password?: string): Promise<boolean> => {
    const foundUser = await api.login(username, password);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  // Async signup function using the api service
  const signup = async (username: string, fullName: string, password?: string): Promise<boolean> => {
    const newUser = await api.signup(username, fullName, password);
    if (newUser) {
      // In a real app, the API would handle user creation.
      // Here we'll just log them in directly upon successful "creation".
      setUser(newUser);
      return true;
    }
    return false; // Username already exists
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
