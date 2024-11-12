import { ApiClient } from './internal/api.gen';

export const apiClient = new ApiClient({
  baseUrl: import.meta.env.PUBLIC_ENV__API_BASE,
});
