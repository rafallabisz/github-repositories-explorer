export const API_URL = process.env.REACT_APP_API_URL;
export const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const QueryKey = {
  USERS: 'users',
  USER_REPOS: 'user_repos',
} as const;

export enum SearchParams {
  SEARCH = 'search',
}
