import type { Sql } from 'postgres';
import z from 'zod';

export type Achievement = {
  id: number;
  babyId: number;
  description: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

export const achievementSchema = z.object({
  achievement: z.object({
    babyId: z.number(),
    description: z
      .string({ error: 'Please enter a description' })
      .trim()
      .min(1, { error: 'Description must be minimum 1 character' })
      .max(255, { error: 'Description must be maximum 255 characters' }),
    date: z.coerce
      .date({ error: 'Please enter a valid date' })
      .refine((date) => date <= new Date(), {
        error: 'Date can not be in the future',
      }),
  }),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE achievements(
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      baby_id INTEGER NOT NULL REFERENCES babies (id) ON DELETE CASCADE,
      description VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT now(),
      updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT now()
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE achievements
  `;
}
