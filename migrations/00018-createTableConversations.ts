import type { Sql } from 'postgres';

export type Conversation = {
  id: number;
  parentConnectionId: number;
  createdAt: Date;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE conversations(
      "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      "parent_connection_id" INTEGER NOT NULL UNIQUE REFERENCES parent_connections (id) ON DELETE CASCADE,
      "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT now()
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE conversations
  `;
}
