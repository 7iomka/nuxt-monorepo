import { z } from 'zod';

/** User data */
const UserDataSchema = z.object({
  id: z.number().int(),
  email: z.string().email(),
  name: z.string(),
});
export type UserData = z.infer<typeof UserDataSchema>;

/** Get user by ID */
export const GetUserByIdParamsSchema = z.object({
  id: z.coerce.number().int(),
});
export type GetUserByIdParams = z.infer<typeof GetUserByIdParamsSchema>;
export const GetUserByIdBodySchema = UserDataSchema;
export type GetUserByIdBody = z.infer<typeof GetUserByIdBodySchema>;
export const GetUserByIdResponseSchema = UserDataSchema;
export type GetUserByIdResponse = z.infer<typeof GetUserByIdResponseSchema>;

/** Get users */
export const GetUsersQuerySchema = z.object({
  limit: z.coerce.number().int().nonnegative().default(10),
  skip: z.coerce.number().int().nonnegative().default(0),
});
export const GetUsersResponseSchema = z.object({
  items: z.array(UserDataSchema),
  total: z.number().int(),
  limit: z.number().int(),
  skip: z.number().int(),
});
export type GetUsersResponse = z.infer<typeof GetUsersResponseSchema>;
