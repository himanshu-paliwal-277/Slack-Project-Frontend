import { ChevronDown } from 'lucide-react';
import React, { memo } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DateDividerProps {
  date: string;
}

const DateDivider: React.FC<DateDividerProps> = ({ date }) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const todayStr = today.toDateString();
  const yesterdayStr = yesterday.toDateString();

  // Format other dates like "15 Aug 2025"
  const formattedDate =
    date === todayStr
      ? 'Today'
      : date === yesterdayStr
        ? 'Yesterday'
        : new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          });

  return (
    <div className="relative flex items-center justify-center py-3 ">
      <div className="absolute  left-0 h-[1px] w-full bg-gray-300" />
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1 sticky top-20 z-[1] cursor-pointer border-[1px] border-gray-300 bg-white shadow-sm sm:text-sm text-xs px-3 py-[2px] rounded-full">
          <span>{formattedDate}</span>
          <ChevronDown className="sm:size-4 size-3" />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="center" className="w-64">
          <DropdownMenuItem className="cursor-pointer">Most Recent</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Last Week</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Last Month</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default memo(DateDivider);
