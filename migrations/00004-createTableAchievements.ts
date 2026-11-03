import type { Sql } from 'postgres';

export type Achievement = {
  id: number;
  babyId: number;
  achievement: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE achievements(
      "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      "baby_id" INTEGER NOT NULL REFERENCES babies (id) ON DELETE CASCADE,
      "achievement" VARCHAR(255) NOT NULL,
      "date" DATE NOT NULL,
      "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT now(),
      "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT now()
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE achievements
  `;
}
