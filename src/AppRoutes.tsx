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
import Drafts from './pages/Workspace/Drafts/Drafts';
import JoinPage from './pages/Workspace/JoinPage';
import DM from './pages/Workspace/Members/DM';
import Threads from './pages/Workspace/Threads/Threads';
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
        <Route element={<ProtectedRoute />}>
          {/* Home */}
          <Route index element={<Home />} />

          <Route path="/" element={<WorkspaceLayout />}>
            {/* Workspace Routes */}
            {/* <Route path="workspaces/:workspaceId" element={'workspace'} /> */}

            {/* Channel Routes */}
            <Route path="workspaces/:workspaceId/channels/:channelId" element={<Channel />} />

            {/* DM Routes */}
            {/* <Route path="workspaces/:workspaceId/members/:memberId" element={<DM />} /> */}
            <Route path="workspaces/:workspaceId/dm/:dmId" element={<DM />} />

            {/* Threads Routes */}
            <Route path="workspaces/:workspaceId/threads" element={<Threads />} />

            {/* Drafts Routes */}
            <Route path="workspaces/:workspaceId/drafts" element={<Drafts />} />
          </Route>
        </Route>

        {/* Fallback Route - 404 Not Found */}
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Suspense>
  );
};

export default memo(AppRoutes);
