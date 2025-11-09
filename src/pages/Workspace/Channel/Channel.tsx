// import { useQueryClient } from '@tanstack/react-query';
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
  // const queryClient = useQueryClient();

  const { channelDetails, isFetching, isError } = useGetChannelById(channelId || '');
  const { messageList, setMessageList } = useChannelMessages();
  const { joinChannel } = useSocket();
  const { messages, isFetching: isFetchingMessages } = useGetChannelMessages(channelId as string);

  const messageContainerListRef = useRef<HTMLDivElement>(null);

  // Update messages when data is available (from cache or fresh fetch)
  useEffect(() => {
    if (messages) {
      setMessageList([...messages].reverse());
    } else {
      // Clear messages when switching to a channel with no data yet
      setMessageList([]);
    }
  }, [messages, channelId, setMessageList]);

  // Auto scroll to bottom when messageList updates
  useEffect(() => {
    if (messageContainerListRef.current) {
      const el = messageContainerListRef.current;
      el.scrollTo({ top: el.scrollHeight });
    }
  }, [messageList]);

  // Join channel socket only when data is ready
  useEffect(() => {
    if (!isFetching && !isError && channelId) {
      joinChannel(channelId);
    }
  }, [isFetching, isError, joinChannel, channelId]);

  return (
    <div className="flex flex-col h-full">
      <ChannelHeader name={channelDetails?.name} isFetching={isFetching} />
      <div className="flex flex-col h-[calc(100%-50px)] relative">
        {/* Loader - Only show when loading AND no cached data to display */}
        {(isFetching || (isFetchingMessages && messageList.length === 0)) && (
          <div className="flex-1 flex items-center justify-center w-full">
            <Loader2Icon className="size-7 animate-spin text-muted-foreground" />
          </div>
        )}

        {/* Error */}
        {isError && !isFetching && (
          <div className="absolute inset-0 flex flex-col gap-y-2 items-center justify-center bg-background z-10">
            <TriangleAlertIcon className="size-6 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Channel Not Found</span>
          </div>
        )}

        {/* Messages - Show when not loading or when we have cached data */}
        {!isFetching && !(isFetchingMessages && messageList.length === 0) && !isError && (
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
