import { useQueryClient } from '@tanstack/react-query';
import { Loader2Icon, TriangleAlertIcon } from 'lucide-react';
import React, { memo, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import ChannelHeader from '@/components/molecules/Channel/ChannelHeader';
import ChatInput from '@/components/molecules/ChatInput/ChatInput';
import Message from '@/components/molecules/Message/Message';
import { useGetChannelById } from '@/hooks/apis/channel/useGetChannelDetails';
import { useGetChannelMessages } from '@/hooks/apis/channel/useGetChannelMessages';
import { useChannelMessages } from '@/hooks/context/useChannelMessages';
import { useSocket } from '@/hooks/context/useSocket';

const Channel: React.FC = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const queryClient = useQueryClient();

  const { channelDetails, isFetching, isError } = useGetChannelById(channelId || '');
  const { setMessageList, messageList } = useChannelMessages();
  const { joinChannel } = useSocket();
  const { messages, isSuccess } = useGetChannelMessages(channelId as string);

  const messageContainerListRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messageList updates
  useEffect(() => {
    if (messageContainerListRef.current) {
      const el = messageContainerListRef.current;
      el.scrollTo({ top: el.scrollHeight });
    }
  }, [messageList]);

  // Refetch messages when channel changes
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['getPaginatedMessages'] });
  }, [channelId]);

  // Join channel socket only when data is ready
  useEffect(() => {
    if (!isFetching && !isError && channelId) {
      joinChannel(channelId);
    }
  }, [isFetching, isError, joinChannel, channelId]);

  // Update messages after fetch success
  useEffect(() => {
    if (isSuccess && messages) {
      setMessageList(messages.reverse());
    }
  }, [isSuccess, messages, setMessageList, channelId]);

  return (
    <div className="flex flex-col h-full">
      <ChannelHeader name={channelDetails?.name} />
      <div className="flex flex-col h-[calc(100%-50px)] relative">
        {/* Loader */}
        {isFetching && (
          <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
            <Loader2Icon className="size-7 animate-spin text-muted-foreground" />
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="absolute inset-0 flex flex-col gap-y-2 items-center justify-center bg-background z-10">
            <TriangleAlertIcon className="size-6 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Channel Not Found</span>
          </div>
        )}

        {/* Messages */}
        {!isFetching && !isError && (
          <div
            ref={messageContainerListRef}
            className="flex-1 overflow-y-auto py-2"
            style={{ scrollbarWidth: 'thin' }}
          >
            {messageList?.length === 0 ? (
              <div className="flex justify-center items-center w-full h-full">
                <p className="text-gray-500">No messages</p>
              </div>
            ) : (
              messageList?.map((message) => (
                <Message
                  key={message._id}
                  body={message.body}
                  authorImage={message.senderId?.avatar}
                  authorName={message.senderId?.userName}
                  createdAt={message.createdAt}
                />
              ))
            )}
          </div>
        )}

        <ChatInput />
      </div>
    </div>
  );
};

export default memo(Channel);
