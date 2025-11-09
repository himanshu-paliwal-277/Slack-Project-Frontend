import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';

import WorkspaceNavbar from '@/components/organisms/Workspace/WorkspaceNavbar';
import WorkspacePanel from '@/components/organisms/Workspace/WorkspacePanel';
import WorkspaceSidebar from '@/components/organisms/Workspace/WorkspaceSidebar';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { useOpenDrawer } from '@/hooks/context/useOpenDrawer';

const WorkspaceLayout: React.FC = () => {
  const { openDrawer: isOpen, setOpenOpenDrawer: setIsOpen } = useOpenDrawer();
  return (
    <>
      <div className="h-[100vh] bg-[#3b0d3c]">
        <div className="sm:block hidden">
          <WorkspaceNavbar />
        </div>
        <div className="flex sm:h-[calc(100vh-50px)] h-full">
          <div className="sm:block hidden">
            <WorkspaceSidebar />
          </div>
          <div className="sm:pb-4 sm:pr-4 flex-1 flex">
            <ResizablePanelGroup
              className="sm:rounded-lg flex-1"
              direction="horizontal"
              autoSaveId={'workspace-resize'}
            >
              <ResizablePanel className="sm:block hidden" defaultSize={20} minSize={11}>
                <WorkspacePanel />
              </ResizablePanel>
              <ResizableHandle withHandle className="sm:flex hidden" />
              <ResizablePanel className="bg-white" minSize={20}>
                <Outlet />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
      <Drawer open={isOpen} onClose={() => setIsOpen(false)} direction="left">
        <DrawerContent className="!w-screen max-w-none bg-[#5c3b58]">
          <WorkspaceNavbar />
          <div className="flex items-center h-[calc(100vh-50px)]">
            <WorkspaceSidebar />
            <WorkspacePanel />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default memo(WorkspaceLayout);
