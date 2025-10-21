import React, { createContext, useState } from 'react';

interface IProps {
  children: React.ReactNode;
}

interface CreateChannelContextType {
  openCreateChannelModal: boolean;
  setOpenCreateChannelModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateChannelContext = createContext<CreateChannelContextType | null>(null);

export const CreateChannelContextProvider: React.FC<IProps> = ({ children }) => {
  const [openCreateChannelModal, setOpenCreateChannelModal] = useState(false);

  return (
    <CreateChannelContext.Provider value={{ openCreateChannelModal, setOpenCreateChannelModal }}>
      {children}
    </CreateChannelContext.Provider>
  );
};

export default CreateChannelContext;
