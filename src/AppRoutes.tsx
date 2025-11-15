import React, { lazy, memo, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import LoadingFallback from './components/molecules/LoadingFallback/LoadingFallback';
import ProtectedRoute from './components/molecules/ProtectedRoute/ProtectedRoute';

// Lazy load components for better performance
const SigninContainer = lazy(() => import('./components/organisms/Auth/SigninContainer'));
const SignupContainer = lazy(() => import('./components/organisms/Auth/SignupContainer'));
const Auth = lazy(() => import('./pages/Auth/Auth'));
const Home = lazy(() => import('./pages/Home/Home'));
const Notfound = lazy(() => import('./pages/NotFound/NotFound').then(module => ({ default: module.Notfound })));
const Channel = lazy(() => import('./pages/Workspace/Channel/Channel'));
const Drafts = lazy(() => import('./pages/Workspace/Drafts/Drafts'));
const JoinPage = lazy(() => import('./pages/Workspace/JoinPage'));
const DM = lazy(() => import('./pages/Workspace/Members/DM'));
const Threads = lazy(() => import('./pages/Workspace/Threads/Threads'));
const WorkspaceLayout = lazy(() => import('./pages/Workspace/WorkspaceLayout'));

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
