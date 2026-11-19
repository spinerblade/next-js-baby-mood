'use server';

import { updateBabyProfilePicture } from '@/database/babies';
import { updateUserProfilePicture } from '@/database/users';
import { babyIdSchema } from '@/migrations/00004-createTableBabies';
import { getCookie } from '@/util/cookies';
import { revalidatePath } from 'next/cache';
import z from 'zod';

const publicIdSchema = z.string().min(1).max(255);

export async function updateUserPicture(publicId: string) {
  const sessionToken = await getCookie('sessionToken');
  if (!sessionToken) return { error: 'Not logged in' };

  const result = publicIdSchema.safeParse(publicId);
  if (!result.success) return { error: 'Invalid image' };

  const user = await updateUserProfilePicture(sessionToken, result.data);
  if (!user) return { error: 'Could not update picture' };

  revalidatePath('/', 'layout');
}

export async function updateBabyPicture(babyId: number, publicId: string) {
  const sessionToken = await getCookie('sessionToken');
  if (!sessionToken) return { error: 'Not logged in' };

  const idResult = babyIdSchema.safeParse(babyId);
  const imageResult = publicIdSchema.safeParse(publicId);
  if (!idResult.success || !imageResult.success) {
    return { error: 'Invalid data' };
  }

  const baby = await updateBabyProfilePicture(
    sessionToken,
    idResult.data,
    imageResult.data,
  );
  if (!baby) {
    return { error: 'Baby not found' };
  }

  revalidatePath('/', 'layout');
}
