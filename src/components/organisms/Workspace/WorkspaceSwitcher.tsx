import { Loader } from 'lucide-react';
import React, { memo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
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
}

const WorkspaceSwitcher: React.FC = () => {
  const navigate = useNavigate();

  const { workspaces, isFetching: isFetchingWorkspace } = useFetchWorkspace();

  const { workspaceId } = useParams();

  const { isFetching, workspace } = useGetWorkspaceById(workspaceId || '');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 font-semibold text-slate-800 text-xl">
          {isFetching ? (
            <Loader className="size-5 animate-spin" />
          ) : (
            workspace?.name.charAt(0).toUpperCase()
          )}
        </Button>
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
                onClick={() => navigate(`/workspaces/${workspace._id}`)}
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
