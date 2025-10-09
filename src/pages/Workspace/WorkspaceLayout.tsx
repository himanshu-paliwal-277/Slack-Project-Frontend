import React, { memo } from 'react';

import WorkspaceSidebar from '@/components/organisms/Workspace/WorkspaceSidebar';

interface IProps {
  children: React.ReactNode;
}

const WorkspaceLayout: React.FC<IProps> = ({ children }) => {
  return (
    <div className="h-[100vh]">
      <div className="flex h-full">
        <WorkspaceSidebar />
        {children}
      </div>
    </div>
  );
};

export default memo(WorkspaceLayout);
