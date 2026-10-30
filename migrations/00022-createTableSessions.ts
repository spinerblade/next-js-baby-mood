import type { Sql } from 'postgres';

export type Session = {
  id: number;
  token: string;
  expiryTimestamp: Date;
  userId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE sessions(
      "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      "token" VARCHAR(255) NOT NULL UNIQUE,
      "expiry_timestamp" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT now() + interval '24 hours',
      "user_id" INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE sessions
  `;
}
