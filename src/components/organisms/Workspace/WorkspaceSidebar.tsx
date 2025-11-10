import { BellIcon, HomeIcon, MessageSquareIcon, MoreHorizontalIcon } from 'lucide-react';
import React, { memo, useState } from 'react';

import UserButton from '@/components/atoms/UserButton/UserButton';
import SidebarButton from '@/components/molecules/SidebarButton/SidebarButton';

import WorkspaceSwitcher from './WorkspaceSwitcher';

const WorkspaceSidebar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('Home');

  return (
    <div className="flex flex-1 sm:flex-col sm:justify-between sm:w-[80px] z-[10] sm:static sm:border-none border-t-2 sm:bg-transparent bg-gray-800 border-gray-600 absolute bottom-0 sm:px-0 px-10 w-full sm:h-full !h-[72px]  sm:pt-[10px] sm:pb-[5px]">
      <div className="flex justify-between w-full sm:flex-col gap-y-4 items-center">
        <div className="sm:block hidden">
          <WorkspaceSwitcher />
        </div>

        <SidebarButton
          active={activeSection === 'Home'}
          handleClick={() => setActiveSection('Home')}
          Icon={HomeIcon}
          label="Home"
        />

        <SidebarButton
          active={activeSection === 'DMs'}
          handleClick={() => setActiveSection('DMs')}
          Icon={MessageSquareIcon}
          label="DMs"
        />

        <SidebarButton
          active={activeSection === 'Activity'}
          handleClick={() => setActiveSection('Activity')}
          Icon={BellIcon}
          label="Activity"
        />

        <SidebarButton
          active={activeSection === 'More'}
          handleClick={() => setActiveSection('More')}
          Icon={MoreHorizontalIcon}
          label="More"
        />
      </div>

      <div className="sm:flex hidden flex-col items-center justify-center mt-auto mb-5 gap-y-1">
        <UserButton />
      </div>
    </div>
  );
};

export default memo(WorkspaceSidebar);
