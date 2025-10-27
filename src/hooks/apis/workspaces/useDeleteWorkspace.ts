import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteWorkspaceRequest } from '@/apis/workspaces';
import { useAuth } from '@/hooks/context/useAuth';

export const useDeleteWorkspace = (workspaceId: string) => {
  const { auth } = useAuth();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: deleteWorkspaceMutation,
  } = useMutation({
    mutationFn: () => deleteWorkspaceRequest(workspaceId, auth?.token || ''),
    onSuccess: () => {
      console.log('Workspace deleted successfully');
      toast('Workspace deleted successfully');
    },
    onError: (error) => {
      console.log('Error in deleting workspace', error);
      toast(error.message || 'Error in deleting workspace');
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    deleteWorkspaceMutation,
  };
};
