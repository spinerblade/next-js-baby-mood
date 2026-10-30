import type { Sql } from 'postgres';
import type { Achievement } from './00006-createTableAchievements';

export const achievements: Achievement[] = [
  {
    id: 1,
    babyId: 1,
    achievement: 'First smile',
    date: new Date('2026-03-20'),
    createdAt: new Date('2026-09-01T09:30:00Z'),
    updatedAt: new Date('2026-09-01T09:30:00Z'),
  },
  {
    id: 2,
    babyId: 1,
    achievement: 'Rolled over',
    date: new Date('2026-05-30'),
    createdAt: new Date('2026-09-01T09:32:00Z'),
    updatedAt: new Date('2026-09-01T09:32:00Z'),
  },
  {
    id: 3,
    babyId: 2,
    achievement: 'First tooth',
    date: new Date('2026-05-12'),
    createdAt: new Date('2026-09-14T15:00:00Z'),
    updatedAt: new Date('2026-09-14T15:00:00Z'),
  },
  {
    id: 4,
    babyId: 2,
    achievement: 'Sat up without help',
    date: new Date('2026-06-01'),
    createdAt: new Date('2026-09-14T15:02:00Z'),
    updatedAt: new Date('2026-09-14T15:02:00Z'),
  },
  {
    id: 5,
    babyId: 4,
    achievement: 'First steps',
    date: new Date('2026-09-15'),
    createdAt: new Date('2026-10-10T19:00:00Z'),
    updatedAt: new Date('2026-10-10T19:00:00Z'),
  },
];

export async function up(sql: Sql) {
  for (const achievement of achievements) {
    await sql`
      INSERT INTO
        achievements (
          baby_id,
          achievement,
          date,
          created_at,
          updated_at
        )
      VALUES
        (
          ${achievement.babyId},
          ${achievement.achievement},
          ${achievement.date},
          ${achievement.createdAt},
          ${achievement.updatedAt}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const achievement of achievements) {
    await sql`
      DELETE FROM achievements
      WHERE
        id = ${achievement.id}
    `;
  }
}
