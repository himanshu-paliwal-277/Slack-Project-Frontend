import { Check, CopyIcon, RefreshCcwIcon } from 'lucide-react';
import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useResetJoinCode } from '@/hooks/apis/workspaces/useResetJoinCode';

interface WorkspaceInviteModalProps {
  openInviteModal: boolean;
  setOpenInviteModal: (open: boolean) => void;
  workspaceName: string;
  joinCode: string;
  workspaceId: string;
}

const WorkspaceInviteModal: React.FC<WorkspaceInviteModalProps> = ({
  openInviteModal,
  setOpenInviteModal,
  workspaceName,
  joinCode,
  workspaceId,
}) => {
  const { resetJoinCodeMutation } = useResetJoinCode(workspaceId);
  const [isCopied, setIsCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(joinCode);
    toast('Link copied to clipboard');
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1200);
  }

  async function handleResetCode() {
    try {
      await resetJoinCodeMutation();
      toast('Join code reset successfully');
    } catch (error) {
      console.log('Error in resetting join code', error);
    }
  }

  return (
    <Dialog open={openInviteModal} onOpenChange={setOpenInviteModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite people to {workspaceName}</DialogTitle>
          <DialogDescription>
            Use the code shown below to invite people to your workspace.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-10 gap-y-4">
          <p className="font-bold text-4xl uppercase">{joinCode}</p>
          <Button size="sm" variant="ghost" onClick={handleCopy}>
            <span className="w-20">{isCopied ? 'Copied' : 'Copy Code'}</span>
            {isCopied ? (
              <Check className="size-4 ml-2 text-green-500" />
            ) : (
              <CopyIcon className="size-4 ml-2" />
            )}
          </Button>

          <Link
            to={`/workspaces/join/${workspaceId}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500"
          >
            Redirect to join page
          </Link>
        </div>
        <div className="flex items-center justify-center w-full">
          <Button variant="outline" onClick={handleResetCode}>
            Reset Join Code
            <RefreshCcwIcon className="size-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default memo(WorkspaceInviteModal);
