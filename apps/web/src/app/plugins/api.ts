import { defineNuxtPlugin } from '#app';
import { ApiClient } from '@/shared/api/internal/api.gen';

export default defineNuxtPlugin((nuxtApp) => {
  // const customNuxtFetch = $fetch.create({
  //   baseURL: nuxtApp.$config.public.apiBase,
  // });

  const apiClient = new ApiClient({
    baseUrl: nuxtApp.$config.public.apiBase,
  });

  return {
    provide: {
      apiClient,
    },
  };
});
