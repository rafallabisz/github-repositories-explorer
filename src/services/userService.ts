import { api } from 'utils/api';
import { ApiResponse, UserRepository, User } from 'types/models';
import { config } from 'config';

export const getUsers = async (
  username: string,
  perPage = config.USERS_PER_PAGE,
  page = config.INITIAL_PAGE,
) => {
  return api.get<ApiResponse<User>>(`/search/users`, {
    params: {
      q: username,
      per_page: perPage,
      page,
    },
  });
};

export const getUserRepos = async (
  username: string,
  perPage = config.USER_REPOS_PER_PAGE,
  page = config.INITIAL_PAGE,
) => {
  return api.get<UserRepository[]>(`/users/${username}/repos`, {
    params: {
      per_page: perPage,
      page,
    },
  });
};
