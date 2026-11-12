import type { Achievement } from '@/migrations/00005-createTableAchievements';
import type { Session } from '@/migrations/00014-createTableSessions';
import { cache } from 'react';
import { sql } from './connect';

export const createAchievement = cache(
  async (
    sessionToken: Session['token'],
    babyId: Achievement['babyId'],
    description: Achievement['description'],
    date: Achievement['date'],
  ) => {
    const [achievement] = await sql<Achievement[]>`
      INSERT INTO
        achievements (baby_id, description, date)
      SELECT
        babies.id,
        ${description},
        ${date}
      FROM
        babies
        INNER JOIN parent_connections ON (
          parent_connections.id = babies.parent_connection_id
          AND parent_connections.status = TRUE
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
      RETURNING
        id,
        baby_id,
        description,
        date,
        created_at,
        updated_at
    `;
    return achievement;
  },
);

export const getAchievements = cache(
  async (sessionToken: Session['token'], babyId: Achievement['babyId']) => {
    const achievements = await sql<Achievement[]>`
      SELECT
        achievements.id,
        achievements.baby_id,
        achievements.description,
        achievements.date,
        achievements.created_at,
        achievements.updated_at
      FROM
        achievements
        INNER JOIN babies ON babies.id = achievements.baby_id
        INNER JOIN parent_connections ON (
          parent_connections.id = babies.parent_connection_id
          AND parent_connections.status = TRUE
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
        achievements.baby_id = ${babyId}
      ORDER BY
        achievements.date
    `;
    return achievements;
  },
);
