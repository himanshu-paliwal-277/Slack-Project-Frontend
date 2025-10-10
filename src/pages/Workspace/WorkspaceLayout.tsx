import React, { memo } from 'react';

import WorkspaceNavbar from '@/components/organisms/Workspace/WorkspaceNavbar';
import WorkspaceSidebar from '@/components/organisms/Workspace/WorkspaceSidebar';

interface IProps {
  children: React.ReactNode;
}

const WorkspaceLayout: React.FC<IProps> = ({ children }) => {
  return (
    <div className="h-[100vh]">
      <WorkspaceNavbar />
      <div className="flex h-[calc(100vh-40px)]">
        <WorkspaceSidebar />
        {children}
      </div>
    </div>
  );
};

export default memo(WorkspaceLayout);
