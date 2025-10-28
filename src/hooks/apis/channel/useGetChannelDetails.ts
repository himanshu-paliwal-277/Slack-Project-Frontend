import { useQuery } from '@tanstack/react-query';

import { getChannelDetailsById } from '@/apis/channel';
import { useAuth } from '@/hooks/context/useAuth';

export const useGetChannelDetails = (channelId: string) => {
  const { auth } = useAuth();

  const {
    isFetching,
    isSuccess,
    error,
    data: channel,
  } = useQuery({
    queryFn: () => getChannelDetailsById(channelId, auth.token as string),
    queryKey: ['getChannelById', channelId],
    staleTime: 30000,
  });

  return {
    isFetching,
    isSuccess,
    error,
    channel,
  };
};
