import React, { memo } from 'react';
import { useParams } from 'react-router-dom';

const sendMessageSound = '/audio/sendMessageSound.mp3';
import Editor from '@/components/atoms/Editor/Editor';
import { useAuth } from '@/hooks/context/useAuth';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';
import { useSocket } from '@/hooks/context/useSocket';

const ChatInput: React.FC = () => {
  const { socket, currentChannel } = useSocket();
  const { auth } = useAuth();
  const { currentWorkspace } = useCurrentWorkspace();
  const { dmId } = useParams<{ channelId?: string; dmId?: string }>();

  async function handleSubmit({ body }: { body: string }) {
    if (!socket) {
      console.error('❌ Socket is not connected');
      return;
    }

    if (!socket.connected) {
      console.error('❌ Socket is disconnected');
      return;
    }

    if (!currentChannel) {
      console.error('❌ No current channel/room ID');
      return;
    }

    // Determine if we're in a channel or DM based on route params
    const isDM = !!dmId;
    const messagePayload = isDM
      ? {
          roomId: currentChannel,
          body,
          senderId: auth?.user?._id,
          workspaceId: currentWorkspace?._id,
        }
      : {
          channelId: currentChannel,
          body,
          senderId: auth?.user?._id,
          workspaceId: currentWorkspace?._id,
        };

    console.log('📤 Sending message:', {
      isDM,
      type: isDM ? 'DM' : 'Channel',
      targetId: currentChannel,
      messagePayload,
    });

    // Set a timeout to detect if the message wasn't acknowledged
    const timeout = setTimeout(() => {
      console.error('⏱️ Message send timeout - no acknowledgment received');
    }, 5000);

    socket.emit(
      'NewMessage',
      messagePayload,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (response: any) => {
        clearTimeout(timeout);

        console.log('✅ Message acknowledgment received:', response);

        if (response?.error) {
          console.error('❌ Backend error:', response.error);
          return;
        }

        // Play send message sound after successful send (like WhatsApp)
        const audio = new Audio(sendMessageSound);
        audio.play().catch((error) => {
          console.log('Error playing sound:', error);
        });
      }
    );
  }

  return (
    <div className="sm:px-5 px-4 w-full">
      <Editor
        placeholder="Type a message..."
        onSubmit={handleSubmit}
        onCancel={() => {}}
        disabled={false}
        defaultValue=""
      />
    </div>
  );
};

export default memo(ChatInput);
