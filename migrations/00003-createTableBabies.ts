import type { Sql } from 'postgres';
import z from 'zod';

export type Baby = {
  id: number;
  userId: number;
  name: string;
  birthDate: Date;
  weight: number;
  height: number;
  genderId: number;
  createdAt: Date;
  updatedAt: Date;
  energy: number;
  profilePictureLink: string | null;
  latestPictureLink: string | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE babies(
      "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      "user_id" INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      "name" VARCHAR(255) NOT NULL,
      "birth_date" DATE NOT NULL,
      "weight" INTEGER NOT NULL,
      "height" INTEGER NOT NULL,
      "gender_id" INTEGER NOT NULL REFERENCES genders (id),
      "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT now(),
      "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT now(),
      "energy" INTEGER NOT NULL,
      "profile_picture_link" VARCHAR(255) NULL,
      "latest_picture_link" VARCHAR(255) NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE babies
  `;
}
