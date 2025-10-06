import React, { createContext, useEffect, useState } from 'react';

interface IProps {
  children: React.ReactNode;
}

// Define proper user type
interface User {
  avatar: string;
  email: string;
  username?: string;
}

// Auth data type
interface AuthData {
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

// Context type
interface AuthContextType {
  auth: AuthData;
  setAuth: React.Dispatch<React.SetStateAction<AuthData>>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider: React.FC<IProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthData>({
    user: null,
    token: null,
    isLoading: true,
  });

  const logout = (): void => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setAuth({
      user: null,
      token: null,
      isLoading: false,
    });
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (userData && token) {
      try {
        const parsedUser: User = JSON.parse(userData);
        setAuth({
          user: parsedUser,
          token,
          isLoading: false,
        });
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        setAuth({
          user: null,
          token: null,
          isLoading: false,
        });
      }
    } else {
      setAuth({
        user: null,
        token: null,
        isLoading: false,
      });
    }
  }, []);

  return <AuthContext.Provider value={{ auth, setAuth, logout }}>{children}</AuthContext.Provider>;
};
