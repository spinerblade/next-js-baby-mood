import type { Sql } from 'postgres';
import z, { email } from 'zod';

export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  profilePictureLink: string | null;
};

export const userSchemaSignUp = z.object({
  user: z.object({
    username: z
      .string()
      .min(3, { error: 'Username must be minimum 3 characters' })
      .max(20, { error: 'Username must be maximum 20 characters' })
      .trim(),
    password: z
      .string()
      .min(8, { error: 'Password must be minimum 8 characters' }),
    email: z.email({ error: 'Email format is not valid' }),
  }),
});

export const userSchemaLogin = z.object({
  user: z.object({
    username: z.string(),
    password: z.string(),
  }),
});

export async function up(sql: Sql) {
  await sql`

CREATE TABLE users(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    birth_date DATE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT now(),
    profile_picture_link VARCHAR(255) NULL
);

  `;
}

export async function down(sql: Sql) {
  await sql`
  DROP TABLE users
  `;
}
