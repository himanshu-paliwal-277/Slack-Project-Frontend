import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { joinWorkspaceRequest } from '@/apis/workspaces';
import { useAuth } from '@/hooks/context/useAuth';

export const useJoinWorkspaceRequest = (workspaceId: string) => {
  const { auth } = useAuth();
  const {
    mutateAsync: joinWorkspaceMutation,
    isSuccess,
    isPending,
    error,
  } = useMutation({
    mutationFn: (joinCode: string) =>
      joinWorkspaceRequest({ workspaceId, joinCode, token: auth?.token as string }),
    onSuccess: () => {
      console.log('Workspace joined successfully');
      toast('You have been added to workspace successfully');
    },
    onError: (error) => {
      console.log('Error in joining workspace', error);
      toast(error.message || 'Failed to join workspace');
    },
  });

  return {
    joinWorkspaceMutation,
    isSuccess,
    isPending,
    error,
  };
};
