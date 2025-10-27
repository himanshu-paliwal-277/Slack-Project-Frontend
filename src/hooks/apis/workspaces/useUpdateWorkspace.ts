import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateWorkspaceRequest } from '@/apis/workspaces';
import { useAuth } from '@/hooks/context/useAuth';

interface UpdateWorkspaceData {
  name: string;
  description: string;
}

export const useUpdateWorkspace = (workspaceId: string) => {
  const { auth } = useAuth();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: updateWorkspaceMutation,
  } = useMutation({
    mutationFn: (data: UpdateWorkspaceData) =>
      updateWorkspaceRequest({
        workspaceId,
        name: data.name,
        description: data.description,
        token: auth?.token || '',
      }),
    onSuccess: () => {
      console.log('Workspace updated successfully');
      toast('Workspace updated successfully');
    },
    onError: (error) => {
      console.log('Error in updating workspace', error);
      toast(error.message || 'Error in updating workspace');
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    updateWorkspaceMutation,
  };
};
