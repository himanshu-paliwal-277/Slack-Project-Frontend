import React, { memo } from 'react';
import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from './components/molecules/ProtectedRoute/ProtectedRoute';
import SigninContainer from './components/organisms/Auth/SigninContainer';
import SignupContainer from './components/organisms/Auth/SignupContainer';
import Auth from './pages/Auth/Auth';
import { Notfound } from './pages/NotFound/NotFound';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <h1>Home</h1>
          </ProtectedRoute>
        }
      />
      <Route
        path="/auth/signup"
        element={
          <Auth>
            <SignupContainer />
          </Auth>
        }
      />
      <Route
        path="/auth/signin"
        element={
          <Auth>
            <SigninContainer />
          </Auth>
        }
      />
      <Route path="/*" element={<Notfound />} />
    </Routes>
  );
};

export default memo(AppRoutes);
