import type { User } from '@/migrations/00000-createTableUsers';
import type { Session } from '@/migrations/00014-createTableSessions';
import { cache } from 'react';
import { sql } from './connect';

export const getValidSession = cache(async (sessionToken: Session['token']) => {
  const [session] = await sql<Session[]>`
  SELECT
  id,
  token,
  expiry_timestamp,
  user_id
  FROM
  sessions
  WHERE
  token = ${sessionToken}
  AND expiry_timestamp > now()
  `;
  return session;
});

export const deleteSession = cache(async (sessionToken: Session['token']) => {
  const [session] = await sql<Session[]>`
  DELETE FROM sessions
  WHERE
    token = ${sessionToken}
    RETURNING
    id,
    token,
    expiry_timestamp,
    user_id
  `;
  return session;
});

export const createSessionInsecure = cache(
  async (sessionToken: Session['token'], userId: User['id']) => {
    await sql`
    DELETE FROM sessions
    WHERE
      expiry_timestamp < now()
    `;

    const [session] = await sql<Session[]>`
      INSERT INTO
        sessions (token, user_id)
        VALUES
          (
            ${sessionToken},
            ${userId}
          )
          RETURNING
            id,
            token,
            expiry_timestamp,
            user_id
    `;
    return session;
  },
);
