import { LucideLoader2 } from 'lucide-react';
import React, { memo } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '@/hooks/context/useAuth';

interface IProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<IProps> = ({ children }) => {
  const { auth } = useAuth();

  if (auth.isLoading) {
    return (
      <div>
        <LucideLoader2 className="animate-spin ml-2" />
        Loading...
      </div>
    );
  }
  if (!auth.user || !auth.token) {
    return <Navigate to="/auth/signin" />;
  }

  return children;
};

export default memo(ProtectedRoute);
