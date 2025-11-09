import React, { memo } from 'react';

import Editor from '@/components/atoms/Editor/Editor';
import { useAuth } from '@/hooks/context/useAuth';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';
import { useSocket } from '@/hooks/context/useSocket';

const ChatInput: React.FC = () => {
  const { socket, currentChannel } = useSocket();
  const { auth } = useAuth();
  const { currentWorkspace } = useCurrentWorkspace();

  async function handleSubmit({ body }: { body: string }) {
    console.log(body);
    socket?.emit(
      'NewMessage',
      {
        channelId: currentChannel,
        roomId: currentChannel,
        body,
        senderId: auth?.user?._id,
        workspaceId: currentWorkspace?._id,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (data: any) => {
        console.log('Message sent', data);
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
