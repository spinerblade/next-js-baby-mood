import type { Sql } from 'postgres';
import type { User } from './00000-createTableUsers';

export type Session = {
  id: number;
  token: string;
  expiryTimestamp: Date;
  userId: User['id'];
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE sessions(
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      token VARCHAR(200) NOT NULL UNIQUE,
      expiry_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now() + interval '24 hours',
      user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE sessions
  `;
}
