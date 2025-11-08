import React, { createContext, useState } from 'react';

interface IProps {
  children: React.ReactNode;
}

export interface ChannelMessage {
  _id: string;
  body: string; // JSON string (e.g., Quill Delta)
  channelId: string;
  senderId: Sender;
  workspaceId: string;
  createdAt: string;
}

export interface Sender {
  _id: string;
  userName: string;
  email: string;
  avatar: string;
}

interface ChannelMessagesContextType {
  messageList: ChannelMessage[];
  setMessageList: React.Dispatch<React.SetStateAction<ChannelMessage[]>>;
}

export const ChannelMessages = createContext<ChannelMessagesContextType | null>(null);

export const ChannelMessagesProvider: React.FC<IProps> = ({ children }) => {
  const [messageList, setMessageList] = useState<ChannelMessage[]>([]);

  return (
    <ChannelMessages.Provider value={{ messageList, setMessageList }}>
      {children}
    </ChannelMessages.Provider>
  );
};

export default ChannelMessages;
