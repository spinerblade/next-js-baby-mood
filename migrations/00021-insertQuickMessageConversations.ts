import type { Sql } from 'postgres';
import type { QuickMessageConversation } from './00020-createTableQuickMessageConversations';

export const quickMessageConversations: QuickMessageConversation[] = [
  {
    id: 1,
    babyId: 1,
    conversationId: 1,
    senderId: 1,
    quickMessageId: 1,
    moodId: null,
    sentAt: new Date('2026-10-20T07:30:00Z'),
    isRead: true,
  },
  {
    id: 2,
    babyId: 2,
    conversationId: 1,
    senderId: 2,
    quickMessageId: 2,
    moodId: 2,
    sentAt: new Date('2026-10-20T07:45:00Z'),
    isRead: true,
  },
  {
    id: 3,
    babyId: null,
    conversationId: 2,
    senderId: 1,
    quickMessageId: 4,
    moodId: 1,
    sentAt: new Date('2026-10-21T06:40:00Z'),
    isRead: false,
  },
  {
    id: 4,
    babyId: 4,
    conversationId: 2,
    senderId: 3,
    quickMessageId: 3,
    moodId: null,
    sentAt: new Date('2026-10-21T12:35:00Z'),
    isRead: false,
  },
];

export async function up(sql: Sql) {
  for (const quickMessageConversation of quickMessageConversations) {
    await sql`
      INSERT INTO
        quick_message_conversations (
          baby_id,
          conversation_id,
          sender_id,
          quick_message_id,
          mood_id,
          sent_at,
          is_read
        )
      VALUES
        (
          ${quickMessageConversation.babyId},
          ${quickMessageConversation.conversationId},
          ${quickMessageConversation.senderId},
          ${quickMessageConversation.quickMessageId},
          ${quickMessageConversation.moodId},
          ${quickMessageConversation.sentAt},
          ${quickMessageConversation.isRead}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const quickMessageConversation of quickMessageConversations) {
    await sql`
      DELETE FROM quick_message_conversations
      WHERE
        id = ${quickMessageConversation.id}
    `;
  }
}
