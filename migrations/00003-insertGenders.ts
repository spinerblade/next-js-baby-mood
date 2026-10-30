import type { Sql } from 'postgres';
import type { Gender } from './00002-createTableGenders';

export const genders: Gender[] = [
  { id: 1, type: 'male' },
  { id: 2, type: 'female' },
  { id: 3, type: 'other' },
];

export async function up(sql: Sql) {
  for (const gender of genders) {
    await sql`
      INSERT INTO
        genders (type)
      VALUES
        (${gender.type})
    `;
  }
}

export async function down(sql: Sql) {
  for (const gender of genders) {
    await sql`
      DELETE FROM genders
      WHERE
        id = ${gender.id}
    `;
  }
}
