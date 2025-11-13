import React, { createContext, useCallback, useEffect, useState } from 'react';

declare global {
  interface Window {
    logoutUser?: () => void;
  }
}

interface IProps {
  children: React.ReactNode;
}

interface User {
  avatar: string;
  email: string;
  userName?: string;
  _id: string;
}

interface AuthData {
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

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

  /**
   * ✅ Logout function — clears localStorage + context + redirects
   */
  const logout = useCallback((): void => {
    try {
      // Remove token and user from local storage
      localStorage.removeItem('user');
      localStorage.removeItem('token');

      // Reset auth state
      setAuth({
        user: null,
        token: null,
        isLoading: false,
      });

      // Redirect to signin page
      window.location.href = '/auth/signin';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, []);

  /**
   * ✅ Make logout available globally for Axios interceptor
   */
  useEffect(() => {
    window.logoutUser = logout;
  }, [logout]);

  /**
   * ✅ Initialize auth from localStorage
   */
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
