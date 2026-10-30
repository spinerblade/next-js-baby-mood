import type { Sql } from 'postgres';
import type { ParentConnection } from './00016-createTableParentConnections';

export const parentConnections: ParentConnection[] = [
  {
    id: 1,
    userOneId: 1,
    userTwoId: 2,
    status: true,
    createdAt: new Date('2026-09-15T10:00:00Z'),
    updatedAt: new Date('2026-09-15T12:00:00Z'),
  },
  {
    id: 2,
    userOneId: 1,
    userTwoId: 3,
    status: true,
    createdAt: new Date('2026-10-11T09:00:00Z'),
    updatedAt: new Date('2026-10-11T09:30:00Z'),
  },
  {
    id: 3,
    userOneId: 3,
    userTwoId: 4,
    status: false,
    createdAt: new Date('2026-10-23T08:00:00Z'),
    updatedAt: new Date('2026-10-23T08:00:00Z'),
  },
];

export async function up(sql: Sql) {
  for (const parentConnection of parentConnections) {
    await sql`
      INSERT INTO
        parent_connections (
          user_one_id,
          user_two_id,
          status,
          created_at,
          updated_at
        )
      VALUES
        (
          ${parentConnection.userOneId},
          ${parentConnection.userTwoId},
          ${parentConnection.status},
          ${parentConnection.createdAt},
          ${parentConnection.updatedAt}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const parentConnection of parentConnections) {
    await sql`
      DELETE FROM parent_connections
      WHERE
        id = ${parentConnection.id}
    `;
  }
}
