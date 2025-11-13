import { useQuery } from '@tanstack/react-query';

import { getAllDMsRequest } from '@/apis/dm';
import { useAuth } from '@/hooks/context/useAuth';

export const useGetAllDMs = (workspaceId: string) => {
  const { auth } = useAuth();

  const {
    isFetching,
    isSuccess,
    error,
    data: dms,
    isError,
  } = useQuery({
    queryFn: () => getAllDMsRequest({ workspaceId, token: auth?.token as string }),
    queryKey: [`getAllDMs-${workspaceId}`],
    staleTime: 2 * 60 * 1000, // Cache for 2 minutes
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: !!workspaceId && !!auth?.token,
  });

  return {
    isFetching,
    isSuccess,
    error,
    dms,
    isError,
  };
};
