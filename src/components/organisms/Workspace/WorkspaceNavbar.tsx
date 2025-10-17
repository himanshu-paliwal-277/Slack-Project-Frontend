import { InfoIcon, SearchIcon } from 'lucide-react';
import React, { memo } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { useGetWorkspaceById } from '@/hooks/apis/workspaces/useGetWorkspaceById';

const WorkspaceNavbar: React.FC = () => {
  const { workspaceId } = useParams();

  const { workspace } = useGetWorkspaceById(workspaceId || '');

  return (
    <nav className="flex items-center h-[50px] justify-center px-3">
      <div className="flex-1" />
      <div>
        <Button size="sm" className="bg-accent/25 hover:bg-accent/15 w-full justify-start h-7 px-2">
          <SearchIcon className="size-5 text-white mr-2" />
          <span className="text-white text-xs">Search in {workspace?.name || 'Workspace'}</span>
        </Button>
      </div>

      <div className="ml-auto flex-1 flex items-center justify-end">
        <Button variant="transparent" size="iconSm">
          <InfoIcon className="size-5 text-white" />
        </Button>
      </div>
    </nav>
  );
};

export default memo(WorkspaceNavbar);
