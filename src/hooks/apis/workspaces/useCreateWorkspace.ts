import { useMutation } from '@tanstack/react-query';

import { createWorkspaceRequest } from '@/apis/workspaces';
import { useAuth } from '@/hooks/context/useAuth';

interface CreateWorkspaceInput {
  name: string;
  description: string;
}

export const useCreateWorkspace = () => {
  const { auth } = useAuth();

  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: createWorkspaceMutation,
  } = useMutation({
    mutationFn: (data: CreateWorkspaceInput) =>
      createWorkspaceRequest({ ...data, token: auth?.token as string }),
    onSuccess: (data) => {
      console.log('Successfully created workspace', data);
    },
    onError: (error) => {
      console.error('Failed to create workspace', error);
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    createWorkspaceMutation,
  };
};
