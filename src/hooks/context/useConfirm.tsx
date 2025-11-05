import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface UseConfirmProps {
  title: string;
  message: string;
}

interface PromiseState {
  resolve: (value: boolean) => void;
}

interface UseConfirmReturn {
  ConfirmDialog: () => React.JSX.Element;
  confirmation: () => Promise<boolean>;
}

export const useConfirm = ({ title, message }: UseConfirmProps): UseConfirmReturn => {
  const [promise, setPromise] = useState<PromiseState | null>(null);

  async function confirmation(): Promise<boolean> {
    console.log('Confirmation triggered');
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  }

  const handleClose = (): void => {
    setPromise(null);
  };

  const handleConfirm = (): void => {
    promise?.resolve(true);
    handleClose();
  };

  const ConfirmDialog = (): React.JSX.Element => {
    return (
      <Dialog open={promise !== null} onOpenChange={handleClose}>
        <DialogContent className="w-[420px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{message}</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button onClick={handleClose} variant="secondary">
              Cancel
            </Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return { ConfirmDialog, confirmation };
};
