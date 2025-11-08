import React, { createContext, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { useChannelMessages } from '@/hooks/context/useChannelMessages';

// Define props type
interface IProps {
  children: React.ReactNode;
}

// Define the context value type
interface ISocketContext {
  socket: Socket;
  joinChannel: (channelId: string) => void;
  currentChannel: any;
}

// Create the context with proper typing
const SocketContext = createContext<ISocketContext | null>(null);

export const SocketContextProvider: React.FC<IProps> = ({ children }) => {
  const [currentChannel, setCurrentChannel] = useState(null);
  const { messageList, setMessageList } = useChannelMessages();

  const socket = io(import.meta.env.VITE_BACKEND_SOCKET_URL as string);

  console.log('socket = ', socket);

  // this event is not working
  socket.on('NewMessageReceived', (data) => {
    console.log('New message received', data);
    setMessageList([...messageList, data]);
  });

  async function joinChannel(channelId: string) {
    socket.emit('JoinChannel', { channelId }, (data) => {
      console.log('Successfully joined the channel', data);
      setCurrentChannel(data?.data);
    });
  }

  return (
    <SocketContext.Provider value={{ socket, joinChannel, currentChannel }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
