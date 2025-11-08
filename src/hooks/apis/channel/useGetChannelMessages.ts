import { useQuery } from '@tanstack/react-query';

import { getPaginatedMessages } from '@/apis/channel';
import { useAuth } from '@/hooks/context/useAuth';

export const useGetChannelMessages = (channelId: string) => {
  const { auth } = useAuth();

  const { isFetched, isError, error, data, isSuccess } = useQuery({
    queryFn: () =>
      getPaginatedMessages({ channelId, limit: 100, offset: 0, token: auth?.token as string }),
    queryKey: ['getPaginatedMessages'],
  });

  return {
    isFetched,
    isError,
    error,
    messages: data,
    isSuccess,
  };
};
