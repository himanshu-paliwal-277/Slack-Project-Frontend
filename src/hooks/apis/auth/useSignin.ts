import { useMutation } from '@tanstack/react-query';

import { signInRequest } from '@/apis/auth';

export const useSignin = () => {
  const {
    isPending,
    isSuccess,
    error,
    mutate: signinMutation,
  } = useMutation({
    mutationFn: signInRequest,
    onSuccess: (data) => {
      console.log('Scuccessfuilly signed in', data);
    },
    onError: (error) => {
      console.error('Failed to sign in', error);
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    signinMutation,
  };
};
