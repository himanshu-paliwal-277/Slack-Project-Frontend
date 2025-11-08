import React, { createContext, useState } from 'react';

interface IProps {
  children: React.ReactNode;
}

export const ChannelMessages = createContext<any | null>(null);

export const ChannelMessagesProvider: React.FC<IProps> = ({ children }) => {
  const [messageList, setMessageList] = useState([]);

  return (
    <ChannelMessages.Provider value={{ messageList, setMessageList }}>
      {children}
    </ChannelMessages.Provider>
  );
};

export default ChannelMessages;
