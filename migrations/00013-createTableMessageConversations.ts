import type { Sql } from 'postgres';
import z from 'zod';

export type MessageConversation = {
  id: number;
  babyId: number | null;
  conversationId: number;
  senderId: number;
  quickMessageId: number | null;
  moodId: number | null;
  emoji: string | null;
  content: string;
  moodTypeId: number | null;
  sentAt: Date;
  isRead: boolean;
};

export const moodMessageSchema = z.object({
  message: z.object({
    moodId: z.number().int().positive(),
    babyId: z.number().int().positive(),
  }),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE message_conversations (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      baby_id integer NULL REFERENCES babies (id) ON DELETE SET NULL,
      conversation_id integer NOT NULL REFERENCES conversations (id) ON DELETE CASCADE,
      sender_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      quick_message_id integer NULL REFERENCES quick_messages (id) ON DELETE SET NULL,
      mood_id integer NULL REFERENCES moods (id) ON DELETE SET NULL,
      emoji varchar(255) NULL,
      content varchar(255) NOT NULL,
      mood_type_id integer NULL REFERENCES mood_types (id),
      sent_at timestamp(0) without time zone NOT NULL DEFAULT now(),
      is_read boolean NOT NULL DEFAULT FALSE
    );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE message_conversations `;
}
