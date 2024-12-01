import { api } from 'utils/api';
import { ApiResponse, User } from 'types/models';

export const getUsers = async (username: string, perPage = 5) => {
  return api.get<ApiResponse<User>>(`/search/users`, {
    params: {
      q: username,
      per_page: perPage,
    },
  });
};
