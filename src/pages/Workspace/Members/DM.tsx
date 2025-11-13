import { Loader2Icon, TriangleAlertIcon } from 'lucide-react';
import React, { memo, useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';

import DateDivider from '@/components/atoms/DateDivider/DateDivider';
import DmHeader from '@/components/atoms/DmHeader/DmHeader';
import ChatInput from '@/components/molecules/ChatInput/ChatInput';
import Message from '@/components/molecules/Message/Message';
import { useGetDMById } from '@/hooks/apis/dm/useGetDMById';
import { useAuth } from '@/hooks/context/useAuth';
import { useChannelMessages } from '@/hooks/context/useChannelMessages';
import { useSocket } from '@/hooks/context/useSocket';
import { groupMessagesByDate } from '@/utils/groupMessagesByDate';

const DM: React.FC = () => {
  const { dmId } = useParams<{ dmId: string }>();
  const { dmData, isFetching, isError } = useGetDMById(dmId || '');
  const { messageList, setMessageList } = useChannelMessages();
  const { joinChannel, leaveChannel } = useSocket();
  const { auth } = useAuth();

  const messageContainerListRef = useRef<HTMLDivElement>(null);
  const previousDmIdRef = useRef<string | undefined>(undefined);

  // Update messages when fetched
  useEffect(() => {
    if (dmData?.messages && dmData.messages.length > 0) {
      const sortedMessages = [...dmData.messages].sort(
        (a: { createdAt: string }, b: { createdAt: string }) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      setMessageList(sortedMessages);
    } else {
      setMessageList([]);
    }
  }, [dmData?.messages, dmId, setMessageList]);

  // Scroll to bottom
  useEffect(() => {
    const el = messageContainerListRef.current;
    if (!el) return;

    const timeout = setTimeout(() => {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: 'smooth',
      });
    }, 50);

    return () => clearTimeout(timeout);
  }, [messageList, dmId]);

  // Join socket when switching DMs
  useEffect(() => {
    if (!isFetching && !isError && dmId) {
      if (previousDmIdRef.current && previousDmIdRef.current !== dmId) {
        leaveChannel(previousDmIdRef.current);
      }

      joinChannel(dmId);
      previousDmIdRef.current = dmId;
    }

    return () => {
      if (dmId) {
        leaveChannel(dmId);
      }
    };
  }, [isFetching, isError, joinChannel, leaveChannel, dmId]);

  // Group messages by date
  const groupedMessages = groupMessagesByDate(messageList);

  // Get the other user in the DM conversation
  const otherUser = useMemo(() => {
    if (!dmData?.room || !auth.user?._id) {
      return null;
    }

    const currentUserId = auth.user._id;

    // The backend now populates members with full user objects
    const dmMembers = dmData.room.members || [];

    // Find the other user (not the current user)
    const otherUserData = dmMembers.find((member: { _id: string }) => member._id !== currentUserId);

    return otherUserData || null;
  }, [dmData, auth.user]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Fixed Header */}
      <DmHeader isFetching={isFetching} otherUser={otherUser} />

      {/* Messages Area */}
      <div className="flex-1 min-h-0 relative">
        {isFetching && messageList.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center w-full">
            <Loader2Icon className="size-7 animate-spin text-muted-foreground" />
          </div>
        )}

        {isError && !isFetching && (
          <div className="absolute inset-0 flex flex-col gap-y-2 items-center justify-center bg-background z-10">
            <TriangleAlertIcon className="size-6 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Something went wrong</span>
          </div>
        )}

        {!isFetching && !isError && (
          <div
            ref={messageContainerListRef}
            className="h-full overflow-y-auto py-2 space-y-4"
            style={{ scrollbarWidth: 'thin' }}
          >
            {messageList?.length === 0 ? (
              <div className="flex justify-center items-center w-full h-full">
                <p className="text-gray-500">No messages yet</p>
              </div>
            ) : (
              Object.entries(groupedMessages).map(([date, messagesData]) => (
                <div key={date} className="space-y-2">
                  <DateDivider date={date} />

                  {messagesData.map((message) => (
                    <Message
                      key={message._id}
                      body={message.body}
                      image={message.image}
                      authorImage={message.senderId?.avatar}
                      authorName={message.senderId?.userName}
                      createdAt={message.createdAt}
                    />
                  ))}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="flex-shrink-0 pb-2">
        <ChatInput />
      </div>
    </div>
  );
};

export default memo(DM);
