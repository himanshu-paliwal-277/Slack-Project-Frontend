import { useMutation } from '@tanstack/react-query';

import { addMemberToWorkspaceRequest } from '@/apis/workspaces';
import { useAuth } from '@/hooks/context/useAuth';

export const useAddMemberToWorkspace = (workspaceId: string) => {
  const { auth } = useAuth();
  const {
    mutateAsync: addMemberToWorkspaceMutation,
    error,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: () => addMemberToWorkspaceRequest({ workspaceId, token: auth?.token as string }),
    onSuccess: () => {
      console.log('Member added to workspace successfully');
    },
    onError: (error) => {
      console.log('Error in adding member to workspace', error);
    },
  });

  return {
    addMemberToWorkspaceMutation,
    error,
    isSuccess,
    isPending,
  };
};
