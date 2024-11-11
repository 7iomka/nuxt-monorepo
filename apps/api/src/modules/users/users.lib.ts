import type { UserData } from './users.schemas';

export interface UserDataFromApi {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export function normalizeUser(user: UserDataFromApi): UserData {
  return {
    ...user,
    name: `${user.firstName} ${user.lastName}`,
  };
}
