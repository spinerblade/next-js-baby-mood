import type { Sql } from 'postgres';
import z from 'zod';

export type ParentConnection = {
  id: number;
  userOneId: number;
  userTwoId: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const partnerSchemaSearch = z.object({
  partnerUsername: z
    .string({ error: 'Please enter a string only' })
    .trim()
    .min(3, { error: 'Username must be minimum 3 characters' })
    .max(20, { error: 'Username must be maximum 20 characters' }),
});

export const parentConnectionIdSchema = z.coerce
  .number({ error: 'Invalid request id' })
  .int({ error: 'Invalid request id' })
  .positive({ error: 'Invalid request id' });

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE parent_connections(
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_one_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      user_two_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      status BOOLEAN NOT NULL,
      created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT now(),
      updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT now(),
      UNIQUE (user_one_id, user_two_id)
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE parent_connections
  `;
}
