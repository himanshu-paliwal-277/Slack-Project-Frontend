import React, { memo } from 'react';

import WorkspaceNavbar from '@/components/organisms/Workspace/WorkspaceNavbar';
import WorkspacePanel from '@/components/organisms/Workspace/WorkspacePanel';
import WorkspaceSidebar from '@/components/organisms/Workspace/WorkspaceSidebar';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

interface IProps {
  children: React.ReactNode;
}

const WorkspaceLayout: React.FC<IProps> = ({ children }) => {
  return (
    <div className="h-[100vh]">
      <WorkspaceNavbar />
      <div className="flex h-[calc(100vh-40px)]">
        <WorkspaceSidebar />
        <ResizablePanelGroup direction="horizontal" autoSaveId={'workspace-resize'}>
          <ResizablePanel defaultSize={20} minSize={11} className="bg-slack-medium">
            <WorkspacePanel />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={20}>{children}</ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default memo(WorkspaceLayout);
