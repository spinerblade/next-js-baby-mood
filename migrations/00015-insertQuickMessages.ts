import type { Sql } from 'postgres';
import type { QuickMessage } from './00014-createTableQuickMessages';

export const quickMessages: QuickMessage[] = [
  {
    id: 1,
    userId: 1,
    quickMessageTypeId: 1,
    messageContent: 'Good morning! How did the night go?',
    createdAt: new Date('2026-09-02T07:00:00Z'),
    updatedAt: new Date('2026-09-02T07:00:00Z'),
  },
  {
    id: 2,
    userId: 2,
    quickMessageTypeId: 2,
    messageContent: 'Hang in there, it gets easier ❤️',
    createdAt: new Date('2026-09-15T21:10:00Z'),
    updatedAt: new Date('2026-09-15T21:10:00Z'),
  },
  {
    id: 3,
    userId: 3,
    quickMessageTypeId: 3,
    messageContent: 'Any suggestion for dinner?',
    createdAt: new Date('2026-10-11T10:00:00Z'),
    updatedAt: new Date('2026-10-11T10:00:00Z'),
  },
  {
    id: 4,
    userId: 1,
    quickMessageTypeId: 2,
    messageContent: 'Coffee and solidarity',
    createdAt: new Date('2026-10-12T06:30:00Z'),
    updatedAt: new Date('2026-10-12T06:30:00Z'),
  },
  {
    id: 5,
    userId: 4,
    quickMessageTypeId: 1,
    messageContent: 'Good morning, have a wonderful day!',
    createdAt: new Date('2026-10-22T11:30:00Z'),
    updatedAt: new Date('2026-10-22T11:30:00Z'),
  },
];

export async function up(sql: Sql) {
  for (const quickMessage of quickMessages) {
    await sql`
      INSERT INTO
        quick_messages (
          user_id,
          quick_message_type_id,
          message_content,
          created_at,
          updated_at
        )
      VALUES
        (
          ${quickMessage.userId},
          ${quickMessage.quickMessageTypeId},
          ${quickMessage.messageContent},
          ${quickMessage.createdAt},
          ${quickMessage.updatedAt}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const quickMessage of quickMessages) {
    await sql`
      DELETE FROM quick_messages
      WHERE
        id = ${quickMessage.id}
    `;
  }
}
