import { createAchievement } from '@/database/achievements';
import { getAcceptedParentConnection } from '@/database/parentConnection';
import { getUser } from '@/database/users';
import {
  type Achievement,
  achievementSchema,
} from '@/migrations/00005-createTableAchievements';
import { getCookie } from '@/util/cookies';
import { getCombinedErrorMessage } from '@/util/validation';
import { NextResponse } from 'next/server';

export type CreateAchievementResponseBodyPost =
  | {
      achievement: Achievement;
    }
  | {
      error: string;
    };

export async function POST(
  request: Request,
): Promise<NextResponse<CreateAchievementResponseBodyPost>> {
  const sessionToken = await getCookie('sessionToken');
  const currentUser = sessionToken && (await getUser(sessionToken));

  if (!currentUser) {
    return NextResponse.json(
      { error: 'You need to be logged in' },
      { status: 401 },
    );
  }
  const connection = await getAcceptedParentConnection(sessionToken);

  if (!connection) {
    return NextResponse.json(
      { error: 'You need to be connected to your partner first' },
      { status: 403 },
    );
  }

  const requestBody = await request.json();
  const result = achievementSchema.safeParse(requestBody);

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

  const achievement = await createAchievement(
    sessionToken,
    result.data.achievement.babyId,
    result.data.achievement.description,
    result.data.achievement.date,
  );

  if (!achievement) {
    return NextResponse.json(
      { error: 'Achievement could not be created' },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json(
    {
      achievement: achievement,
    },
    { status: 201 },
  );
}
