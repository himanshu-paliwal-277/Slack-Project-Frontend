import { useQuery } from '@tanstack/react-query';

import { getDMByIdRequest } from '@/apis/dm';
import { useAuth } from '@/hooks/context/useAuth';

export const useGetDMById = (roomId: string) => {
  const { auth } = useAuth();

  const { isFetching, isSuccess, error, data: dmData, isError } = useQuery({
    queryFn: () => getDMByIdRequest({ roomId, token: auth?.token as string }),
    queryKey: [`getDMById-${roomId}`],
    staleTime: 1 * 60 * 1000, // Cache for 1 minute
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: !!roomId && !!auth?.token,
  });

  return {
    isFetching,
    isSuccess,
    error,
    dmData,
    isError,
  };
};
