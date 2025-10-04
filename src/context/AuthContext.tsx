import React, { createContext, memo, useEffect, useState } from 'react';

interface IProps {
  children: React.ReactNode;
}

interface AuthData {
  user: string | null;
  token: string | null;
}

interface AuthContextType {
  auth: AuthData;
  setAuth: React.Dispatch<React.SetStateAction<AuthData>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AppContext: React.FC<IProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthData>({
    user: null,
    token: null,
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user && token) {
      setAuth({
        user: JSON.parse(user),
        token,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default memo(AppContext);
export { AuthContext };
