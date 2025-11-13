import { useQueryClient } from '@tanstack/react-query';
import { LucideLoader2, TrashIcon } from 'lucide-react';
import React, { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useDeleteWorkspace } from '@/hooks/apis/workspaces/useDeleteWorkspace';
import { useUpdateWorkspace } from '@/hooks/apis/workspaces/useUpdateWorkspace';
import { useConfirm } from '@/hooks/context/useConfirm';
import { useWorkspacePreferencesModal } from '@/hooks/context/useWorkspacePreferencesModals';

const WorkspacePreferencesModal: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [workspaceId, setWorkspaceId] = useState<string>('');
  const [editOpen, setEditOpen] = useState(false);

  const { initialValue, openPreferences, setOpenPreferences, workspace } =
    useWorkspacePreferencesModal();
  const { deleteWorkspaceMutation } = useDeleteWorkspace(workspaceId);
  const { isPending, updateWorkspaceMutation } = useUpdateWorkspace(workspaceId);

  const { confirmation, ConfirmDialog } = useConfirm({
    title: 'Do you want to delete the workspace?',
    message: 'This action cannot be undone.',
  });

  const { confirmation: updateConfirmation, ConfirmDialog: UpdateDialog } = useConfirm({
    title: 'Do you want to update the workspace?',
    message: 'This action cannot be undone.',
  });

  const [renameValue, setRenameValue] = useState(workspace?.name || '');

  function handleClose() {
    setOpenPreferences(false);
  }

  useEffect(() => {
    setWorkspaceId(workspace?._id || '');
    setRenameValue(workspace?.name || '');
  }, [workspace]);

  async function handleDelete() {
    try {
      const ok = await confirmation();
      console.log('Confimation received');
      if (!ok) {
        return;
      }

      await deleteWorkspaceMutation();

      // Invalidate and refetch workspaces to get updated list
      await queryClient.invalidateQueries({ queryKey: ['fetchWorkspaces'] });
      const updatedWorkspaces = await queryClient.fetchQuery({
        queryKey: ['fetchWorkspaces'],
      });

      setOpenPreferences(false);

      // Navigate to the next available workspace or home
      if (updatedWorkspaces && Array.isArray(updatedWorkspaces) && updatedWorkspaces.length > 0) {
        navigate(
          `/workspaces/${updatedWorkspaces[0]._id}/channels/${updatedWorkspaces[0].channels[0]}`
        );
      } else {
        navigate('/home');
      }
    } catch (error) {
      console.log('Error in deleting workspace', error);
    }
  }

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const ok = await updateConfirmation();
      console.log('Confimation received');
      if (!ok) {
        return;
      }

      await updateWorkspaceMutation({
        name: renameValue,
        description: '',
      });
      queryClient.invalidateQueries({ queryKey: [`fetchWorkspaceById-${workspace?._id}`] });
      setOpenPreferences(false);
    } catch (error) {
      console.log('Error in updating workspace', error);
    } finally {
      setEditOpen(false);
    }
  }

  return (
    <>
      <Dialog open={openPreferences} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            {/* <DialogTitle>{initialValue}</DialogTitle> */}
            <DialogTitle>Preferences</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-y-2">
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger>
                <div className="flex justify-between items-center px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-col gap-2">
                    <p className="font-semibold text-sm">Workspace Name</p>
                    <p className="text-sm text-start">{initialValue}</p>
                  </div>

                  <p className="text-sm font-semibold hover:underline">Edit</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename Workspace</DialogTitle>
                </DialogHeader>

                <form className="space-y-4" onSubmit={handleFormSubmit}>
                  <Input
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={50}
                    disabled={isPending}
                    placeholder="Workspace Name e.g. Design Team"
                  />

                  <DialogFooter>
                    <DialogClose>
                      <Button variant="outline" disabled={isPending}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button className="w-24" type="submit" disabled={isPending}>
                      {isPending ? (
                        <LucideLoader2 color="white" className="animate-spin ml-2" />
                      ) : (
                        'Save'
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Button
              // className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50"
              className="bg-red-500 hover:bg-red-400 active:bg-red-600"
              onClick={handleDelete}
            >
              <TrashIcon className="size-5" />
              <p className="text-sm font-semibold">Delete Workspace</p>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog />
      <UpdateDialog />
    </>
  );
};

export default memo(WorkspacePreferencesModal);
