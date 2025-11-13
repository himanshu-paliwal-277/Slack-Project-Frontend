import WorkspacePreferencesModalContextProvider from '@/context/WorkspacePreferencesModalContext';
import combineContext from '@/utils/combineContext';

import { AuthContextProvider } from './AuthContextProvider';
import { ChannelMessagesProvider } from './ChannelMessages';
import { CreateChannelContextProvider } from './CreateChannelContext';
import { CreateDMContextProvider } from './CreateDMContext';
import { CreateWorkspaceContextProvider } from './CreateWorkspaceContext';
import { DrawerContextProvider } from './DrawerContext';
import { SocketContextProvider } from './SocketContext';
import { WorkspaceContextProvider } from './WorkspaceContext';

export const AppContextProvider = combineContext(
  DrawerContextProvider,
  ChannelMessagesProvider,
  SocketContextProvider,
  AuthContextProvider,
  CreateWorkspaceContextProvider,
  WorkspacePreferencesModalContextProvider,
  CreateChannelContextProvider,
  CreateDMContextProvider,
  WorkspaceContextProvider
);
