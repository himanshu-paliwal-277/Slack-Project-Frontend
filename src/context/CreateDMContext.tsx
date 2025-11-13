import React, { createContext, useState } from 'react';

interface IProps {
  children: React.ReactNode;
}

interface CreateDMContextType {
  openCreateDMModal: boolean;
  setOpenCreateDMModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateDMContext = createContext<CreateDMContextType | null>(null);

export const CreateDMContextProvider: React.FC<IProps> = ({ children }) => {
  const [openCreateDMModal, setOpenCreateDMModal] = useState(false);

  return (
    <CreateDMContext.Provider value={{ openCreateDMModal, setOpenCreateDMModal }}>
      {children}
    </CreateDMContext.Provider>
  );
};

export default CreateDMContext;
