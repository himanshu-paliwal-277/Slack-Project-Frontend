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

  useEffect(() => {
    console.log('messageList change');
    if (messageContainerListRef.current) {
      console.log('scrollTo bottom');
      const el = messageContainerListRef.current;
      el.scrollTo({
        top: el.scrollHeight,
        behavior: 'smooth', // or "auto"
      });
    }
  }, [messageList]);

  useEffect(() => {
    console.log('ChannelId', channelId);
    queryClient.invalidateQueries({ queryKey: [`getPaginatedMessages`] });
  }, [channelId]);

  useEffect(() => {
    if (!isFetching && !isError) {
      joinChannel(channelId || '');
    }
  }, [isFetching, isError, joinChannel, channelId]);

  useEffect(() => {
    if (isSuccess) {
      console.log('Channel Messages fetched');
      setMessageList(messages?.reverse());
    }
  }, [isSuccess, messages, setMessageList, channelId]);

  if (isFetching) {
    return (
      <div className="h-full flex-1 flex items-center justify-center">
        <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-full flex-1 flex flex-col gap-y-2 items-center justify-center">
        <TriangleAlertIcon className="size-6 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Channel Not found</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ChannelHeader name={channelDetails?.name} />
      <div className="flex flex-col h-full">
        <div ref={messageContainerListRef} className="flex-1 overflow-y-auto">
          {/* {channelDetails.messages.map((message, index) => (
            <Message
              key={index ** 2}
              authorImage={message.senderId.avatar}
              authorName={message.senderId.userName}
              createdAt={message.createdAt}
              body={message.body}
            />
          ))} */}
          {messageList?.map(
            (message: { _id: string; body: string; senderId: any; createdAt: string }) => {
              return (
                <Message
                  key={message._id}
                  body={message.body}
                  authorImage={message.senderId?.avatar}
                  authorName={message.senderId?.username}
                  createdAt={message.createdAt}
                />
              );
            }
          )}
        </div>
        <ChatInput />
      </div>
    </div>
  );
};

export default memo(Channel);
