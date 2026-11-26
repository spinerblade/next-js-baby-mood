import type { Sql } from 'postgres';

export type Conversation = {
  id: number;
  parentConnectionId: number;
  createdAt: Date;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE conversations (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      parent_connection_id integer NOT NULL UNIQUE REFERENCES parent_connections (id) ON DELETE CASCADE,
      created_at timestamp(0) without time zone NOT NULL DEFAULT now()
    );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE conversations `;
}
