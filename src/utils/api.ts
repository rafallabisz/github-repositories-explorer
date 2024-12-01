import Axios from 'axios';
import { API_URL } from 'utils/constants';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { handleGlobalError } from 'utils/helpers';

export const api = Axios.create({
  baseURL: `${API_URL}`,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    handleGlobalError(error);
    return Promise.reject(error);
  },
);

const mutationCache = new MutationCache({
  onError: (error, _variables, _context, mutation) => {
    // If this mutation has an onError defined, skip this
    if (mutation.options.onError) return;
    handleGlobalError(error);
  },
});

const queryCache = new QueryCache({
  onError: (error, query) => {
    const options = query.options as any;
    // If this query has an onError defined, skip this
    if (options?.onError) return;
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
