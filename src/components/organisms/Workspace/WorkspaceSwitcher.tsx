import { Loader } from 'lucide-react';
import React, { memo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useFetchWorkspace } from '@/hooks/apis/workspaces/useFetchWorkspace';
import { useGetWorkspaceById } from '@/hooks/apis/workspaces/useGetWorkspaceById';

interface WorkspaceData {
  _id: string;
  name: string;
  channels: string[];
}

const WorkspaceSwitcher: React.FC = () => {
  const navigate = useNavigate();
  const { workspaces, isFetching: isFetchingWorkspace } = useFetchWorkspace();
  const { workspaceId } = useParams();
  const { isFetching, workspace } = useGetWorkspaceById(workspaceId || '');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="w-[44px] h-[44px] flex items-center justify-center rounded-lg relative overflow-hidden bg-ocean-secondary hover:bg-ocean-secondary/80 font-semibold text-white text-xl">
          {isFetching ? (
            <Loader className="size-5 animate-spin" />
          ) : (
            workspace?.name.charAt(0).toUpperCase()
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer flex-col justify-start items-start">
          {workspace?.name}
          <span className="text-xs text-muted-foregorund">(Active Workspace)</span>
        </DropdownMenuItem>
        {isFetchingWorkspace ? (
          <Loader className="size-5 animate-spin" />
        ) : (
          workspaces?.map((workspace: WorkspaceData) => {
            if (workspace._id === workspaceId) {
              return null;
            }
            return (
              <DropdownMenuItem
                className="cursor-pointer flex-col justify-start items-start"
                onClick={() =>
                  navigate(`/workspaces/${workspace._id}/channels/${workspace.channels[0]}`)
                }
                key={workspace._id}
              >
                <p className="truncate">{workspace?.name}</p>
              </DropdownMenuItem>
            );
          })
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(WorkspaceSwitcher);
