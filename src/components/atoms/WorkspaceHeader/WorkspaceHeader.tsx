import { ArrowLeft } from 'lucide-react';
import React, { memo } from 'react';

import { Button } from '@/components/ui/button';
import { useOpenDrawer } from '@/hooks/context/useOpenDrawer';

interface IProps {
  title: string;
}

const WorkspaceHeader: React.FC<IProps> = ({ title }) => {
  const { setOpenOpenDrawer } = useOpenDrawer();

  return (
    <div className="bg-white border-b h-[50px] flex items-center px-4 overflow-hidden">
      <Button
        variant={'transparent'}
        className="sm:hidden flex !p-1"
        onClick={() => setOpenOpenDrawer(true)}
      >
        <ArrowLeft className="size-5" color="black" />
      </Button>
      <p className="text-lg font-semibold sm:px-0 px-2">{title}</p>
    </div>
  );
};

export default memo(WorkspaceHeader);
