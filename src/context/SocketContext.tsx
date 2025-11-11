import { useQueryClient } from '@tanstack/react-query';
import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import type { ChannelMessage } from '@/context/ChannelMessages';
import { useChannelMessages } from '@/hooks/context/useChannelMessages';
import type { Channel } from '@/types/channel';

// Define props type
interface IProps {
  children: React.ReactNode;
}

// Define the context value type
interface ISocketContext {
  socket: Socket | null;
  joinChannel: (channelId: string) => void;
  leaveChannel: (channelId: string) => void;
  currentChannel: Channel | null;
}

// Create the context with proper typing
const SocketContext = createContext<ISocketContext | null>(null);

export const SocketContextProvider: React.FC<IProps> = ({ children }) => {
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
  const { setMessageList } = useChannelMessages();
  const socketRef = useRef<Socket | null>(null);
  const queryClient = useQueryClient();

  // Initialize socket once and set up listeners
  useEffect(() => {
    // Create socket connection only once
    if (!socketRef.current) {
      socketRef.current = io(import.meta.env.VITE_BACKEND_SOCKET_URL as string, {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      console.log('Socket initialized:', socketRef.current);
    }

    const socket = socketRef.current;

    // Set up the NewMessageReceived listener
    const handleNewMessage = (data: ChannelMessage) => {
      console.log('New message received', data);

      // Use functional update to avoid stale closure
      setMessageList((prevMessages) => {
        // Check if message already exists to prevent duplicates
        const messageExists = prevMessages.some((msg) => msg._id === data._id);
        if (messageExists) {
          return prevMessages;
        }
        // Add new message at the end (chronological order)
        return [...prevMessages, data];
      });

      // Update React Query cache to persist the message
      const channelId = data.channelId;
      queryClient.setQueryData(
        ['getPaginatedMessages', channelId],
        (oldData: ChannelMessage[] | undefined) => {
          if (!oldData) return [data];

          // Check if message already exists in cache
          const exists = oldData.some((msg) => msg._id === data._id);
          if (exists) return oldData;

          // Add new message to cache
          return [...oldData, data];
        }
      );
    };

    socket.on('NewMessageReceived', handleNewMessage);

    // Cleanup function
    return () => {
      socket.off('NewMessageReceived', handleNewMessage);
    };
  }, [setMessageList, queryClient]);

  // Cleanup socket on unmount
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        console.log('Disconnecting socket');
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  const joinChannel = useCallback(async (channelId: string) => {
    if (!socketRef.current) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socketRef.current.emit('JoinChannel', { channelId }, (data: any) => {
      console.log('Successfully joined the channel', data);
      setCurrentChannel(data?.data);
    });
  }, []); // Empty deps - socket is stable via ref

  const leaveChannel = useCallback((channelId: string) => {
    if (!socketRef.current) return;

    console.log('Leaving channel', channelId);
    socketRef.current.emit('LeaveChannel', { channelId });
    setCurrentChannel(null);
  }, []); // Empty deps - socket is stable via ref

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, joinChannel, leaveChannel, currentChannel }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
