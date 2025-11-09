import { useContext } from 'react';

import DrawerContext from '@/context/DrawerContext';
export const useOpenDrawer = () => {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error('useOpenDrawer must be used within a drawer context');
  }

  return context;
};
