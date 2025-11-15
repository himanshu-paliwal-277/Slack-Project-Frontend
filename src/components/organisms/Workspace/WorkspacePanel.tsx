import {
  AlertTriangleIcon,
  HashIcon,
  Loader,
  MessageSquareTextIcon,
  SendHorizontalIcon,
} from 'lucide-react';
import React, { memo, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import UserItem from '@/components/atoms/UserItem/UserItem';
import WorkspacePanelHeader from '@/components/molecules/Workspace/WorkspacePanelHeader';
import WorkspacePanelSection from '@/components/molecules/Workspace/WorkspacePanelSection';
import SideBarItem from '@/components/SideBarItem/SideBarItem';
import { useGetAllDMs } from '@/hooks/apis/dm/useGetAllDMs';
import { useGetWorkspaceById } from '@/hooks/apis/workspaces/useGetWorkspaceById';
import { useAuth } from '@/hooks/context/useAuth';
import { useCreateChannelModal } from '@/hooks/context/useCreateChannelModal';
import { useCreateDMModal } from '@/hooks/context/useCreateDMModal';
import { useOpenDrawer } from '@/hooks/context/useOpenDrawer';
import type { Channel, DM } from '@/types/workspace';

const WorkspacePanel: React.FC = () => {
  const { workspaceId, channelId, dmId } = useParams<{
    workspaceId: string;
    channelId?: string;
    dmId?: string;
  }>();

  const location = useLocation();
  const navigate = useNavigate();

  const { setOpenCreateChannelModal } = useCreateChannelModal();
  const { setOpenCreateDMModal } = useCreateDMModal();
  const { setOpenOpenDrawer } = useOpenDrawer();
  const { auth } = useAuth();

  const isMobile = window.innerWidth < 640;

  // === API Calls ===
  const { workspace, isFetching, isError } = useGetWorkspaceById(workspaceId as string);
  const { dms, isFetching: isFetchingDMs } = useGetAllDMs(workspaceId as string);

  // === Determine Active Section ===
  const activeSection = useMemo(() => {
    const path = location.pathname;

    if (path.includes('/threads')) return 'threads';
    if (path.includes('/drafts')) return 'drafts';
    if (channelId) return channelId;
    if (dmId) return dmId;

    return '';
  }, [location.pathname, channelId, dmId]);

  // === Regular Channels (not DMs) ===
  const regularChannels = useMemo(() => {
    if (!workspace?.channels) return [];
    return (workspace.channels as Channel[]).filter(
      (channel) => !channel.type || channel.type !== 'dm'
    );
  }, [workspace?.channels]);

  // === Close drawer on mobile ===
  const handleMobileClose = () => {
    if (isMobile) setOpenOpenDrawer(false);
  };

  // === Loader and Error Handling ===
  if (isFetching) {
    return (
      <div className="flex h-full items-center justify-center bg-ocean-primary text-white"></div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-y-2 h-full bg-ocean-primary items-center justify-center text-white">
        <AlertTriangleIcon className="size-6" />
        <span>Something went wrong</span>
      </div>
    );
  }

  // === Render ===
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
            handleClick={handleMobileClose}
            redirectTo={`/workspaces/${workspaceId}/threads`}
          />
          <SideBarItem
            label="Drafts & Sends"
            icon={SendHorizontalIcon}
            id="drafts"
            variant={activeSection === 'drafts' ? 'active' : 'default'}
            handleClick={handleMobileClose}
            redirectTo={`/workspaces/${workspaceId}/drafts`}
          />
        </div>

        {/* ==== Channels Section ==== */}
        <WorkspacePanelSection label="Channels" onIconClick={() => setOpenCreateChannelModal(true)}>
          {isFetching ? (
            <div className="flex justify-center items-center py-4">
              <Loader className="animate-spin size-4 text-gray-300" />
            </div>
          ) : regularChannels.length > 0 ? (
            regularChannels.map((channel: Channel) => (
              <SideBarItem
                key={channel._id}
                icon={HashIcon}
                label={channel.name}
                id={channel._id}
                variant={activeSection === channel._id ? 'active' : 'default'}
                handleClick={handleMobileClose}
                redirectTo={`/workspaces/${workspaceId}/channels/${channel._id}`}
              />
            ))
          ) : (
            <p className="text-xs text-gray-300 italic px-2">No channels yet</p>
          )}
        </WorkspacePanelSection>

        {/* ==== Direct Messages Section ==== */}
        <WorkspacePanelSection
          label="Direct messages"
          onIconClick={() => setOpenCreateDMModal(true)}
        >
          {isFetchingDMs ? (
            <div className="flex justify-center items-center py-4">
              <Loader className="animate-spin size-4 text-gray-300" />
            </div>
          ) : dms && dms.length > 0 ? (
            (dms as DM[]).map((dm: DM) => {
              const currentUserId = auth.user?._id;
              const otherMember = dm.members?.find((member) => member._id !== currentUserId);

              return (
                <UserItem
                  key={dm._id}
                  label={otherMember?.userName || 'Unknown User'}
                  id={dm._id}
                  image={otherMember?.avatar || 'https://robohash.org/Unknown'}
                  variant={activeSection === dm._id ? 'active' : 'default'}
                  handleClick={() => {
                    navigate(`/workspaces/${workspaceId}/dm/${dm._id}`);
                    handleMobileClose();
                  }}
                />
              );
            })
          ) : (
            <p className="text-xs text-gray-300 italic px-2">No direct messages yet</p>
          )}
        </WorkspacePanelSection>
      </div>
    </div>
  );
};

export default memo(WorkspacePanel);
