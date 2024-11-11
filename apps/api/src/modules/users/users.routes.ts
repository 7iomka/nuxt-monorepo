import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import {
  GetUsersResponseSchema,
  GetUsersQuerySchema,
  type GetUsersResponse,
  GetUserByIdParamsSchema,
  GetUserByIdResponseSchema,
} from './users.schemas';
import { normalizeUser, type UserDataFromApi } from './users.lib';

export const usersRoutes: FastifyPluginAsyncZod = async (fastify) => {
  fastify.get(
    '',
    {
      schema: {
        // operationId: 'getUsers',
        tags: ['user'],
        querystring: GetUsersQuerySchema,
        response: {
          200: GetUsersResponseSchema,
        },
      },
    },
    async (request, reply) => {
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

      return reply.status(200).send({
        items: normalizedUsers,
        ...data,
      } satisfies GetUsersResponse);
    },
  );

  fastify.get<{ Params: { id: string } }>(
    '/:id',
    {
      schema: {
        // operationId: 'getUserById',
        tags: ['user'],
        params: GetUserByIdParamsSchema,
        response: {
          200: GetUserByIdResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      const queryParams = new URLSearchParams({
        select: 'id,email,firstName,lastName',
      });

      const userResponse = await fetch(
        `https://dummyjson.com/users/${id}?${queryParams.toString()}`,
      );

      if (!userResponse.ok) {
        return reply.notFound('User not found');
      }

      const user = (await userResponse.json()) as UserDataFromApi;

      const normalizedUser = normalizeUser(user);

      return normalizedUser;
    },
  );
};
