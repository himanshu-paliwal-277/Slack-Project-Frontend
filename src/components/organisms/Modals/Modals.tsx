import React, { memo } from 'react';

import CreateWorkspaceModal from '@/components/molecules/CreateWorkspaceModal/CreateWorkspaceModal';
import WorkspacePreferencesModal from '@/components/molecules/Workspace/WorkspacePreferencesModal';

const Modals: React.FC = () => {
  return (
    <>
      <CreateWorkspaceModal />
      <WorkspacePreferencesModal />
    </>
  );
};

export default memo(Modals);
