import type { Sql } from 'postgres';
import type { QuickMessageType } from './00012-createTableQuickMessageTypes';

export const quickMessageTypes: QuickMessageType[] = [
  { id: 1, name: 'greeting' },
  { id: 2, name: 'support' },
  { id: 3, name: 'question' },
];

export async function up(sql: Sql) {
  for (const quickMessageType of quickMessageTypes) {
    await sql`
      INSERT INTO
        quick_message_types (name)
      VALUES
        (${quickMessageType.name})
    `;
  }
}

export async function down(sql: Sql) {
  for (const quickMessageType of quickMessageTypes) {
    await sql`
      DELETE FROM quick_message_types
      WHERE
        id = ${quickMessageType.id}
    `;
  }
}
