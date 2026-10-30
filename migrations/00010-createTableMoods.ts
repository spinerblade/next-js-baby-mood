import type { Sql } from 'postgres';

export type Mood = {
  id: number;
  userId: number;
  moodTypeId: number;
  mood: string;
  emoji: string;
  createdAt: Date;
  updatedAt: Date;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE moods(
      "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      "user_id" INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      "mood_type_id" INTEGER NOT NULL REFERENCES mood_types (id),
      "mood" VARCHAR(255) NOT NULL,
      "emoji" VARCHAR(255) NOT NULL,
      "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT now(),
      "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT now()
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE moods
  `;
}
