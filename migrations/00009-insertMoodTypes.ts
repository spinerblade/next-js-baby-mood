import type { Sql } from 'postgres';
import type { MoodType } from './00008-createTableMoodTypes';

export const moodTypes: MoodType[] = [
  { id: 1, name: 'positive' },
  { id: 2, name: 'neutral' },
  { id: 3, name: 'negative' },
];

export async function up(sql: Sql) {
  for (const moodType of moodTypes) {
    await sql`
      INSERT INTO
        mood_types (name)
      VALUES
        (${moodType.name})
    `;
  }
}

export async function down(sql: Sql) {
  for (const moodType of moodTypes) {
    await sql`
      DELETE FROM mood_types
      WHERE
        id = ${moodType.id}
    `;
  }
}
