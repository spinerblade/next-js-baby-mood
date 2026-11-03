import type { Baby } from '@/migrations/00003-createTableBabies';
import { cache } from 'react';
import { sql } from './connect';

export const getAllBabyData = cache(async () => {
  const babies = await sql<Baby[]>`
  SELECT
  *
  FROM
  babies
  ORDER BY
  id
  `;
  return babies;
});

export const getBabyData = cache(async (id: number) => {
  const [baby] = await sql<Baby[]>`
  SELECT
  *
  FROM
  babies
  WHERE
  id = ${id}
  `;
  return baby;
});
