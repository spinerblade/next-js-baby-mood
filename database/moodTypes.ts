import type { MoodType } from '@/migrations/00006-createTableMoodTypes';
import type { Session } from '@/migrations/00014-createTableSessions';
import { cache } from 'react';
import { sql } from './connect';

export const getMoodTypes = cache(async (sessionToken: Session['token']) => {
  const moodTypes = await sql<MoodType[]>`
    SELECT
      mood_types.id,
      mood_types.name
    FROM
      mood_types
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
      )
    ORDER BY
      mood_types.id
  `;
  return moodTypes;
});
