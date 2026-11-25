import type { User } from '@/migrations/00000-createTableUsers';
import type { Session } from '@/migrations/00014-createTableSessions';
import { cache } from 'react';
import { sql } from './connect';

export const getUser = cache(async (sessionToken: Session['token']) => {
  const [user] = await sql<
    Pick<
      User,
      | 'id'
      | 'username'
      | 'firstName'
      | 'lastName'
      | 'birthDate'
      | 'profilePictureUrl'
    >[]
  >`
    SELECT
      users.id,
      users.username,
      users.first_name,
      users.last_name,
      users.birth_date,
      users.profile_picture_url
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

export async function updateUserProfilePicture(
  sessionToken: Session['token'],
  publicId: string,
) {
  const [user] = await sql<Pick<User, 'id'>[]>`
    UPDATE users
    SET
      profile_picture_url = ${publicId}
    FROM
      sessions
    WHERE
      sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > now()
      AND sessions.user_id = users.id
    RETURNING
      users.id
  `;
  return user;
}

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

export async function updateUserNames(
  sessionToken: Session['token'],
  firstName: string,
  lastName: string,
  birthDate: Date,
) {
  const [user] = await sql<
    Pick<User, 'id' | 'firstName' | 'lastName' | 'birthDate'>[]
  >`
    UPDATE users
    SET
      first_name = ${firstName},
      last_name = ${lastName},
      birth_date = ${birthDate},
      updated_at = now()
    FROM
      sessions
    WHERE
      sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > now()
      AND sessions.user_id = users.id
    RETURNING
      users.id,
      users.first_name,
      users.last_name,
      users.birth_date
  `;
  return user;
}

export const createUserInsecure = cache(
  async (username: User['username'], passwordHash: string, email: string) => {
    const [user] = await sql<Pick<User, 'id' | 'username' | 'email'>[]>`
      INSERT INTO
        users (
          username,
          password_hash,
          email
        )
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
