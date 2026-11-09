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
    name: z.string().min(1).max(20),
    birthDate: z.coerce.date(),
    weight: z.coerce.number().min(1).max(30000).int(),
    height: z.coerce.number().min(1).max(150).int(),
    genderId: z.coerce.number().int().positive(),
  }),
});

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
