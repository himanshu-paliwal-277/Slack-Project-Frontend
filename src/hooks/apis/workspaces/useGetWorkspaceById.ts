import { useQuery } from '@tanstack/react-query';

import { fetchWorkspaceDetailsRequest } from '@/apis/workspaces';
import { useAuth } from '@/hooks/context/useAuth';

export const useGetWorkspaceById = (id: string) => {
  const { auth } = useAuth();
  const {
    isFetching,
    isSuccess,
    error,
    data: workspace,
    isError,
  } = useQuery({
    queryFn: () => fetchWorkspaceDetailsRequest(id, auth?.token as string),
    queryKey: [`fetchWorkspaceById-${id}`],
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes (300000ms)
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes (600000ms)
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return {
    isFetching,
    isSuccess,
    error,
    workspace,
    isError,
  };
};
