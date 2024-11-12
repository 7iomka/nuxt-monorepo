// https://vike.dev/data

import type { PageContextServer } from 'vike/types';
import { apiClient } from '@/shared/api/client';

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async (pageContext: PageContextServer) => {
  const user = await apiClient.users.getUserById(
    Number(pageContext.routeParams.id),
  );
  return { user };
};
