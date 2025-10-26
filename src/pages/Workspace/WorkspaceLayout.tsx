import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';

import WorkspaceNavbar from '@/components/organisms/Workspace/WorkspaceNavbar';
import WorkspacePanel from '@/components/organisms/Workspace/WorkspacePanel';
import WorkspaceSidebar from '@/components/organisms/Workspace/WorkspaceSidebar';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

const WorkspaceLayout: React.FC = () => {
  return (
    <div className="h-[100vh] bg-[#3b0d3c]">
      <WorkspaceNavbar />
      <div className="flex h-[calc(100vh-50px)]">
        <WorkspaceSidebar />
        <div className="pb-4 pr-4 flex-1 flex">
          <ResizablePanelGroup
            className="rounded-lg flex-1"
            direction="horizontal"
            autoSaveId={'workspace-resize'}
          >
            <ResizablePanel defaultSize={20} minSize={11} className="">
              <WorkspacePanel />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel className="bg-white" minSize={20}>
              <Outlet />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
};

export default memo(WorkspaceLayout);
