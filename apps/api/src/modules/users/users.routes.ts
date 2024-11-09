import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import {
  userListQuerySchema,
  userListSchema,
  type UserList,
} from './users.schemas';

export const usersRoutes: FastifyPluginAsyncZod = async (fastify) => {
  fastify.get(
    '/list',
    {
      schema: {
        querystring: userListQuerySchema,
        response: {
          200: userListSchema,
        },
      },
    },
    async (request) => {
      const { limit, skip } = request.query;

      // Construct query string for fetch
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        skip: skip.toString(),
        select: 'id,email,name',
      });

      // Fetch users from real backend
      const usersResponse = await fetch(
        `https://dummyjson.com/users?${queryParams.toString()}`,
      );
      const { users: items, ...data } = await usersResponse.json();

      return {
        items,
        ...data,
      } satisfies UserList;
    },
  );
};
