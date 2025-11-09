import { InfoIcon, LucideLoader2, SearchIcon } from 'lucide-react';
import React, { memo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { useGetWorkspaceById } from '@/hooks/apis/workspaces/useGetWorkspaceById';
import { useAuth } from '@/hooks/context/useAuth';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';

const WorkspaceNavbar: React.FC = () => {
  const { workspaceId } = useParams();

  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isFetching, workspace, error, isSuccess } = useGetWorkspaceById(workspaceId || '');

  const { setCurrentWorkspace } = useCurrentWorkspace();

  useEffect(() => {
    if (!isFetching && !isSuccess && error) {
      console.log('Error fetching workspace', 'status' in error ? error.status : 'unknown');
      if ('status' in error && error.status === 403) {
        logout();
        navigate('/auth/signin');
      }
    }

    if (workspace) {
      setCurrentWorkspace(workspace);
    }
  }, [workspace, setCurrentWorkspace, isSuccess, error, isFetching, logout, navigate]);

  return (
    <nav className="flex items-center h-[50px] justify-center px-3">
      <div className="flex-1" />
      <div>
        {isFetching ? (
          <LucideLoader2 color="white" className="animate-spin ml-2" />
        ) : (
          <Button
            size="sm"
            className="bg-accent/25 hover:bg-accent/15 w-full justify-start h-7 px-2"
          >
            <SearchIcon className="size-5 text-white mr-2" />
            <span className="text-white text-xs">Search in {workspace?.name || 'Workspace'}</span>
          </Button>
        )}
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
