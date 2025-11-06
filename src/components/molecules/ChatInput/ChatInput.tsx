import { useQueryClient } from '@tanstack/react-query';
import React, { memo } from 'react';

import Editor from '@/components/atoms/Editor/Editor';
import { useAuth } from '@/hooks/context/useAuth';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';
import { useSocket } from '@/hooks/context/useSocket';

const ChatInput: React.FC = () => {
  const { socket, currentChannel } = useSocket();
  const { auth } = useAuth();
  const { currentWorkspace } = useCurrentWorkspace();
  const queryClient = useQueryClient();

  async function handleSubmit({ body }: { body: string }) {
    console.log(body);
    socket?.emit(
      'NewMessage',
      {
        channelId: currentChannel,
        body,
        senderId: auth?.user?._id,
        workspaceId: currentWorkspace?._id,
      },
      (data) => {
        console.log('Message sent', data);
      }
    );
    queryClient.invalidateQueries({ queryKey: [`getChannelById`] });
  }

  return (
    <div className="px-5 w-full">
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
