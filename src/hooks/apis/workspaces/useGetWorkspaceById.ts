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
  } = useQuery({
    queryFn: () => fetchWorkspaceDetailsRequest(id, auth?.token as string),
    queryKey: [`fetchWorkspaceById-${id}`],
    staleTime: 30000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  return {
    isFetching,
    isSuccess,
    error,
    workspace,
  };
};
