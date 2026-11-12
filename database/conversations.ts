import type { Conversation } from '@/migrations/00012-createTableConversations';
import { sql } from './connect';

export async function createConversationInsecure(
  parentConnectionId: Conversation['parentConnectionId'],
) {
  const [conversation] = await sql<Conversation[]>`
    INSERT INTO
      conversations (parent_connection_id)
    VALUES
      (
        ${parentConnectionId}
      )
    ON CONFLICT (parent_connection_id) DO NOTHING
    RETURNING
      id,
      parent_connection_id,
      created_at
  `;
  return conversation;
}
