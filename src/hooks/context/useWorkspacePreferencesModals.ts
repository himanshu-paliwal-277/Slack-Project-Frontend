import { useContext } from 'react';

import { WorkspacePreferencesModalContext } from '@/context/WorkspacePreferencesModalContext';

export const useWorkspacePreferencesModal = () => {
  const context = useContext(WorkspacePreferencesModalContext);

  if (!context) {
    throw new Error(
      'useWorkspacePreferencesModal must be used within a WorkspacePreferencesModalContextProvider'
    );
  }

  return context;
};
