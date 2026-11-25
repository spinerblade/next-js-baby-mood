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
      .max(20, { error: 'Name must be maximum 20 characters' })
      .transform((name) => name.charAt(0).toUpperCase() + name.slice(1)),
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
    CREATE TABLE babies (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      parent_connection_id integer NOT NULL REFERENCES parent_connections (id) ON DELETE CASCADE,
      name varchar(255) NOT NULL,
      birth_date date NOT NULL,
      weight integer NOT NULL,
      height integer NOT NULL,
      gender_id integer NOT NULL REFERENCES genders (id),
      created_at timestamp(0) without time zone NOT NULL DEFAULT now(),
      updated_at timestamp(0) without time zone NOT NULL DEFAULT now(),
      energy integer NULL,
      profile_picture_url varchar(255) NULL,
      latest_picture_url varchar(255) NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE babies `;
}
