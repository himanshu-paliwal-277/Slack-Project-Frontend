import React, { memo, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import LoadingFallback from './components/molecules/LoadingFallback/LoadingFallback';
import ProtectedRoute from './components/molecules/ProtectedRoute/ProtectedRoute';
import SigninContainer from './components/organisms/Auth/SigninContainer';
import SignupContainer from './components/organisms/Auth/SignupContainer';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import { Notfound } from './pages/NotFound/NotFound';
import WorkspaceLayout from './pages/Workspace/WorkspaceLayout';

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
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
        <Route
          path="/workspaces/:workspaceId"
          element={
            <ProtectedRoute>
              <WorkspaceLayout>Workspace</WorkspaceLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/workspaces/:workspaceId/channels/:channelId"
          element={<ProtectedRoute>Channel</ProtectedRoute>}
        />

        <Route path="/*" element={<Notfound />} />
      </Routes>
    </Suspense>
  );
};

export default memo(AppRoutes);
