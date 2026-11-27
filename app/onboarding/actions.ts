'use server';

import { getUser, getUserInsecure, updateUserNames } from '@/database/users';
import { userSchemaProfile } from '@/migrations/00000-createTableUsers';
import { partnerSchemaSearch } from '@/migrations/00003-createTableParentConnections';
import { getCookie } from '@/util/cookies';
import { revalidatePath } from 'next/cache';
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
    message: `${partnerUsername} exists and is already signed up! Do you want to send a request to connect?`,
  };
}

type ProfileFormState = { error?: string; success?: boolean };

export async function updateUserProfile(
  prevState: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  const sessionToken = await getCookie('sessionToken');
  if (!sessionToken) return { error: 'Not logged in' };

  const result = userSchemaProfile.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    birthDate: formData.get('birthDate'),
  });
  if (!result.success) return { error: result.error.issues[0]?.message };

  const user = await updateUserNames(
    sessionToken,
    result.data.firstName,
    result.data.lastName,
    result.data.birthDate,
  );
  if (!user) return { error: 'Could not update profile' };

  revalidatePath('/', 'layout');
  return { success: true };
}
