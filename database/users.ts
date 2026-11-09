import type { User } from '@/migrations/00000-createTableUsers';
import type { Session } from '@/migrations/00014-createTableSessions';
import { cache } from 'react';
import { sql } from './connect';

export const getUser = cache(async (sessionToken: Session['token']) => {
  const [user] = await sql<Pick<User, 'id' | 'username'>[]>`
    SELECT
    users.id,
    users.username
    FROM
      users
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
        AND users.id = sessions.user_id
      )
  `;
  return user;
});

export const getUserInsecure = cache(async (username: User['username']) => {
  const [user] = await sql<Pick<User, 'id' | 'username'>[]>`
  SELECT
  id,
  username
  FROM
  users
  WHERE
  username = ${username.toLowerCase()}
  `;
  return user;
});

export const getUserWithPasswordHashInsecure = cache(
  async (username: User['username']) => {
    type UserWithPasswordHash = Pick<User, 'id' | 'username'> & {
      passwordHash: string;
    };

    const [user] = await sql<UserWithPasswordHash[]>`
  SELECT
  id,
  username,
  password_hash
  FROM
  users
  WHERE
  username = ${username.toLowerCase()}
  `;
    return user;
  },
);

export const createUserInsecure = cache(
  async (username: User['username'], passwordHash: string, email: string) => {
    const [user] = await sql<Pick<User, 'id' | 'username' | 'email'>[]>`
    INSERT INTO
    users (username, password_hash, email)
    VALUES
    (
      ${username.toLowerCase()},
      ${passwordHash},
      ${email}
    )
    RETURNING
    id,
    username,
    email
    `;
    return user;
  },
);

export const getUserExistsInsecure = cache(
  async (username: User['username']) => {
    const [record] = await sql<{ exists: boolean }[]>`
  SELECT
  EXISTS (
    SELECT
    1
    FROM
    users
    WHERE
    users.username = ${username}
  )
  `;
    return !!record?.exists;
  },
);
