import { useQuery } from '@tanstack/react-query';

import { getPaginatedMessages } from '@/apis/channel';
import { useAuth } from '@/hooks/context/useAuth';

export const useGetChannelMessages = (channelId: string) => {
  const { auth } = useAuth();

  const { isFetched, isError, error, data, isSuccess, isFetching } = useQuery({
    queryFn: () =>
      getPaginatedMessages({ channelId, limit: 100, offset: 0, token: auth?.token as string }),
    queryKey: ['getPaginatedMessages', channelId], // Include channelId in key for proper caching per channel
    enabled: !!channelId && !!auth?.token, // Only fetch when channelId and token exist
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes before considering it stale
    gcTime: 1000 * 60 * 10, // Keep unused cache for 10 minutes (formerly cacheTime)
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: false, // Don't refetch on component mount if cache exists
  });

  return {
    isFetched,
    isFetching,
    isError,
    error,
    messages: data,
    isSuccess,
  };
};
