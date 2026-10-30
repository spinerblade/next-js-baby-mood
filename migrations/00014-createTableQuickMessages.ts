import type { Sql } from 'postgres';

export type QuickMessage = {
  id: number;
  userId: number;
  quickMessageTypeId: number;
  messageContent: string;
  createdAt: Date;
  updatedAt: Date;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE quick_messages(
      "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      "user_id" INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      "quick_message_type_id" INTEGER NOT NULL REFERENCES quick_message_types (id),
      "message_content" VARCHAR(255) NOT NULL,
      "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT now(),
      "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT now()
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE quick_messages
  `;
}
