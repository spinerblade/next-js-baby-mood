'use server';

import { getUser, getUserInsecure } from '@/database/users';
import { partnerSchemaSearch } from '@/migrations/00003-createTableParentConnections';
import { getCookie } from '@/util/cookies';
import { redirect } from 'next/navigation';

export async function partnerFormHandler(
  prevState: { partnerUsername?: string; message?: string },
  formData: FormData,
) {
  const sessionToken = await getCookie('sessionToken');
  const currentUser = sessionToken && (await getUser(sessionToken));
  if (!currentUser) {
    redirect('/login?returnTo=/onboarding');
  }

  const result = partnerSchemaSearch.safeParse({
    partnerUsername: formData.get('partnerUsername'),
  });
  if (!result.success) {
    return { message: result.error.issues[0]?.message };
  }
  const partnerUsername = result.data.partnerUsername;

  const partner = await getUserInsecure(partnerUsername);
  if (!partner) return { message: 'Your partner was not found.' };
  if (partner.id === currentUser.id) {
    return { message: 'You can not connect to yourself.' };
  }

  return {
    partnerUsername: partner.username,
    message: `${partnerUsername} exists and is already signed up. Want to send a request to connect?`,
  };
}
