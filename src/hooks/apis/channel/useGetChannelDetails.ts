import { useQuery } from '@tanstack/react-query';

import { getChannelById } from '@/apis/channel';
import { useAuth } from '@/hooks/context/useAuth';

export const useGetChannelById = (channelId: string) => {
  const { auth } = useAuth();

  const {
    isFetching,
    isError,
    data: channelDetails,
    error,
  } = useQuery({
    queryFn: () => getChannelById(channelId, auth.token as string),
    queryKey: ['getChannelById', channelId],
    staleTime: 30000,
  });

  return {
    isFetching,
    isError,
    channelDetails,
    error,
  };
};
