import type { Mood } from '@/migrations/00007-createTableMoods';
import type { Session } from '@/migrations/00014-createTableSessions';
import { cache } from 'react';
import { sql } from './connect';

export const createMood = cache(
  async (
    sessionToken: Session['token'],
    moodTypeId: Mood['moodTypeId'],
    description: Mood['description'],
    emoji: Mood['emoji'],
  ) => {
    const [mood] = await sql<Mood[]>`
      INSERT INTO
        moods (
          user_id,
          mood_type_id,
          description,
          emoji
        )
      SELECT
        sessions.user_id,
        ${moodTypeId},
        ${description},
        ${emoji}
      FROM
        sessions
      WHERE
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
      RETURNING
        id,
        user_id,
        mood_type_id,
        description,
        emoji,
        created_at,
        updated_at
    `;
    return mood;
  },
);

export const getMoods = cache(async (sessionToken: Session['token']) => {
  const moods = await sql<Mood[]>`
    SELECT
      moods.id,
      moods.user_id,
      moods.mood_type_id,
      moods.description,
      moods.emoji,
      moods.created_at,
      moods.updated_at
    FROM
      moods
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
        AND sessions.user_id = moods.user_id
      )
    ORDER BY
      moods.created_at
  `;
  return moods;
});

export const getMood = cache(
  async (sessionToken: Session['token'], moodId: Mood['id']) => {
    const [mood] = await sql<Mood[]>`
      SELECT
        moods.id,
        moods.user_id,
        moods.mood_type_id,
        moods.description,
        moods.emoji,
        moods.created_at,
        moods.updated_at
      FROM
        moods
        INNER JOIN sessions ON (
          sessions.token = ${sessionToken}
          AND sessions.expiry_timestamp > now()
          AND sessions.user_id = moods.user_id
        )
      WHERE
        moods.id = ${moodId}
    `;
    return mood;
  },
);

export const updateMood = cache(
  async (
    sessionToken: Session['token'],
    moodId: Mood['id'],
    moodTypeId: Mood['moodTypeId'],
    description: Mood['description'],
    emoji: Mood['emoji'],
  ) => {
    const [mood] = await sql<Mood[]>`
      UPDATE moods
      SET
        mood_type_id = ${moodTypeId},
        description = ${description},
        emoji = ${emoji},
        updated_at = now()
      FROM
        sessions
      WHERE
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
        AND moods.id = ${moodId}
        AND sessions.user_id = moods.user_id
      RETURNING
        moods.id,
        moods.user_id,
        moods.mood_type_id,
        moods.description,
        moods.emoji,
        moods.created_at,
        moods.updated_at
    `;
    return mood;
  },
);

export const deleteMood = cache(
  async (sessionToken: Session['token'], moodId: Mood['id']) => {
    const [mood] = await sql<Mood[]>`
      DELETE FROM moods USING sessions
      WHERE
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
        AND moods.id = ${moodId}
        AND moods.user_id = sessions.user_id
      RETURNING
        moods.id,
        moods.user_id,
        moods.mood_type_id,
        moods.description,
        moods.emoji,
        moods.created_at,
        moods.updated_at
    `;
    return mood;
  },
);
