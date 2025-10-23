import {
  AlertTriangleIcon,
  HashIcon,
  Loader,
  MessageSquareTextIcon,
  SendHorizontalIcon,
} from 'lucide-react';
import React, { memo } from 'react';
import { useParams } from 'react-router-dom';

import SideBarItem from '@/components/atoms/SideBarItem/SideBarItem';
import WorkspacePanelHeader from '@/components/molecules/Workspace/WorkspacePanelHeader';
import WorkspacePanelSection from '@/components/molecules/Workspace/WorkspacePanelSection';
import { useGetWorkspaceById } from '@/hooks/apis/workspaces/useGetWorkspaceById';
import { useCreateChannelModal } from '@/hooks/context/useCreateChannelModal';

const WorkspacePanel: React.FC = () => {
  const { workspaceId } = useParams();
  const { setOpenCreateChannelModal } = useCreateChannelModal();

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

      <div className="flex flex-col px-2 mt-3">
        <SideBarItem label="Threads" icon={MessageSquareTextIcon} id="threads" variant="active" />

        <SideBarItem
          label="Drafts & Sends"
          icon={SendHorizontalIcon}
          id="drafts"
          variant="default"
        />
      </div>

      <WorkspacePanelSection
        label={'Channels'}
        onIconClick={() => {
          setOpenCreateChannelModal(true);
        }}
      >
        {workspace?.channels?.map((channel: { _id: string; name: string }) => {
          return (
            <SideBarItem
              variant="default"
              key={channel._id}
              icon={HashIcon}
              label={channel.name}
              id={channel._id}
            />
          );
        })}
      </WorkspacePanelSection>
    </div>
  );
};

export default memo(WorkspacePanel);
