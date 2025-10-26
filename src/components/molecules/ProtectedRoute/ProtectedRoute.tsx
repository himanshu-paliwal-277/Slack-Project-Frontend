import { LucideLoader2 } from 'lucide-react';
import React, { memo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/hooks/context/useAuth';

const ProtectedRoute: React.FC = () => {
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

  return <Outlet />;
};

export default memo(ProtectedRoute);
