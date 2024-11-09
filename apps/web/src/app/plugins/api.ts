export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: config.public.apiBase,
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
