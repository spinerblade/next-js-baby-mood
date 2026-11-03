'use server';

import { getUserData } from '@/database/users';

export async function partnerFormHandler(
  prevState: { message: string },
  formData: FormData,
) {
  const username = formData.get('partnerUsername');
  if (typeof username !== 'string') {
    return { message: 'Please enter a username.' };
  }
  const checkPartner = await getUserData(username);
  if (!checkPartner) {
    return { message: 'Your partner was not found.' };
  } else {
    return { message: 'Your partner exists and is already signed up.' };
  }
}

export async function babyFormHandler() {}
