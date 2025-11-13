import { useQueryClient } from '@tanstack/react-query';
import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import type { ChannelMessage } from '@/context/ChannelMessages';
import { useChannelMessages } from '@/hooks/context/useChannelMessages';

// Define props type
interface IProps {
  children: React.ReactNode;
}

// Define the context value type
interface ISocketContext {
  socket: Socket | null;
  joinChannel: (channelId: string) => void;
  leaveChannel: (channelId: string) => void;
  currentChannel: string | null;
}

// Create the context with proper typing
const SocketContext = createContext<ISocketContext | null>(null);

export const SocketContextProvider: React.FC<IProps> = ({ children }) => {
  const [currentChannel, setCurrentChannel] = useState<string | null>(null);
  const { setMessageList } = useChannelMessages();
  const socketRef = useRef<Socket | null>(null);
  const queryClient = useQueryClient();

  // Initialize socket once and set up listeners
  useEffect(() => {
    console.log('🔧 SocketContext useEffect running');
    console.log('🔧 Socket URL:', import.meta.env.VITE_BACKEND_SOCKET_URL);

    // Create socket connection only once
    if (!socketRef.current) {
      console.log('🔌 Creating new socket connection...');

      socketRef.current = io(import.meta.env.VITE_BACKEND_SOCKET_URL as string, {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        transports: ['websocket', 'polling'], // Try both transports
      });

      console.log('✅ Socket initialized:', socketRef.current);
      console.log('🔍 Socket connected?', socketRef.current.connected);
      console.log('🔍 Socket ID:', socketRef.current.id);

      // Add connection event listeners
      socketRef.current.on('connect', () => {
        console.log('✅ Socket connected successfully!');
        console.log('🔍 Socket ID after connect:', socketRef.current?.id);
      });

      socketRef.current.on('disconnect', (reason) => {
        console.log('❌ Socket disconnected:', reason);
      });

      socketRef.current.on('connect_error', (error) => {
        console.error('❌ Socket connection error:', error);
        console.error('❌ Error message:', error.message);
      });

      socketRef.current.on('reconnect_attempt', (attemptNumber) => {
        console.log('🔄 Reconnection attempt:', attemptNumber);
      });

      socketRef.current.on('reconnect', (attemptNumber) => {
        console.log('✅ Reconnected after', attemptNumber, 'attempts');
      });
    } else {
      console.log('ℹ️ Socket already exists:', socketRef.current);
      console.log('🔍 Socket connected?', socketRef.current.connected);
    }

    const socket = socketRef.current;

    // Set up the NewMessageReceived listener
    const handleNewMessage = (data: ChannelMessage & { roomId?: string }) => {
      console.log('📨 New message received:', data);

      // Use functional update to avoid stale closure
      setMessageList((prevMessages) => {
        // Check if message already exists to prevent duplicates
        const messageExists = prevMessages.some((msg) => msg._id === data._id);
        if (messageExists) {
          console.log('⚠️ Duplicate message, skipping');
          return prevMessages;
        }
        console.log('✅ Adding message to UI');
        // Add new message at the end (chronological order)
        return [...prevMessages, data];
      });

      // Extract the actual ID string (handle both string and object cases)
      const channelId = typeof data.channelId === 'string'
        ? data.channelId
        : (data.channelId as unknown as { _id: string })?._id || null;
      const roomId = data.roomId;

      console.log('🔍 Extracted IDs:', { channelId, roomId });

      // Update React Query cache to persist the message
      if (channelId) {
        console.log('📝 Updating channel cache:', channelId);
        // Update channel message cache
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
      } else if (roomId) {
        console.log('💬 Updating DM cache:', roomId);
        // Update DM message cache
        queryClient.setQueryData(
          [`getDMById-${roomId}`],
          (oldData: { room: { _id: string }; messages: ChannelMessage[] } | undefined) => {
            if (!oldData) {
              return { room: { _id: roomId }, messages: [data] };
            }

            // Check if message already exists in cache
            const exists = oldData.messages?.some((msg) => msg._id === data._id);
            if (exists) return oldData;

            // Add new message to DM cache
            return {
              ...oldData,
              messages: [...(oldData.messages || []), data],
            };
          }
        );
      } else {
        console.error('❌ No channelId or roomId found in message:', data);
      }
    };

    console.log('🔧 Setting up NewMessageReceived listener');
    socket.on('NewMessageReceived', handleNewMessage);

    // Cleanup function
    return () => {
      console.log('🧹 Cleaning up NewMessageReceived listener');
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
    if (!socketRef.current) {
      console.error('❌ Cannot join - socket ref is null');
      return;
    }

    if (!socketRef.current.connected) {
      console.error('❌ Cannot join - socket is not connected');
      return;
    }

    console.log('🔌 Joining channel/room:', channelId);
    console.log('🔌 Socket ID:', socketRef.current.id);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socketRef.current.emit('JoinChannel', { channelId }, (data: any) => {
      if (data?.error) {
        console.error('❌ Failed to join channel/room:', data.error);
        return;
      }
      console.log('✅ Successfully joined channel/room:', channelId);
      console.log('✅ Join response:', data);
      // Store the channel/room ID directly
      setCurrentChannel(channelId);
    });
  }, []); // Empty deps - socket is stable via ref

  const leaveChannel = useCallback((channelId: string) => {
    if (!socketRef.current) {
      console.error('❌ Cannot leave - socket ref is null');
      return;
    }

    console.log('🚪 Leaving channel/room:', channelId);
    socketRef.current.emit('LeaveChannel', { channelId });
    setCurrentChannel(null);
    console.log('✅ Left channel/room and cleared currentChannel');
  }, []); // Empty deps - socket is stable via ref

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, joinChannel, leaveChannel, currentChannel }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
