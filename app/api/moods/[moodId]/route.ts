import { deleteMood, updateMood } from '@/database/moods';
import {
  type Mood,
  moodIdSchema,
  moodSchema,
} from '@/migrations/00007-createTableMoods';
import { getCookie } from '@/util/cookies';
import { getCombinedErrorMessage } from '@/util/validation';
import { NextResponse } from 'next/server';

export type MoodResponseBodyDelete =
  | {
      mood: Mood;
    }
  | {
      error: string;
    };

export async function DELETE(
  request: Request,
  context: RouteContext<'/api/moods/[moodId]'>,
): Promise<NextResponse<MoodResponseBodyDelete>> {
  const { moodId } = await context.params;
  const result = moodIdSchema.safeParse(moodId);
  if (!result.success) {
    return NextResponse.json(
      { error: getCombinedErrorMessage(result.error.issues) },
      { status: 400 },
    );
  }
  const sessionToken = await getCookie('sessionToken');
  const mood = !!sessionToken && (await deleteMood(sessionToken, result.data));

  if (!mood) {
    return NextResponse.json({ error: 'Request not found' }, { status: 404 });
  }
  return NextResponse.json(
    {
      mood: mood,
    },
    { status: 200 },
  );
}

export type MoodResponseBodyPut =
  | {
      mood: Mood;
    }
  | {
      error: string;
    };

export async function PUT(
  request: Request,
  context: RouteContext<'/api/moods/[moodId]'>,
): Promise<NextResponse<MoodResponseBodyPut>> {
  const { moodId } = await context.params;
  const idResult = moodIdSchema.safeParse(moodId);
  if (!idResult.success) {
    return NextResponse.json(
      { error: getCombinedErrorMessage(idResult.error.issues) },
      { status: 400 },
    );
  }
  const responseBody = await request.json();
  const result = moodSchema.safeParse(responseBody);
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
  const sessionToken = await getCookie('sessionToken');
  const mood =
    !!sessionToken &&
    (await updateMood(
      sessionToken,
      idResult.data,
      result.data.mood.moodTypeId,
      result.data.mood.description,
      result.data.mood.emoji,
    ));

  if (!mood) {
    return NextResponse.json({ error: 'Mood not found' }, { status: 404 });
  }

  return NextResponse.json(
    {
      mood: mood,
    },
    {
      status: 200,
    },
  );
}
