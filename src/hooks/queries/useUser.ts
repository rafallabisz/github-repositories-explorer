import { getUsers, getUsersRepos } from 'services/userService';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { QueryKey } from 'utils/constants';
import { config } from 'config';
import { queryClient } from 'utils/api';

interface UsersRequest {
  username: string;
  perPage?: number;
  enabled?: boolean;
}

export const useUsers = ({ username, perPage, enabled = false }: UsersRequest) => {
  return useQuery({
    queryKey: [QueryKey.USERS, username, perPage, enabled],
    queryFn: async () => {
      const { data } = await getUsers(username, perPage);
      return data;
    },
    enabled,
  });
};

type UsersReposRequest = UsersRequest & {};

export const useInfiniteUsersRepos = ({
  username,
  perPage,
  enabled = false,
}: UsersReposRequest) => {
  return useInfiniteQuery({
    queryKey: [QueryKey.USERS_REPOS, username, perPage],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await getUsersRepos(username, perPage, pageParam);
      return { data, page: pageParam };
    },
    initialPageParam: 1,
    enabled,
    getNextPageParam: (lastPage) =>
      lastPage.data.length === perPage ? lastPage.page + 1 : undefined,
  });
};

export const handlePrefetchUsersRepos = async (activeUsername: string) => {
  await queryClient.prefetchQuery({
    queryKey: [QueryKey.USERS_REPOS, activeUsername],
    queryFn: async () => {
      const { data } = await getUsersRepos(activeUsername, config.USERS_REPOS_PER_PAGE);
      return data;
    },
    staleTime: 10 * 1000, //only prefetch if older than 10 sec
  });
};
