import { AlertTriangleIcon, Loader } from 'lucide-react';
import React, { memo } from 'react';
import { useParams } from 'react-router-dom';

import WorkspacePanelHeader from '@/components/molecules/Workspace/WorkspacePanelHeader';
import { useGetWorkspaceById } from '@/hooks/apis/workspaces/useGetWorkspaceById';

const WorkspacePanel: React.FC = () => {
  const { workspaceId } = useParams();

  const { workspace, isFetching, isSuccess } = useGetWorkspaceById(workspaceId as string);

  if (isFetching) {
    return (
      <div className="flex h-full items-center justify-center bg-[#552957] text-white">
        <Loader className="animate-spin size-6 text-white" />
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <div className="flex flex-col gap-y-2 h-full bg-[#552957] items-center justify-center text-white">
        <AlertTriangleIcon className="size-6 text-white" />
        Something went wrong
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#552957]">
      <WorkspacePanelHeader workspace={workspace} />
    </div>
  );
};

export default memo(WorkspacePanel);
