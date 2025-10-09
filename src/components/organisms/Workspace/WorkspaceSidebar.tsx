import { BellIcon, HomeIcon, MessageSquareIcon, MoreHorizontalIcon } from 'lucide-react';
import React, { memo } from 'react';

import UserButton from '@/components/atoms/UserButton/UserButton';
import SidebarButton from '@/components/molecules/SidebarButton/SidebarButton';

const WorkspaceSidebar: React.FC = () => {
  return (
    <aside className="w-[70px] h-full bg-slack flex flex-col gap-y-4 items-center pt-[10px] pb-[5px]">
      <SidebarButton Icon={HomeIcon} label="Home" />

      <SidebarButton Icon={MessageSquareIcon} label="DMs" />

      <SidebarButton Icon={BellIcon} label="Notifications" />

      <SidebarButton Icon={MoreHorizontalIcon} label="More" />

      <div className="flex flex-col items-center justify-center mt-auto mb-5 gap-y-1">
        <UserButton />
      </div>
    </aside>
  );
};

export default memo(WorkspaceSidebar);
