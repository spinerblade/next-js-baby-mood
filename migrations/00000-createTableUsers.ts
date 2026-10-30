import type { Sql } from 'postgres';
import z from 'zod';

export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  passwordHash: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  profilePictureLink: string | null;
};

export async function up(sql: Sql) {
  await sql`

CREATE TABLE users(
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "username" VARCHAR(255) NOT NULL UNIQUE,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "birth_date" DATE NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT now(),
    "profile_picture_link" VARCHAR(255) NULL
);

  `;
}

export async function down(sql: Sql) {
  await sql`
  DROP TABLE users
  `;
}
