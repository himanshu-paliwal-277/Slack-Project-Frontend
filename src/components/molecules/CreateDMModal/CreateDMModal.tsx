import { useQueryClient } from '@tanstack/react-query';
import { LucideLoader2 } from 'lucide-react';
import React, { memo, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useGetAllDMs } from '@/hooks/apis/dm/useGetAllDMs';
import { useStartDM } from '@/hooks/apis/dm/useStartDM';
import { useAuth } from '@/hooks/context/useAuth';
import { useCreateDMModal } from '@/hooks/context/useCreateDMModal';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';

const CreateDMModal: React.FC = () => {
  const { openCreateDMModal, setOpenCreateDMModal } = useCreateDMModal();
  const [searchQuery, setSearchQuery] = useState('');
  const queryClient = useQueryClient();
  const { currentWorkspace } = useCurrentWorkspace();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { startDMMutation, isPending } = useStartDM();
  const { dms } = useGetAllDMs(currentWorkspace?._id || '');

  function handleClose() {
    setOpenCreateDMModal(false);
    setTimeout(() => {
      setSearchQuery('');
    }, 200);
  }

  // Get all existing DM member IDs
  const existingDMMembers = useMemo(() => {
    if (!dms) return [];

    return dms
      .flatMap((dm: { members: Array<{ _id: string }> }) => dm.members.map((m) => m._id))
      .filter((memberId: string) => memberId !== auth.user?._id);
  }, [dms, auth.user?._id]);

  // Filter members based on search query, exclude current user, and exclude members with existing DMs
  const filteredMembers = currentWorkspace?.members
    ?.filter((member: any) => {
      const isNotCurrentUser = member.memberId?._id !== auth.user?._id;
      const matchesSearch = member.memberId?.userName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const hasExistingDM = existingDMMembers?.includes(member.memberId?._id);
      return isNotCurrentUser && matchesSearch && member.memberId !== null && !hasExistingDM;
    })
    .sort((a: any, b: any) => {
      // Sort admins first
      if (a.role === 'admin' && b.role !== 'admin') return -1;
      if (a.role !== 'admin' && b.role === 'admin') return 1;
      return 0;
    });

  async function handleMemberClick(recipientId: string) {
    try {
      const data = await startDMMutation({
        recipientId,
        workspaceId: currentWorkspace?._id as string,
      });

      if (data?._id) {
        toast.success('DM started successfully');

        // Invalidate DM queries to refresh the DM list
        queryClient.invalidateQueries({
          queryKey: [`getAllDMs-${currentWorkspace?._id}`],
        });

        // Navigate to the DM
        navigate(`/workspaces/${currentWorkspace?._id}/dm/${data._id}`);

        handleClose();
      }
    } catch (error) {
      console.error('Error starting DM:', error);
      toast.error('Failed to start DM');
    }
  }

  return (
    <Dialog open={openCreateDMModal} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Start a Direct Message</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search members by name..."
            className="w-full"
            autoFocus
          />

          <div className="max-h-[400px] overflow-y-auto space-y-1">
            {isPending ? (
              <div className="flex justify-center items-center py-8">
                <LucideLoader2 className="animate-spin size-6" />
              </div>
            ) : filteredMembers && filteredMembers.length > 0 ? (
              filteredMembers.map((member: any) => (
                <div
                  key={member.memberId._id}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  onClick={() => handleMemberClick(member.memberId._id)}
                >
                  {/* <UserItem
                    label={`${member.memberId.userName}${member.role === 'admin' ? ' (Admin)' : ''}`}
                    id={member.memberId._id}
                    image={member.memberId.avatar}
                    variant="default"
                    handleClick={() => {}}
                  /> */}
                  <Button variant="transparent" size="sm" asChild>
                    <div>
                      <Avatar className="sm:size-6 size-7 shrink-0 overflow-hidden rounded-sm bg-gray-300">
                        <AvatarImage src={member.memberId.avatar} className="rounded-md " />
                        <AvatarFallback className="rounded-md bg-sky-500 text-white">
                          {`${member.memberId.userName}${member.role === 'admin' ? ' (Admin)' : ''}`
                            .charAt(0)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="sm:text-[15px] text-[16px] font-[400] truncate text-black">{`${member.memberId.userName}${member.role === 'admin' ? ' (Admin)' : ''}`}</span>
                    </div>
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-8">
                {searchQuery ? 'No members found' : 'No members available'}
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default memo(CreateDMModal);
