import { Check, CopyIcon, RefreshCcwIcon, Share2Icon } from 'lucide-react';
import React, { memo, useState } from 'react';
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
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const joinLink = `${window.location.origin}/workspaces/join/${workspaceId}`;

  async function handleCopyCode() {
    await navigator.clipboard.writeText(joinCode);
    toast('Join code copied to clipboard');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1200);
  }

  async function handleCopyLink() {
    await navigator.clipboard.writeText(joinLink);
    toast('Join link copied to clipboard');
    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), 1200);
  }

  async function handleShareLink() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join ${workspaceName} Workspace`,
          text: `Join my workspace "${workspaceName}" using this link:`,
          url: joinLink,
        });
        toast('Link shared successfully');
      } catch (err) {
        console.log('Error sharing link:', err);
      }
    } else {
      await handleCopyLink();
      toast('Sharing not supported — link copied instead');
    }
  }

  async function handleResetCode() {
    try {
      await resetJoinCodeMutation();
      toast('Join code reset successfully');
    } catch (error) {
      console.log('Error resetting join code', error);
    }
  }

  return (
    <Dialog open={openInviteModal} onOpenChange={setOpenInviteModal}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Invite people to {workspaceName}</DialogTitle>
          <DialogDescription>
            Share this invite link or code to let others join your workspace instantly.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-6 gap-y-4">
          <p className="font-bold text-3xl uppercase tracking-wider">{joinCode}</p>

          <Button size="sm" variant="ghost" onClick={handleCopyCode}>
            <span className="w-20">{isCopied ? 'Copied' : 'Copy Code'}</span>
            {isCopied ? (
              <Check className="size-4 ml-2 text-green-500" />
            ) : (
              <CopyIcon className="size-4 ml-2" />
            )}
          </Button>

          <div className="w-full flex flex-col items-center gap-3 border-t border-border pt-4">
            <p className="text-sm text-muted-foreground">Shareable Link</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleCopyLink}>
                {isLinkCopied ? (
                  <>
                    Copied <Check className="size-4 ml-2 text-green-500" />
                  </>
                ) : (
                  <>
                    Copy Link <CopyIcon className="size-4 ml-2" />
                  </>
                )}
              </Button>

              <Button variant="default" onClick={handleShareLink}>
                Share <Share2Icon className="size-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center w-full pt-2">
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
