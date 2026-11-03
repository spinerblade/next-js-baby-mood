import type { Sql } from 'postgres';

export type MoodType = {
  id: number;
  name: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE mood_types(
      "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      "name" VARCHAR(255) NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE mood_types
  `;
}
