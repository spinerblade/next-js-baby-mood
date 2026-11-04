'use server';
import { deleteSession } from '@/database/sessions';
import { getCookie } from '@/util/cookies';
import { cookies } from 'next/headers';

export async function logout() {
  const sessionToken = await getCookie('sessionToken');

  if (!sessionToken) {
    return;
  }

  await deleteSession(sessionToken);

  (await cookies()).delete('sessionToken');
}
