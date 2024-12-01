import { getUsers } from 'services/userService';
import { useQuery } from '@tanstack/react-query';
import { QueryKey } from 'utils/constants';

export const useUsers = (username: string, perPage?: number, enabled = false) => {
  return useQuery({
    queryKey: [QueryKey.USERS, username, perPage, enabled],
    queryFn: async () => {
      const { data } = await getUsers(username, perPage);
      return data;
    },
    enabled,
  });
};
