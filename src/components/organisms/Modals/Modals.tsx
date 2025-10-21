import React, { memo } from 'react';

import CreateChannelModal from '@/components/molecules/CreateChannelModal/CreateChannelModal';
import CreateWorkspaceModal from '@/components/molecules/CreateWorkspaceModal/CreateWorkspaceModal';
import WorkspacePreferencesModal from '@/components/molecules/Workspace/WorkspacePreferencesModal';

const Modals: React.FC = () => {
  return (
    <>
      <CreateWorkspaceModal />
      <WorkspacePreferencesModal />
      <CreateChannelModal />
    </>
  );
};

export default memo(Modals);
