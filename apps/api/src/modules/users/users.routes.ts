import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import {
  userListQuerySchema,
  userListSchema,
  userSchema,
  type UserList,
} from './users.schemas';
import { z } from 'zod';

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

      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        skip: skip.toString(),
        select: 'id,email,firstName,lastName',
      });

      const usersResponse = await fetch(
        `https://dummyjson.com/users?${queryParams.toString()}`,
      );
      const { users: items, ...data } = await usersResponse.json();

      const normalizedUsers = items.map(normalizeUser);

      return {
        items: normalizedUsers,
        ...data,
      } satisfies UserList;
    },
  );

  fastify.get<{ Params: { id: string } }>(
    '/:id',
    {
      schema: {
        params: z.object({
          id: z.coerce.number().int(),
        }),
        response: {
          200: userSchema,
        },
      },
    },
    async (request) => {
      const { id } = request.params;

      const queryParams = new URLSearchParams({
        select: 'id,email,firstName,lastName',
      });

      const userResponse = await fetch(
        `https://dummyjson.com/users/${id}?${queryParams.toString()}`,
      );
      const user = await userResponse.json();

      const normalizedUser = normalizeUser(user);

      return normalizedUser;
    },
  );
};

function normalizeUser(user: {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}): z.infer<typeof userSchema> {
  return {
    ...user,
    name: `${user.firstName} ${user.lastName}`,
  };
}
