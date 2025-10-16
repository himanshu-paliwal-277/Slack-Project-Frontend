import WorkspacePreferencesModalContextProvider from '@/context/WorkspacePreferencesModalContext';
import combineContext from '@/utils/combineContext';

import { AuthContextProvider } from './AuthContextProvider';
import { CreateWorkspaceContextProvider } from './CreateWorkspaceContext';

export const AppContextProvider = combineContext(
  AuthContextProvider,
  CreateWorkspaceContextProvider,
  WorkspacePreferencesModalContextProvider
);
