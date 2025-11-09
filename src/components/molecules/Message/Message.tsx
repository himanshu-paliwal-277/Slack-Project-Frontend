import React, { memo } from 'react';

import MessageRenderer from '@/components/atoms/MessageRenderer/MessageRenderer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatTo12HourTime } from '@/utils/timeFormatter';

interface IProps {
  authorImage: string;
  authorName: string;
  createdAt: string;
  body: string;
}

const Message: React.FC<IProps> = ({ authorImage, authorName, createdAt, body }) => {
  return (
    <div className="flex flex-col gap-2 p-1.5 sm:px-5 px-4 hover:bg-gray-100/60 group relative">
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
          {/* Any images if there are */}
        </div>
      </div>
    </div>
  );
};

export default memo(Message);
