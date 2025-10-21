import { useContext } from 'react';

import CreateChannelContext from '@/context/CreateChannelContext';

export const useCreateChannelModal = () => {
  const context = useContext(CreateChannelContext);
  if (!context) {
    throw new Error('useCreateWorkspaceModal must be used within a CreateWorkspaceContextProvider');
  }
  return context;
};
