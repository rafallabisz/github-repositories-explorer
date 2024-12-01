export const API_URL = process.env.REACT_APP_API_URL;

export const QueryKey = {
  USERS: 'users',
  USERS_REPOS: 'users_repos',
} as const;

export enum SearchParams {
  SEARCH = 'search',
}
