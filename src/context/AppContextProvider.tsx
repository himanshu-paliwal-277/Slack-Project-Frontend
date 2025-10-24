import WorkspacePreferencesModalContextProvider from '@/context/WorkspacePreferencesModalContext';
import combineContext from '@/utils/combineContext';

import { AuthContextProvider } from './AuthContextProvider';
import { CreateChannelContextProvider } from './CreateChannelContext';
import { CreateWorkspaceContextProvider } from './CreateWorkspaceContext';
import { WorkspaceContextProvider } from './WorkspaceContext';

export const AppContextProvider = combineContext(
  AuthContextProvider,
  CreateWorkspaceContextProvider,
  WorkspacePreferencesModalContextProvider,
  CreateChannelContextProvider,
  WorkspaceContextProvider
);
