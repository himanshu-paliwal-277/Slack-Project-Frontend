import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { signInRequest } from '@/apis/auth';

export const useSignin = () => {
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: signinMutation,
  } = useMutation({
    mutationFn: signInRequest,
    onSuccess: (data) => {
      console.log('Scuccessfuilly signed in', data);
      toast.success('Successfully signed in');
    },
    onError: (error) => {
      console.error('Failed to sign in', error);
      toast.error('Failed to sign in');
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    signinMutation,
  };
};
