import type { Baby } from '@/migrations/00004-createTableBabies';
import type { Session } from '@/migrations/00014-createTableSessions';
import { cache } from 'react';
import { sql } from './connect';

export const createBaby = cache(
  async (
    sessionToken: Session['token'],
    parentConnectionId: Baby['parentConnectionId'],
    name: Baby['name'],
    birthDate: Baby['birthDate'],
    weight: Baby['weight'],
    height: Baby['height'],
    genderId: Baby['genderId'],
    profilePictureUrl: Baby['profilePictureUrl'],
  ) => {
    const [baby] = await sql<Baby[]>`
  INSERT INTO
  babies
  (
  parent_connection_id,
  name,
  birth_date,
  weight,
  height,
  gender_id,
  profile_picture_url
  )
  SELECT
    parent_connections.id,
    ${name},
    ${birthDate},
    ${weight},
    ${height},
    ${genderId},
    ${profilePictureUrl}
  FROM
  parent_connections
  INNER JOIN sessions ON (
    sessions.token = ${sessionToken}
    AND sessions.expiry_timestamp > now()
    AND (
      parent_connections.user_one_id = sessions.user_id
      OR parent_connections.user_two_id = sessions.user_id
    )
  )
  WHERE
  parent_connections.id = ${parentConnectionId}
  AND parent_connections.status = true
  RETURNING
  id,
  parent_connection_id,
  name,
  birth_date,
  weight,
  height,
  gender_id,
  created_at,
  updated_at,
  energy,
  profile_picture_url,
  latest_picture_url
  `;
    return baby;
  },
);

export const getBabies = cache(async (sessionToken: Session['token']) => {
  const babies = await sql<Baby[]>`
    SELECT
      babies.id,
      babies.parent_connection_id,
      babies.name,
      babies.birth_date,
      babies.weight,
      babies.height,
      babies.gender_id,
      babies.created_at,
      babies.updated_at,
      babies.energy,
      babies.profile_picture_url,
      babies.latest_picture_url
    FROM
      babies
      INNER JOIN parent_connections ON (
        parent_connections.id = babies.parent_connection_id
        AND parent_connections.status = true
      )
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
        AND (
          parent_connections.user_one_id = sessions.user_id
          OR parent_connections.user_two_id = sessions.user_id
        )
      )
    ORDER BY
      babies.birth_date
  `;
  return babies;
});

export const getBaby = cache(
  async (sessionToken: Session['token'], babyId: Baby['id']) => {
    const [baby] = await sql<Baby[]>`
    SELECT
      babies.id,
      babies.parent_connection_id,
      babies.name,
      babies.birth_date,
      babies.weight,
      babies.height,
      babies.gender_id,
      babies.created_at,
      babies.updated_at,
      babies.energy,
      babies.profile_picture_url,
      babies.latest_picture_url
    FROM
      babies
      INNER JOIN parent_connections ON (
        parent_connections.id = babies.parent_connection_id
        AND parent_connections.status = true
      )
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
        AND (
          parent_connections.user_one_id = sessions.user_id
          OR parent_connections.user_two_id = sessions.user_id
        )
      )
    WHERE
      babies.id = ${babyId}
  `;
    return baby;
  },
);
