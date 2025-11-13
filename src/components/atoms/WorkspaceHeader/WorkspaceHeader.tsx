import { ArrowLeft } from 'lucide-react';
import React, { memo } from 'react';

import { Button } from '@/components/ui/button';

interface IProps {
  title: string;
}

const WorkspaceHeader: React.FC<IProps> = ({ title }) => {
  return (
    <div className="bg-white border-b h-[50px] flex items-center px-4 overflow-hidden">
      <Button variant={'transparent'} className="sm:hidden flex !p-1">
        <ArrowLeft className="size-5" color="black" />
      </Button>
      <p className="text-lg font-semibold">{title}</p>
    </div>
  );
};

export default memo(WorkspaceHeader);
