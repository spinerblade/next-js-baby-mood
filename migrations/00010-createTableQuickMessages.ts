import type { Sql } from 'postgres';
import z from 'zod';

export type QuickMessage = {
  id: number;
  userId: number;
  quickMessageTypeId: number;
  messageContent: string;
  createdAt: Date;
  updatedAt: Date;
};

export const quickMessageSchema = z.object({
  quickMessage: z.object({
    quickMessageTypeId: z.number().int().positive(),
    messageContent: z
      .string()
      .trim()
      .min(1, { error: 'Message must be minimum 1 character' })
      .max(100, { error: 'Message must be maximum 100 characters' }),
  }),
});

export const quickMessageIdSchema = z.coerce.number().int().positive();

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE quick_messages (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      quick_message_type_id integer NOT NULL REFERENCES quick_message_types (id),
      message_content varchar(255) NOT NULL,
      created_at timestamp(0) without time zone NOT NULL DEFAULT now(),
      updated_at timestamp(0) without time zone NOT NULL DEFAULT now()
    );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE quick_messages `;
}
