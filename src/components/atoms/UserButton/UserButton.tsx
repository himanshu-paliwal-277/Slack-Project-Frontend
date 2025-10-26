import { LogOutIcon, PencilIcon, SettingsIcon } from 'lucide-react';
import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/context/useAuth';
import { useCreateWorkspaceModal } from '@/hooks/context/useCreateWorkspaceModal';

const UserButton: React.FC = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();

  function openWorkspaceCreateModal() {
    setOpenCreateWorkspaceModal(true);
  }

  async function handleLogout() {
    logout();
    navigate('/auth/signin');
    toast.success('Successfully logged out');
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-12 hover:opacity-65 transition bg-gray-200">
          <AvatarImage src={auth?.user?.avatar} />
          {auth?.user?.userName && (
            <AvatarFallback>{auth?.user?.userName[0].toUpperCase()}</AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={openWorkspaceCreateModal}>
          <PencilIcon className="size-4 mr-2 h-10" />
          Create Workspace
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon className="size-4 mr-2 h-10" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon className="size-4 mr-2 h-10" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(UserButton);
