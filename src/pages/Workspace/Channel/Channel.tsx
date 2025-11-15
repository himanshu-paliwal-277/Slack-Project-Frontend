import { Loader2Icon, TriangleAlertIcon } from 'lucide-react';
import React, { memo, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import DateDivider from '@/components/atoms/DateDivider/DateDivider';
import ChannelHeader from '@/components/molecules/Channel/ChannelHeader';
import ChatInput from '@/components/molecules/ChatInput/ChatInput';
import Message from '@/components/molecules/Message/Message';
import { useGetChannelById } from '@/hooks/apis/channel/useGetChannelDetails';
import { useGetChannelMessages } from '@/hooks/apis/channel/useGetChannelMessages';
import { useChannelMessages } from '@/hooks/context/useChannelMessages';
import { useSocket } from '@/hooks/context/useSocket';
import { groupMessagesByDate } from '@/utils/groupMessagesByDate';

const Channel: React.FC = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const { channelDetails, isFetching, isError } = useGetChannelById(channelId || '');
  const { messageList, setMessageList } = useChannelMessages();
  const { joinChannel, leaveChannel } = useSocket();
  const { messages, isFetching: isFetchingMessages } = useGetChannelMessages(channelId as string);

  const messageContainerListRef = useRef<HTMLDivElement>(null);
  const previousChannelIdRef = useRef<string | undefined>(undefined);
  const [activeMessageId, setActiveMessageId] = useState<string | null>(null);

  // Update messages when fetched
  useEffect(() => {
    if (messages && messages.length > 0) {
      // Sort messages by createdAt to ensure chronological order
      const sortedMessages = [...messages].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      setMessageList(sortedMessages);
    } else {
      setMessageList([]);
    }
    // Reset active message when channel changes
    setActiveMessageId(null);
  }, [messages, channelId, setMessageList]);

  // ✅ Fixed Scroll to bottom issue
  useEffect(() => {
    const el = messageContainerListRef.current;
    if (!el) return;

    // Use slight delay to ensure DOM + messages are fully rendered before measuring scroll height
    const timeout = setTimeout(() => {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: 'smooth',
      });
    }, 50);

    return () => clearTimeout(timeout);
  }, [messageList, channelId]);

  // Join socket when ready and leave when switching channels
  useEffect(() => {
    if (!isFetching && !isError && channelId) {
      // Leave previous channel if it exists
      if (previousChannelIdRef.current && previousChannelIdRef.current !== channelId) {
        leaveChannel(previousChannelIdRef.current);
      }

      // Join new channel
      joinChannel(channelId);
      previousChannelIdRef.current = channelId;
    }

    // Cleanup: leave channel when component unmounts
    return () => {
      if (channelId) {
        leaveChannel(channelId);
      }
    };
  }, [isFetching, isError, joinChannel, leaveChannel, channelId]);

  // ✅ Group messages by date
  const groupedMessages = groupMessagesByDate(messageList);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Fixed Header */}
      <div className="flex-shrink-0">
        <ChannelHeader
          name={channelDetails?.name}
          isFetching={isFetching}
          members={channelDetails?.workspaceId?.members}
        />
      </div>

      {/* Messages Area - Flexible and scrollable */}
      <div className="flex-1 min-h-0 relative">
        {(isFetching || (isFetchingMessages && messageList.length === 0)) && (
          <div className="absolute inset-0 flex items-center justify-center w-full">
            <Loader2Icon className="size-7 animate-spin text-muted-foreground" />
          </div>
        )}

        {isError && !isFetching && (
          <div className="absolute inset-0 flex flex-col gap-y-2 items-center justify-center bg-background z-10">
            <TriangleAlertIcon className="size-6 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Channel Not Found</span>
          </div>
        )}

        {!isFetching && !(isFetchingMessages && messageList.length === 0) && !isError && (
          <div
            ref={messageContainerListRef}
            className="h-full overflow-y-auto py-2 space-y-4"
            style={{ scrollbarWidth: 'thin' }}
          >
            {messageList?.length === 0 ? (
              <div className="flex justify-center items-center w-full h-full">
                <p className="text-gray-500">No messages</p>
              </div>
            ) : (
              Object.entries(groupedMessages).map(([date, messagesData]) => (
                <div key={date} className="">
                  <DateDivider date={date} />

                  {messagesData.map((message) => (
                    <Message
                      key={message._id}
                      messageId={message._id}
                      body={message.body}
                      image={message.image}
                      authorImage={message.senderId?.avatar}
                      authorName={message.senderId?.userName}
                      createdAt={message.createdAt}
                      activeMessageId={activeMessageId}
                      onSetActiveMessage={setActiveMessageId}
                    />
                  ))}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Fixed Chat Input at Bottom */}
      <div className="flex-shrink-0 pb-2">
        <ChatInput />
      </div>
    </div>
  );
};

export default memo(Channel);
