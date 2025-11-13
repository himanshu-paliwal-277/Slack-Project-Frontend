import { ArrowLeft, Loader2Icon } from 'lucide-react';
import React, { memo } from 'react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useOpenDrawer } from '@/hooks/context/useOpenDrawer';

interface OtherUser {
  _id: string;
  userName: string;
  avatar: string;
}

interface DmHeaderProps {
  isFetching: boolean;
  otherUser: OtherUser | null;
}

const DmHeader: React.FC<DmHeaderProps> = ({ isFetching, otherUser }) => {
  const { setOpenOpenDrawer } = useOpenDrawer();

  const userName = otherUser?.userName || 'Unknown User';
  const avatarUrl = otherUser?.avatar || 'https://robohash.org/Unknown';

  return (
    <div className="flex-shrink-0 border-b border-border px-4 py-3 bg-background/80 backdrop-blur-md flex items-center gap-2">
      <Button
        variant={'transparent'}
        className="sm:hidden flex !p-1"
        onClick={() => setOpenOpenDrawer(true)}
      >
        <ArrowLeft className="size-5" color="black" />
      </Button>

      {isFetching ? (
        <div className="flex items-center gap-3">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="h-5 sm:w-[130px] w-[110px] rounded-sm" />
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <img
            src={avatarUrl}
            alt={userName}
            className="size-8 rounded-full object-cover bg-gray-300"
            onError={(e) => {
              e.currentTarget.src = 'https://robohash.org/Unknown';
            }}
          />
          <p className="font-medium text-lg">{userName}</p>
        </div>
      )}
    </div>
  );
};

export default memo(DmHeader);
