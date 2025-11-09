import React, { memo } from 'react';

import { Button } from '@/components/ui/button';

interface IProps {
  Icon: React.ElementType; // ✅ FIXED: use ElementType instead of ReactNode
  label: string;
  handleClick: () => void;
  active: boolean;
}

const SidebarButton: React.FC<IProps> = ({ Icon, label, handleClick, active }) => {
  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-center justify-center cursor-pointer gap-y-0.5 group"
    >
      <Button
        variant="transparent"
        className={`size-9 p-2 group-hover:bg-accent/10 cursor-pointer ${active ? 'bg-gray-200/20' : ''}`}
      >
        <Icon className="size-5 text-white group-hover:scale-110 transition-all" />
      </Button>
      <span className="text-[10px] text-white group-hover:text-accent">{label}</span>
    </div>
  );
};

export default memo(SidebarButton);
