import React, { memo } from 'react';

import WorkspaceHeader from '@/components/atoms/WorkspaceHeader/WorkspaceHeader';

const Threads: React.FC = () => {
  return (
    <>
      <WorkspaceHeader title={'Threads'} />
      <div className="p-4">Threads Page</div>
    </>
  );
};

export default memo(Threads);
