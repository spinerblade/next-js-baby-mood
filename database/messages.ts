import type { Baby } from '@/migrations/00004-createTableBabies';
import type { Mood } from '@/migrations/00007-createTableMoods';
import type { MessageConversation } from '@/migrations/00013-createTableMessageConversations';
import type { Session } from '@/migrations/00014-createTableSessions';
import { cache } from 'react';
import { sql } from './connect';

export const createMoodMessage = cache(
  async (
    sessionToken: Session['token'],
    moodId: Mood['id'],
    babyId: Baby['id'],
  ) => {
    const [message] = await sql<MessageConversation[]>`
      INSERT INTO
        message_conversations (
          baby_id,
          conversation_id,
          sender_id,
          mood_id,
          emoji,
          content,
          mood_type_id
        )
      SELECT
        babies.id,
        conversations.id,
        sessions.user_id,
        moods.id,
        moods.emoji,
        moods.description,
        moods.mood_type_id
      FROM
        sessions
        INNER JOIN moods ON (
          moods.id = ${moodId}
          AND moods.user_id = sessions.user_id
        )
        INNER JOIN parent_connections ON (
          parent_connections.status = TRUE
          AND (
            parent_connections.user_one_id = sessions.user_id
            OR parent_connections.user_two_id = sessions.user_id
          )
        )
        INNER JOIN babies ON (
          babies.id = ${babyId}
          AND babies.parent_connection_id = parent_connections.id
        )
        INNER JOIN conversations ON (
          conversations.parent_connection_id = parent_connections.id
        )
      WHERE
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
      RETURNING
        id,
        baby_id,
        conversation_id,
        sender_id,
        quick_message_id,
        mood_id,
        emoji,
        content,
        mood_type_id,
        sent_at,
        is_read
    `;
    return message;
  },
);

export type MessageWithBabyName = MessageConversation & {
  babyName: string | null;
};

export const getMessages = cache(async (sessionToken: Session['token']) => {
  const messages = await sql<MessageWithBabyName[]>`
    SELECT
      message_conversations.id,
      message_conversations.baby_id,
      message_conversations.conversation_id,
      message_conversations.sender_id,
      message_conversations.quick_message_id,
      message_conversations.mood_id,
      message_conversations.emoji,
      message_conversations.content,
      message_conversations.mood_type_id,
      message_conversations.sent_at,
      message_conversations.is_read,
      babies.name AS baby_name
    FROM
      message_conversations
      INNER JOIN conversations ON (
        conversations.id = message_conversations.conversation_id
      )
      INNER JOIN parent_connections ON (
        parent_connections.id = conversations.parent_connection_id
        AND parent_connections.status = TRUE
      )
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
        AND (
          parent_connections.user_one_id = sessions.user_id
          OR parent_connections.user_two_id = sessions.user_id
        )
      )
      LEFT JOIN babies ON babies.id = message_conversations.baby_id
    ORDER BY
      message_conversations.sent_at,
      message_conversations.id
  `;
  return messages;
});
