import type { Sql } from 'postgres';
import z, { emoji } from 'zod';

export type Mood = {
  id: number;
  userId: number;
  moodTypeId: number;
  description: string;
  emoji: string;
  createdAt: Date;
  updatedAt: Date;
};

export const moodSchema = z.object({
  mood: z.object({
    moodTypeId: z.number().int().positive().max(3),
    description: z
      .string()
      .trim()
      .min(1, { error: 'Description must be minimum 1 character' })
      .max(20, { error: 'Description must be maximum 20 characters' }),
    emoji: z.emoji(),
  }),
});

export const moodIdSchema = z.coerce
  .number({ error: 'Invalid mood id' })
  .int({ error: 'Invalid mood id' })
  .positive({ error: 'Invalid mood id' });

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE moods (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      mood_type_id integer NOT NULL REFERENCES mood_types (id),
      description varchar(255) NOT NULL,
      emoji varchar(255) NOT NULL,
      created_at timestamp(0) without time zone NOT NULL DEFAULT now(),
      updated_at timestamp(0) without time zone NOT NULL DEFAULT now()
    );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE moods `;
}
