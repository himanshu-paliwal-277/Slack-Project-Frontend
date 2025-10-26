import React, { memo, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import LoadingFallback from './components/molecules/LoadingFallback/LoadingFallback';
import ProtectedRoute from './components/molecules/ProtectedRoute/ProtectedRoute';
import SigninContainer from './components/organisms/Auth/SigninContainer';
import SignupContainer from './components/organisms/Auth/SignupContainer';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import { Notfound } from './pages/NotFound/NotFound';
import Channel from './pages/Workspace/Channel/Channel';
import JoinPage from './pages/Workspace/JoinPage';
import Members from './pages/Workspace/Members/Members';
import WorkspaceLayout from './pages/Workspace/WorkspaceLayout';

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public Routes - Authentication */}
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

        {/* Public Routes - Workspace Join */}
        <Route path="/workspaces/join/:workspaceId" element={<JoinPage />} />

        {/* Protected Routes - Workspace Layout */}
        <Route path="/" element={<WorkspaceLayout />}>
          <Route element={<ProtectedRoute />}>
            {/* Home/Dashboard */}
            <Route index element={<Home />} />

            {/* Workspace Routes */}
            <Route path="workspaces/:workspaceId" element={'workspace'} />

            {/* Channel Routes */}
            <Route path="workspaces/:workspaceId/channels/:channelId" element={<Channel />} />

            {/* Members Routes */}
            <Route path="workspaces/:workspaceId/members/:memberId" element={<Members />} />
          </Route>
        </Route>

        {/* Fallback Route - 404 Not Found */}
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Suspense>
  );
};

export default memo(AppRoutes);
