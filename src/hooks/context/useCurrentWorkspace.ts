import { useContext } from 'react';

import WorkspaceContext from '@/context/WorkspaceContext';

export const useCurrentWorkspace = () => {
  const context = useContext(WorkspaceContext);

  if (!context) {
    throw new Error('useCurrentWorkspace must be used within a WorkspaceProvider');
  }

  return context;
};
