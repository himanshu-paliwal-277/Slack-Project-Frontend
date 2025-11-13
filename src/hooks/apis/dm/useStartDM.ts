import { useMutation } from '@tanstack/react-query';

import { startDMRequest } from '@/apis/dm';
import { useAuth } from '@/hooks/context/useAuth';

export const useStartDM = () => {
  const { auth } = useAuth();

  const { mutateAsync, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: ({ recipientId, workspaceId }: { recipientId: string; workspaceId: string }) =>
      startDMRequest({
        recipientId,
        workspaceId,
        token: auth?.token as string,
      }),
    onSuccess: (data) => {
      console.log('DM started successfully:', data);
    },
    onError: (error) => {
      console.error('Error starting DM:', error);
    },
  });

  return {
    startDMMutation: mutateAsync,
    isPending,
    isSuccess,
    isError,
    error,
  };
};
