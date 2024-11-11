import { ApiClient } from './internal/api.gen';

// Custom api client
let apiClient: ApiClient<typeof $fetch>;

export const useApiClient = () => {
  const config = useRuntimeConfig();
  if (!apiClient) {
    apiClient = new ApiClient<typeof $fetch>({
      baseUrl: config.public.apiBase,
    });
  }
  return { apiClient };
};
