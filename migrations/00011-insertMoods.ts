import type { Sql } from 'postgres';
import type { Mood } from './00010-createTableMoods';

export const moods: Mood[] = [
  {
    id: 1,
    userId: 1,
    moodTypeId: 1,
    mood: 'Happy',
    emoji: '😊',
    createdAt: new Date('2026-10-20T07:00:00Z'),
    updatedAt: new Date('2026-10-20T07:00:00Z'),
  },
  {
    id: 2,
    userId: 2,
    moodTypeId: 3,
    mood: 'Exhausted',
    emoji: '😴',
    createdAt: new Date('2026-10-20T06:15:00Z'),
    updatedAt: new Date('2026-10-20T06:15:00Z'),
  },
  {
    id: 3,
    userId: 3,
    moodTypeId: 2,
    mood: 'Okay',
    emoji: '😐',
    createdAt: new Date('2026-10-21T12:30:00Z'),
    updatedAt: new Date('2026-10-21T12:30:00Z'),
  },
  {
    id: 4,
    userId: 4,
    moodTypeId: 3,
    mood: 'Stressed',
    emoji: '😣',
    createdAt: new Date('2026-10-23T20:10:00Z'),
    updatedAt: new Date('2026-10-23T20:10:00Z'),
  },
  {
    id: 5,
    userId: 1,
    moodTypeId: 1,
    mood: 'Proud',
    emoji: '🥰',
    createdAt: new Date('2026-10-24T17:45:00Z'),
    updatedAt: new Date('2026-10-24T17:45:00Z'),
  },
];

export async function up(sql: Sql) {
  for (const mood of moods) {
    await sql`
      INSERT INTO
        moods (
          user_id,
          mood_type_id,
          mood,
          emoji,
          created_at,
          updated_at
        )
      VALUES
        (
          ${mood.userId},
          ${mood.moodTypeId},
          ${mood.mood},
          ${mood.emoji},
          ${mood.createdAt},
          ${mood.updatedAt}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const mood of moods) {
    await sql`
      DELETE FROM moods
      WHERE
        id = ${mood.id}
    `;
  }
}
