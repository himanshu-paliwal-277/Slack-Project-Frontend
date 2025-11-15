import { useQueryClient } from '@tanstack/react-query';
import { LucideLoader2 } from 'lucide-react';
import React, { memo, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAddChannelToWorkspace } from '@/hooks/apis/workspaces/useAddChannelToWorkspace';
import { useCreateChannelModal } from '@/hooks/context/useCreateChannelModal';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';

const CreateChannelModal: React.FC = () => {
  const { openCreateChannelModal, setOpenCreateChannelModal } = useCreateChannelModal();

  const [channelName, setChannelName] = useState('');

  const queryClient = useQueryClient();

  const { addChannelToWorkspaceMutation, isPending } = useAddChannelToWorkspace();

  const { currentWorkspace } = useCurrentWorkspace();

  const isMobile = window.innerWidth < 640;

  function handleClose() {
    setOpenCreateChannelModal(false);
    setTimeout(() => {
      setChannelName('');
    }, 2000);
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await addChannelToWorkspaceMutation({
        workspaceId: currentWorkspace?._id as string,
        channelName: channelName,
      });

      toast('Channel created successfully');

      queryClient.invalidateQueries({ queryKey: [`fetchWorkspaceById-${currentWorkspace?._id}`] });

      handleClose();
    } catch (error) {
      console.log('Error = ', error);
    }
  }

  return (
    <Dialog open={openCreateChannelModal} onOpenChange={handleClose}>
      <DialogContent
        className={isMobile ? 'top-20 translate-y-0 sm:top-[50%] sm:translate-y-[-50%]' : ''}
      >
        <DialogHeader>
          <DialogTitle>Create a channel</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleFormSubmit}>
          <Input
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            minLength={3}
            placeholder="Channel Name e.g. team-announcements"
            required
          />

          <div className="flex justify-end mt-4">
            <Button className="w-36" disabled={isPending}>
              {isPending ? (
                <LucideLoader2 color="white" className="animate-spin" />
              ) : (
                'Create Channel'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default memo(CreateChannelModal);
