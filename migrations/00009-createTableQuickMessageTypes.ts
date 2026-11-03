import type { Sql } from 'postgres';

export type QuickMessageType = {
  id: number;
  name: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE quick_message_types(
      "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      "name" VARCHAR(255) NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE quick_message_types
  `;
}
