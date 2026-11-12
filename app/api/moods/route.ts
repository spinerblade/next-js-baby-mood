import { createMood } from '@/database/moods';
import { getUser } from '@/database/users';
import { type Mood, moodSchema } from '@/migrations/00007-createTableMoods';
import { getCookie } from '@/util/cookies';
import { getCombinedErrorMessage } from '@/util/validation';
import { NextResponse } from 'next/server';

export type CreateMoodResponseBodyPost =
  | {
      mood: Mood;
    }
  | {
      error: string;
    };

export async function POST(
  request: Request,
): Promise<NextResponse<CreateMoodResponseBodyPost>> {
  const sessionToken = await getCookie('sessionToken');
  const currentUser = sessionToken && (await getUser(sessionToken));
  if (!currentUser) {
    return NextResponse.json(
      { error: 'You need to be logged in' },
      { status: 401 },
    );
  }
  const requestBody = await request.json();
  const result = moodSchema.safeParse(requestBody);
  if (!result.success) {
    return NextResponse.json(
      {
        error: getCombinedErrorMessage(result.error.issues),
      },
      {
        status: 400,
      },
    );
  }

  const mood = await createMood(
    sessionToken,
    result.data.mood.moodTypeId,
    result.data.mood.description,
    result.data.mood.emoji,
  );
  if (!mood) {
    return NextResponse.json(
      { error: 'Mood could not be created' },
      { status: 500 },
    );
  }
  return NextResponse.json(
    {
      mood: mood,
    },
    {
      status: 201,
    },
  );
}
