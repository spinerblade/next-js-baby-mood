import type { User } from '@/migrations/00000-createTableUsers';
import { cache } from 'react';
import { sql } from './connect';

export const getAllUserData = cache(async () => {
  const users = await sql<User[]>`
  SELECT
  *
  FROM
  users
  ORDER BY
  id
  `;
  return users;
});

export const getUserData = cache(async (username: string) => {
  const [user] = await sql<User[]>`
  SELECT
  *
  FROM
  users
  WHERE
  username = ${username}
  `;
  return user;
});
