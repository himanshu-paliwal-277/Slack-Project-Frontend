import React, { memo } from 'react';

import CreateWorkspaceModal from '@/components/molecules/CreateWorkspaceModal/CreateWorkspaceModal';

const Modals: React.FC = () => {
  return (
    <>
      <CreateWorkspaceModal />
    </>
  );
};

export default memo(Modals);
