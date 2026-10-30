import type { Sql } from 'postgres';
import type { Conversation } from './00018-createTableConversations';

export const conversations: Conversation[] = [
  {
    id: 1,
    parentConnectionId: 1,
    createdAt: new Date('2026-09-15T12:00:00Z'),
  },
  {
    id: 2,
    parentConnectionId: 2,
    createdAt: new Date('2026-10-11T09:30:00Z'),
  },
];

export async function up(sql: Sql) {
  for (const conversation of conversations) {
    await sql`
      INSERT INTO
        conversations (parent_connection_id, created_at)
      VALUES
        (
          ${conversation.parentConnectionId},
          ${conversation.createdAt}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const conversation of conversations) {
    await sql`
      DELETE FROM conversations
      WHERE
        id = ${conversation.id}
    `;
  }
}
