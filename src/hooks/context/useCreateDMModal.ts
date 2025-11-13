import { useContext } from 'react';

import CreateDMContext from '@/context/CreateDMContext';

export const useCreateDMModal = () => {
  const context = useContext(CreateDMContext);
  if (!context) {
    throw new Error('useCreateDMModal must be used within a CreateDMContextProvider');
  }
  return context;
};
