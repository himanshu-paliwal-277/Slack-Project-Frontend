import React, { createContext, useState } from 'react';

interface IProps {
  children: React.ReactNode;
}

interface CreateWorkspaceContextType {
  openCreateWorkspaceModal: boolean;
  setOpenCreateWorkspaceModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateWorkspaceContext = createContext<CreateWorkspaceContextType | null>(null);

export const CreateWorkspaceContextProvider: React.FC<IProps> = ({ children }) => {
  const [openCreateWorkspaceModal, setOpenCreateWorkspaceModal] = useState<boolean>(false);

  return (
    <CreateWorkspaceContext.Provider
      value={{ openCreateWorkspaceModal, setOpenCreateWorkspaceModal }}
    >
      {children}
    </CreateWorkspaceContext.Provider>
  );
};
