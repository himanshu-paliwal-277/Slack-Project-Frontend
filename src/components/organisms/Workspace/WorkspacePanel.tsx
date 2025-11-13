import {
  AlertTriangleIcon,
  HashIcon,
  Loader,
  MessageSquareTextIcon,
  SendHorizontalIcon,
} from 'lucide-react';
import React, { memo, useState } from 'react';
import { useParams } from 'react-router-dom';

import UserItem from '@/components/atoms/UserItem/UserItem';
import WorkspacePanelHeader from '@/components/molecules/Workspace/WorkspacePanelHeader';
import WorkspacePanelSection from '@/components/molecules/Workspace/WorkspacePanelSection';
import SideBarItem from '@/components/SideBarItem/SideBarItem';
import { useGetWorkspaceById } from '@/hooks/apis/workspaces/useGetWorkspaceById';
import { useCreateChannelModal } from '@/hooks/context/useCreateChannelModal';
import { useOpenDrawer } from '@/hooks/context/useOpenDrawer';

const WorkspacePanel: React.FC = () => {
  const { workspaceId } = useParams();
  const { setOpenCreateChannelModal } = useCreateChannelModal();
  const [activeSection, setActiveSection] = useState<string>('');
  const { setOpenOpenDrawer } = useOpenDrawer();

  const isMobile = window.innerWidth < 640;

  const { workspace, isFetching, isError } = useGetWorkspaceById(workspaceId as string);

  // ✅ Unified loader & error UI
  if (isFetching) {
    return (
      <div className="flex h-full items-center justify-center bg-ocean-primary text-white">
        <Loader className="animate-spin size-6" />
      </div>
    );
  }

  if (isError || !workspace) {
    return (
      <div className="flex flex-col gap-y-2 h-full bg-ocean-primary items-center justify-center text-white">
        <AlertTriangleIcon className="size-6" />
        <span>Something went wrong</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full sm:flex-0 flex-1 bg-ocean-primary text-white">
      <WorkspacePanelHeader workspace={workspace} />

      <div className="overflow-y-auto sm:bg-ocean-primary bg-gray-800 sm:h-full h-[calc(100%-178px)] pb-2 relative z-1">
        {/* ==== Top Section (Threads & Drafts) ==== */}
        <div className="flex flex-col px-2 sm:mt-3 mt-4 space-y-1">
          <SideBarItem
            label="Threads"
            icon={MessageSquareTextIcon}
            id="threads"
            variant={activeSection === 'threads' ? 'active' : 'default'}
            handleClick={() => {
              setActiveSection('threads');
              if (isMobile) setOpenOpenDrawer(false);
            }}
            redirectTo={`/workspaces/${workspaceId}/threads`}
          />
          <SideBarItem
            label="Drafts & Sends"
            icon={SendHorizontalIcon}
            id="drafts"
            variant={activeSection === 'drafts' ? 'active' : 'default'}
            handleClick={() => {
              setActiveSection('drafts');
              if (isMobile) setOpenOpenDrawer(false);
            }}
            redirectTo={`/workspaces/${workspaceId}/drafts`}
          />
        </div>

        {/* ==== Channels Section ==== */}
        <WorkspacePanelSection label="Channels" onIconClick={() => setOpenCreateChannelModal(true)}>
          {workspace.channels?.length > 0 ? (
            workspace.channels.map((channel: { _id: string; name: string }) => (
              <SideBarItem
                key={channel._id}
                icon={HashIcon}
                label={channel.name}
                id={channel._id}
                variant={activeSection === channel._id ? 'active' : 'default'}
                handleClick={() => {
                  setActiveSection(channel._id);
                  if (isMobile) setOpenOpenDrawer(false);
                }}
              />
            ))
          ) : (
            <p className="text-xs text-gray-300 italic px-2">No channels yet</p>
          )}
        </WorkspacePanelSection>

        {/* ==== Direct Messages Section ==== */}
        <WorkspacePanelSection label="Direct messages">
          {workspace.members?.length > 0 ? (
            workspace.members
              .filter(
                (item: {
                  memberId: { _id: string; userName: string; avatar: string } | null;
                  role: string;
                }) => item.memberId !== null
              )
              .map(
                (item: {
                  memberId: { _id: string; userName: string; avatar: string };
                  role: string;
                }) => (
                  <UserItem
                    key={item.memberId._id}
                    label={`${item.memberId.userName}${item.role === 'admin' ? ' (Admin)' : ''}`}
                    id={item.memberId._id}
                    image={item.memberId.avatar}
                    variant={activeSection === item.memberId._id ? 'active' : 'default'}
                    handleClick={() => {
                      setActiveSection(item.memberId._id);
                      if (isMobile) setOpenOpenDrawer(false);
                    }}
                  />
                )
              )
          ) : (
            <p className="text-xs text-gray-300 italic px-2">No members found</p>
          )}
        </WorkspacePanelSection>
      </div>
    </div>
  );
};

export default memo(WorkspacePanel);
