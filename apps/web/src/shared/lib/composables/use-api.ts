import { defu } from 'defu';

export const useApi: typeof useFetch = (req, opts) =>
  useFetch(req, defu(opts, { $fetch: useNuxtApp().$api }) as typeof opts);
