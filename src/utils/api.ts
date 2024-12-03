import Axios from 'axios';
import { API_URL, GITHUB_TOKEN } from 'utils/constants';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { handleGlobalError } from 'utils/helpers';

export const api = Axios.create({
  baseURL: `${API_URL}`,
});

api.interceptors.request.use((request) => {
  if (GITHUB_TOKEN && request.headers) {
    request.headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  }
  return request;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    handleGlobalError(error);
    return Promise.reject(error);
  },
);

const mutationCache = new MutationCache({
  onError: (error) => {
    handleGlobalError(error);
  },
});

const queryCache = new QueryCache({
  onError: (error) => {
    handleGlobalError(error);
  },
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
  mutationCache,
  queryCache,
});
