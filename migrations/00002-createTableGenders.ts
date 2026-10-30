import type { Sql } from 'postgres';

export type Gender = {
  id: number;
  type: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE genders(
      "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      "type" VARCHAR(255) NOT NULL UNIQUE
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE genders
  `;
}
