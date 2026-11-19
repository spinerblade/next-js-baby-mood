'use server';

import { getBaby } from '@/database/babies';
import { type Baby, babyIdSchema } from '@/migrations/00004-createTableBabies';
import { getCookie, secureCookieOptions } from '@/util/cookies';
import { cookies } from 'next/headers';

export async function selectBaby(babyId: Baby['id']) {
  const sessionToken = await getCookie('sessionToken');
  if (!sessionToken) {
    return { error: 'Not logged in' };
  }
  const result = babyIdSchema.safeParse(babyId);
  if (!result.success) {
    return { error: 'Invalid baby id' };
  }

  const baby = await getBaby(sessionToken, result.data);
  if (!baby) {
    return { error: 'Baby not found' };
  }
  (await cookies()).set('selectedBabyId', String(baby.id), {
    ...secureCookieOptions,
    maxAge: 60 * 60 * 24 * 7,
  });
}
