import type { Sql } from 'postgres';

export type QuickMessageConversation = {
  id: number;
  babyId: number | null;
  conversationId: number;
  senderId: number;
  quickMessageId: number | null;
  moodId: number | null;
  sentAt: Date;
  isRead: boolean;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE quick_message_conversations(
      "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      "baby_id" INTEGER NULL REFERENCES babies (id) ON DELETE SET NULL,
      "conversation_id" INTEGER NOT NULL REFERENCES conversations (id) ON DELETE CASCADE,
      "sender_id" INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      "quick_message_id" INTEGER NULL REFERENCES quick_messages (id) ON DELETE SET NULL,
      "mood_id" INTEGER NULL REFERENCES moods (id) ON DELETE SET NULL,
      "sent_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT now(),
      "is_read" BOOLEAN NOT NULL DEFAULT false
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE quick_message_conversations
  `;
}
