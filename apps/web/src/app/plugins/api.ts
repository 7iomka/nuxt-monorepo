import { defineNuxtPlugin } from '#app';
import { ApiClient } from '@/shared/api/internal/api.gen';

export default defineNuxtPlugin((nuxtApp) => {
  const customFetch = $fetch.create({
    baseURL: nuxtApp.$config.public.apiBase,
  });

  const apiClient = new ApiClient({
    customFetch,
  });

  return {
    provide: {
      apiClient,
    },
  };
});
