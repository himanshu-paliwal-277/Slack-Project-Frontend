import React, { memo } from 'react';

import { Button } from '@/components/ui/button';

interface IProps {
  Icon: React.ElementType; // ✅ FIXED: use ElementType instead of ReactNode
  label: string;
}

const SidebarButton: React.FC<IProps> = ({ Icon, label }) => {
  return (
    <div className="flex flex-col items-center justify-center cursor-pointer gap-y-0.5 group">
      <Button variant="transparent" className="size-9 p-2 group-hover:bg-accent/20 cursor-pointer">
        <Icon className="size-5 text-white group-hover:scale-110 transition-all" />
      </Button>
      <span className="text-[10px] text-white group-hover:text-accent">{label}</span>
    </div>
  );
};

export default memo(SidebarButton);
