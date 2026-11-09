import type { Sql } from 'postgres';
import z from 'zod';

export type Baby = {
  id: number;
  parentConnectionId: number;
  name: string;
  birthDate: Date;
  weight: number;
  height: number;
  genderId: number;
  createdAt: Date;
  updatedAt: Date;
  energy: number | null;
  profilePictureUrl: string | null;
  latestPictureUrl: string | null;
};

export const babySchema = z.object({
  baby: z.object({
    name: z
      .string({ error: 'Please enter a name' })
      .trim()
      .min(1, { error: 'Name must be minimum 1 character' })
      .max(20, { error: 'Name must be maximum 20 characters' }),
    birthDate: z.coerce
      .date({ error: 'Please enter a valid birthdate' })
      .refine((date) => date <= new Date(), {
        error: 'Birthdate can not be in the future',
      }),
    weight: z.coerce
      .number({ error: 'Weight must be a number' })
      .int({ error: 'Weight must be a whole number in grams' })
      .min(1, { error: 'Weight must be at least 1 gram' })
      .max(30000, { error: 'Weight must be maximum 30000 grams' }),
    height: z.coerce
      .number({ error: 'Height must be a number' })
      .int({ error: 'Height must be a whole number in centimeters' })
      .min(1, { error: 'Height must be at least 1 centimeter' })
      .max(150, { error: 'Height must be maximum 150 centimeters' }),
    genderId: z.coerce
      .number({ error: 'Please choose a gender' })
      .int({ error: 'Please choose a gender' })
      .positive({ error: 'Please choose a gender' }),
  }),
});

export const babyIdSchema = z.coerce
  .number({ error: 'Invalid baby id' })
  .int({ error: 'Invalid baby id' })
  .positive({ error: 'Invalid baby id' });

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE babies(
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      parent_connection_id INTEGER NOT NULL REFERENCES parent_connections (id) ON DELETE CASCADE,
      name VARCHAR(255) NOT NULL,
      birth_date DATE NOT NULL,
      weight INTEGER NOT NULL,
      height INTEGER NOT NULL,
      gender_id INTEGER NOT NULL REFERENCES genders (id),
      created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT now(),
      updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT now(),
      energy INTEGER NULL,
      profile_picture_url VARCHAR(255) NULL,
      latest_picture_url VARCHAR(255) NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE babies
  `;
}
