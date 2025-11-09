import { AvatarFallback } from '@radix-ui/react-avatar';
import { ArrowLeft, EllipsisVertical } from 'lucide-react';
import React, { memo } from 'react';
import { FaChevronDown } from 'react-icons/fa';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useOpenDrawer } from '@/hooks/context/useOpenDrawer';

interface Member {
  memberId: {
    userName: string;
    email: string;
    avatar: string;
  };
  role: string;
}

interface IProps {
  name: string;
  isFetching: boolean;
  members: Member[];
}

const ChannelHeader: React.FC<IProps> = ({ name, isFetching, members }) => {
  const { setOpenOpenDrawer } = useOpenDrawer();
  return (
    <div className="bg-white border-b h-[50px] flex items-center px-4 overflow-hidden">
      <Button
        variant={'transparent'}
        className="sm:hidden flex"
        onClick={() => setOpenOpenDrawer(true)}
      >
        <ArrowLeft className="size-5" color="black" />
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="text-lg font-semibold px-2 w-auto overflow-hidden">
            #{' '}
            {isFetching ? <Skeleton className="h-5 w-[130px] rounded-sm" /> : <span>{name} </span>}
            <FaChevronDown className="size-3 ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle># {name}</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-100">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Channel name</p>
                <p className="text-sm font-semibold">Edit</p>
              </div>
              <p className="text-sm">{name}</p>
            </div>

            {/* HW implement edit dialog for editting name of a channel */}
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex-1" />
      <div className="flex items-center gap-3">
        {/* <span>4 Members</span> */}
        <div className="flex -space-x-2">
          {members?.[0]?.memberId && (
            <Avatar className="ring-2 ring-background bg-gray-300">
              <AvatarImage src={members[0].memberId.avatar} alt="avatar" />
              <AvatarFallback>
                {members[0].memberId.userName?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
          )}
          {members?.[1]?.memberId && (
            <Avatar className="ring-2 ring-background bg-gray-300">
              <AvatarImage src={members[1].memberId.avatar} alt="avatar" />
              <AvatarFallback>
                {members[1].memberId.userName?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
          )}
          {members?.[2]?.memberId && (
            <Avatar className="ring-2 ring-background bg-gray-300">
              <AvatarImage src={members[2].memberId.avatar} alt="avatar" />
              <AvatarFallback>
                {members[2].memberId.userName?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
          )}
          <Avatar className="ring-2 ring-background bg-muted text-xs font-medium flex items-center justify-center">
            {members?.length ?? 0}
          </Avatar>
        </div>

        <Button variant={'transparent'}>
          <EllipsisVertical className="size-4" color="black" />
        </Button>
      </div>
    </div>
  );
};

export default memo(ChannelHeader);
