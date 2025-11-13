import { useMutation } from '@tanstack/react-query';

import { sendDMMessageRequest } from '@/apis/dm';
import { useAuth } from '@/hooks/context/useAuth';

export const useSendDMMessage = () => {
  const { auth } = useAuth();

  const { mutateAsync, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: ({
      roomId,
      body,
      image,
    }: {
      roomId: string;
      body: string;
      image?: string;
    }) =>
      sendDMMessageRequest({
        roomId,
        body,
        image,
        token: auth?.token as string,
      }),
    onSuccess: (data) => {
      console.log('Message sent successfully:', data);
    },
    onError: (error) => {
      console.error('Error sending message:', error);
    },
  });

  return {
    sendMessageMutation: mutateAsync,
    isPending,
    isSuccess,
    isError,
    error,
  };
};
