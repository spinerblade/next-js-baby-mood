import type { QuickMessage } from '@/migrations/00010-createTableQuickMessages';
import type { Session } from '@/migrations/00014-createTableSessions';
import { cache } from 'react';
import { sql } from './connect';

export const createQuickMessage = cache(
  async (
    sessionToken: Session['token'],
    quickMessageTypeId: QuickMessage['quickMessageTypeId'],
    messageContent: QuickMessage['messageContent'],
  ) => {
    const [quickMessage] = await sql<QuickMessage[]>`
      INSERT INTO
        quick_messages (
          user_id,
          quick_message_type_id,
          message_content
        )
      SELECT
        sessions.user_id,
        ${quickMessageTypeId},
        ${messageContent}
      FROM
        sessions
      WHERE
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
      RETURNING
        id,
        user_id,
        quick_message_type_id,
        message_content,
        created_at,
        updated_at
    `;
    return quickMessage;
  },
);

export const getQuickMessages = cache(
  async (sessionToken: Session['token']) => {
    const quickMessages = await sql<QuickMessage[]>`
      SELECT
        quick_messages.id,
        quick_messages.user_id,
        quick_messages.quick_message_type_id,
        quick_messages.message_content,
        quick_messages.created_at,
        quick_messages.updated_at
      FROM
        quick_messages
        INNER JOIN sessions ON (
          sessions.token = ${sessionToken}
          AND sessions.expiry_timestamp > now()
          AND sessions.user_id = quick_messages.user_id
        )
      ORDER BY
        quick_messages.created_at
    `;
    return quickMessages;
  },
);

export const getQuickMessage = cache(
  async (
    sessionToken: Session['token'],
    quickMessageId: QuickMessage['id'],
  ) => {
    const [quickMessage] = await sql<QuickMessage[]>`
      SELECT
        quick_messages.id,
        quick_messages.user_id,
        quick_messages.quick_message_type_id,
        quick_messages.message_content,
        quick_messages.created_at,
        quick_messages.updated_at
      FROM
        quick_messages
        INNER JOIN sessions ON (
          sessions.token = ${sessionToken}
          AND sessions.expiry_timestamp > now()
          AND sessions.user_id = quick_messages.user_id
        )
      WHERE
        quick_messages.id = ${quickMessageId}
    `;
    return quickMessage;
  },
);

export const updateQuickMessage = cache(
  async (
    sessionToken: Session['token'],
    quickMessageId: QuickMessage['id'],
    quickMessageTypeId: QuickMessage['quickMessageTypeId'],
    messageContent: QuickMessage['messageContent'],
  ) => {
    const [quickMessage] = await sql<QuickMessage[]>`
      UPDATE quick_messages
      SET
        quick_message_type_id = ${quickMessageTypeId},
        message_content = ${messageContent},
        updated_at = now()
      FROM
        sessions
      WHERE
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
        AND quick_messages.id = ${quickMessageId}
        AND sessions.user_id = quick_messages.user_id
      RETURNING
        quick_messages.id,
        quick_messages.user_id,
        quick_messages.quick_message_type_id,
        quick_messages.message_content,
        quick_messages.created_at,
        quick_messages.updated_at
    `;
    return quickMessage;
  },
);

export const deleteQuickMessage = cache(
  async (
    sessionToken: Session['token'],
    quickMessageId: QuickMessage['id'],
  ) => {
    const [quickMessage] = await sql<QuickMessage[]>`
      DELETE FROM quick_messages USING sessions
      WHERE
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
        AND quick_messages.id = ${quickMessageId}
        AND quick_messages.user_id = sessions.user_id
      RETURNING
        quick_messages.id,
        quick_messages.user_id,
        quick_messages.quick_message_type_id,
        quick_messages.message_content,
        quick_messages.created_at,
        quick_messages.updated_at
    `;
    return quickMessage;
  },
);
