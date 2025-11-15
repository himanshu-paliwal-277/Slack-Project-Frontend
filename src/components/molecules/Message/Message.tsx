import { Forward, MoreHorizontal, Reply, SaveIcon, Smile } from 'lucide-react'; // ✅ sample icons
import React, { memo, useEffect, useRef } from 'react';

import Hint from '@/components/atoms/Hint/Hint'; // ✅ import Hint
import MessageImageThumbnail from '@/components/atoms/MessageImageThumbnail/MessageImageThumbnail';
import MessageRenderer from '@/components/atoms/MessageRenderer/MessageRenderer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatTo12HourTime } from '@/utils/timeFormatter';

interface IProps {
  authorImage: string;
  authorName: string;
  createdAt: string;
  body: string;
  image?: string;
  messageId?: string;
  activeMessageId?: string | null;
  onSetActiveMessage?: (messageId: string | null) => void;
}

const Message: React.FC<IProps> = ({
  authorImage,
  authorName,
  createdAt,
  body,
  image,
  messageId,
  activeMessageId,
  onSetActiveMessage,
}) => {
  const longPressTimer = useRef<number | null>(null);
  const isMobile = window.innerWidth < 640;

  // Check if this message's actions should be shown
  const showActions = activeMessageId === messageId;

  // Handle touch start (long press start)
  const handleTouchStart = () => {
    if (isMobile && onSetActiveMessage && messageId) {
      longPressTimer.current = window.setTimeout(() => {
        onSetActiveMessage(messageId);
      }, 500); // 500ms long press duration
    }
  };

  // Handle touch end (cancel long press)
  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  // Handle touch move (cancel long press if user moves finger)
  const handleTouchMove = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  // Hide actions when clicking anywhere on mobile
  useEffect(() => {
    const handleClickAnywhere = () => {
      if (isMobile && showActions && onSetActiveMessage) {
        onSetActiveMessage(null);
      }
    };

    if (isMobile && showActions) {
      document.addEventListener('click', handleClickAnywhere);
      return () => {
        document.removeEventListener('click', handleClickAnywhere);
      };
    }
  }, [isMobile, showActions, onSetActiveMessage]);

  return (
    <div
      className="flex flex-col gap-1 py-2 sm:px-5 px-4 hover:bg-gray-100/60 group relative"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      {/* Hover Action Box */}
      <div
        className={`absolute right-0 top-[-15px] transition-opacity flex items-center gap-1 bg-white shadow-md border-1 border-gray-200 rounded-lg px-2 py-1 z-10 ${
          isMobile
            ? showActions
              ? 'opacity-100'
              : 'opacity-0 pointer-events-none'
            : 'opacity-0 group-hover:opacity-100'
        }`}
      >
        <Hint label="React">
          <button className="cursor-pointer p-1.5 hover:bg-gray-100 rounded-lg">
            <Smile className="w-4 h-4 text-gray-600" />
          </button>
        </Hint>

        <Hint label="Reply">
          <button className="cursor-pointer p-1.5 hover:bg-gray-100 rounded-lg">
            <Reply className="w-4 h-4 text-gray-600" />
          </button>
        </Hint>

        <Hint label="Forward">
          <button className="cursor-pointer p-1.5 hover:bg-gray-100 rounded-lg">
            <Forward className="w-4 h-4 text-gray-600" />
          </button>
        </Hint>
        <Hint label="Save">
          <button className="cursor-pointer p-1.5 hover:bg-gray-100 rounded-lg">
            <SaveIcon className="w-4 h-4 text-gray-600" />
          </button>
        </Hint>

        <Hint label="More options">
          <button className="p-1.5 hover:bg-gray-100 rounded-lg">
            <MoreHorizontal className="w-4 h-4 text-gray-600" />
          </button>
        </Hint>
      </div>

      {/* Message Content */}
      <div className="flex items-start gap-3">
        <button>
          <Avatar className="w-[36px] h-[36px] bg-gray-200 rounded-lg">
            <AvatarImage className="rounded-md" src={authorImage} />
            <AvatarFallback className="rounded-md bg-sky-500 text-white text-sm">
              {authorName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </button>

        <div className="flex flex-col w-full overflow-hidden">
          <div className="flex gap-2 items-center text-xs mb-1">
            <button className="font-bold text-primary text-[14px] hover:underline">
              {authorName}
            </button>
            <button className="text-xs text-muted-foreground hover:underline">
              {formatTo12HourTime(createdAt) || 'Just now'}
            </button>
          </div>

          <MessageRenderer value={body} />
          {image && <MessageImageThumbnail url={image} />}
        </div>
      </div>
    </div>
  );
};

export default memo(Message);
