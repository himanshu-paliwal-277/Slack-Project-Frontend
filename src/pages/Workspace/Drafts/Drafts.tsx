import React, { memo } from 'react';

import WorkspaceHeader from '@/components/atoms/WorkspaceHeader/WorkspaceHeader';

const Drafts: React.FC = () => {
  return (
    <>
      <WorkspaceHeader title={'Drafts'} />
      <div className="p-4">Drafts Page</div>
    </>
  );
};

export default memo(Drafts);
