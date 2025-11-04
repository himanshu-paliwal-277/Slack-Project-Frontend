import React, { createContext } from 'react';
import { io, Socket } from 'socket.io-client';

// Define props type
interface IProps {
  children: React.ReactNode;
}

// Define the context value type
interface ISocketContext {
  socket: Socket;
}

// Create the context with proper typing
const SocketContext = createContext<ISocketContext | null>(null);

export const SocketContextProvider: React.FC<IProps> = ({ children }) => {
  const socket = io(import.meta.env.VITE_BACKEND_SOCKET_URL as string);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

export default SocketContext;
