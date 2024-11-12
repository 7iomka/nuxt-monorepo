// https://vike.dev/data

import { apiClient } from '@/shared/api/client';

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async () => {
  const data = await apiClient.users.getUsers();

  return { data };
};
