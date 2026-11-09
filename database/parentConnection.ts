import type { User } from '@/migrations/00000-createTableUsers';
import type { ParentConnection } from '@/migrations/00003-createTableParentConnections';
import type { Session } from '@/migrations/00014-createTableSessions';
import { cache } from 'react';
import { sql } from './connect';

export const createParentConnectionRequest = cache(
  async (
    sessionToken: Session['token'],
    userTwoId: ParentConnection['userTwoId'],
  ) => {
    const [parentConnectionRequest] = await sql<ParentConnection[]>`
  INSERT INTO
  parent_connections (user_one_id, user_two_id, status)
  SELECT
  sessions.user_id,
  ${userTwoId},
  false
  FROM
  sessions
  WHERE
  sessions.token = ${sessionToken}
  AND sessions.expiry_timestamp > now()
  RETURNING
id,
  user_one_id,
  user_two_id,
  status,
  created_at,
  updated_at

  `;
    return parentConnectionRequest;
  },
);

export type ParentConnectionRequest = Pick<ParentConnection, 'id'> &
  Pick<User, 'username'>;

export const getParentConnectionRequests = cache(
  async (sessionToken: Session['token']) => {
    const parentConnectionRequests = await sql<ParentConnectionRequest[]>`
    SELECT
    parent_connections.id,
    users.username
    FROM
    parent_connections
    INNER JOIN sessions ON (
      sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > now()
      AND parent_connections.user_two_id = sessions.user_id)
    INNER JOIN users ON (
      users.id = parent_connections.user_one_id)
    WHERE
     parent_connections.status = false


  `;
    return parentConnectionRequests;
  },
);

export const acceptParentConnectionRequest = cache(
  async (
    sessionToken: Session['token'],
    connectionId: ParentConnection['id'],
  ) => {
    const [connection] = await sql<ParentConnection[]>`
  UPDATE
  parent_connections
  SET
  status = true,
  updated_at = now()
  FROM
  sessions
  WHERE
  sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > now()
      AND parent_connections.user_two_id = sessions.user_id
      AND parent_connections.status = false
      AND parent_connections.id = ${connectionId}
RETURNING
parent_connections.id,
parent_connections.user_one_id,
parent_connections.user_two_id,
parent_connections.status,
parent_connections.created_at,
parent_connections.updated_at
  `;
    return connection;
  },
);

export const declineParentConnectionRequest = cache(
  async (
    sessionToken: Session['token'],
    connectionId: ParentConnection['id'],
  ) => {
    const [connection] = await sql<ParentConnection[]>`
  DELETE FROM
  parent_connections USING sessions
  WHERE
  sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > now()
      AND parent_connections.user_two_id = sessions.user_id
      AND parent_connections.status = false
      AND parent_connections.id = ${connectionId}
RETURNING
parent_connections.id,
parent_connections.user_one_id,
parent_connections.user_two_id,
parent_connections.status,
parent_connections.created_at,
parent_connections.updated_at
  `;
    return connection;
  },
);

export const getAcceptedParentConnection = cache(
  async (sessionToken: Session['token']) => {
    const [connection] = await sql<ParentConnection[]>`
  SELECT
parent_connections.id,
parent_connections.user_one_id,
parent_connections.user_two_id,
parent_connections.status,
parent_connections.created_at,
parent_connections.updated_at
  FROM
  parent_connections
  INNER JOIN sessions ON (
    sessions.token = ${sessionToken}
    AND
    sessions.expiry_timestamp > now()
    AND
    (parent_connections.user_one_id = sessions.user_id
    OR
    parent_connections.user_two_id = sessions.user_id)
  )
  WHERE
  parent_connections.status = true
  `;
    return connection;
  },
);

export const getParentConnectionInsecure = cache(
  async (userOneId: User['id'], userTwoId: User['id']) => {
    const [connection] = await sql<ParentConnection[]>`
     SELECT
      id,
      user_one_id,
      user_two_id,
      status,
      created_at,
      updated_at
     FROM
      parent_connections
      WHERE
     user_one_id = ${userOneId}
      AND
     user_two_id = ${userTwoId}
      OR
     user_one_id = ${userTwoId}
      AND
     user_two_id = ${userOneId}
    `;
    return connection;
  },
);

export const getAcceptedParentConnectionInsecure = cache(
  async (userId: User['id']) => {
    const [connection] = await sql<ParentConnection[]>`
      SELECT
        id,
        user_one_id,
        user_two_id,
        status,
        created_at,
        updated_at
      FROM
        parent_connections
      WHERE
        status = true
        AND (
          user_one_id = ${userId}
          OR user_two_id = ${userId}
        )
    `;
    return connection;
  },
);
