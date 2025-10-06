import React, { createContext, memo, useEffect, useState } from 'react';

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

const AuthContext = createContext<AuthContextType | null>(null);

const AppContext: React.FC<IProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthData>({
    user: null,
    token: null,
    isLoading: true,
  });

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setAuth({
      user: null,
      token: null,
      isLoading: false,
    });
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user && token) {
      setAuth({
        user: JSON.parse(user),
        token,
        isLoading: false,
      });
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

export default memo(AppContext);
export { AuthContext };
