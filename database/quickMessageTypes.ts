import type { QuickMessageType } from '@/migrations/00009-createTableQuickMessageTypes';
import type { Session } from '@/migrations/00014-createTableSessions';
import { cache } from 'react';
import { sql } from './connect';

export const getQuickMessageTypes = cache(
  async (sessionToken: Session['token']) => {
    const quickMessageTypes = await sql<QuickMessageType[]>`
      SELECT
        quick_message_types.id,
        quick_message_types.name
      FROM
        quick_message_types
        INNER JOIN sessions ON (
          sessions.token = ${sessionToken}
          AND sessions.expiry_timestamp > now()
        )
      ORDER BY
        quick_message_types.id
    `;
    return quickMessageTypes;
  },
);
