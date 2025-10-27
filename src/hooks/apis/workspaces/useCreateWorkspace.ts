import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createWorkspaceRequest } from '@/apis/workspaces';
import { useAuth } from '@/hooks/context/useAuth';

export interface CreateWorkspaceInput {
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
      toast('Successfully created workspace');
    },
    onError: (error) => {
      console.error('Failed to create workspace', error);
      toast(error.message || 'Failed to create workspace');
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    createWorkspaceMutation,
  };
};
