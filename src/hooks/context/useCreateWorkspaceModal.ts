import { useContext } from 'react';

import { CreateWorkspaceContext } from '@/context/CreateWorkspaceContext';

export const useCreateWorkspaceModal = () => {
  const context = useContext(CreateWorkspaceContext);
  if (!context) {
    throw new Error('useCreateWorkspaceModal must be used within a CreateWorkspaceContextProvider');
  }
  return context;
};
