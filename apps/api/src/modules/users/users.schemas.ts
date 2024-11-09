import { z } from 'zod';

// Define user schema
export const userSchema = z.object({
  id: z.number().int(),
  email: z.string().email(),
  name: z.string(),
});

export type User = z.infer<typeof userSchema>;

// Define user list schema
export const userListSchema = z.object({
  items: z.array(userSchema),
  total: z.number().int(),
  limit: z.number().int(),
  skip: z.number().int(),
});

export type UserList = z.infer<typeof userListSchema>;

// Schema for query parameters
export const userListQuerySchema = z.object({
  limit: z.coerce.number().int().nonnegative().default(10),
  skip: z.coerce.number().int().nonnegative().default(0),
});
