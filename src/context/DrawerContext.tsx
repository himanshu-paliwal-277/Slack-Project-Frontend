import React, { createContext, useState } from 'react';

interface IProps {
  children: React.ReactNode;
}

interface DrawerContextType {
  openDrawer: boolean;
  setOpenOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

const DrawerContext = createContext<DrawerContextType | null>(null);

export const DrawerContextProvider: React.FC<IProps> = ({ children }) => {
  const [openDrawer, setOpenOpenDrawer] = useState(false);

  return (
    <DrawerContext.Provider value={{ openDrawer, setOpenOpenDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};

export default DrawerContext;
