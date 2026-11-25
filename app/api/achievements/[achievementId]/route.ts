import { deleteAchievement, updateAchievement } from '@/database/achievements';
import {
  type Achievement,
  achievementIdSchema,
  achievementUpdateSchema,
} from '@/migrations/00005-createTableAchievements';
import { getCookie } from '@/util/cookies';
import { getCombinedErrorMessage } from '@/util/validation';
import { NextResponse } from 'next/server';

export type AchievementResponseBodyPut =
  | {
      achievement: Achievement;
    }
  | {
      error: string;
    };

export async function PUT(
  request: Request,
  context: RouteContext<'/api/achievements/[achievementId]'>,
): Promise<NextResponse<AchievementResponseBodyPut>> {
  const { achievementId } = await context.params;
  const idResult = achievementIdSchema.safeParse(achievementId);

  if (!idResult.success) {
    return NextResponse.json(
      { error: getCombinedErrorMessage(idResult.error.issues) },
      { status: 400 },
    );
  }

  const requestBody = await request.json();
  const result = achievementUpdateSchema.safeParse(requestBody);

  if (!result.success) {
    return NextResponse.json(
      { error: getCombinedErrorMessage(result.error.issues) },
      { status: 400 },
    );
  }

  const sessionToken = await getCookie('sessionToken');
  const achievement =
    !!sessionToken &&
    (await updateAchievement(
      sessionToken,
      idResult.data,
      result.data.achievement.description,
      result.data.achievement.date,
    ));

  if (!achievement) {
    return NextResponse.json(
      { error: 'Achievement not found' },
      { status: 404 },
    );
  }

  return NextResponse.json({ achievement: achievement }, { status: 200 });
}

export type AchievementResponseBodyDelete =
  | {
      achievement: Achievement;
    }
  | {
      error: string;
    };

export async function DELETE(
  request: Request,
  context: RouteContext<'/api/achievements/[achievementId]'>,
): Promise<NextResponse<AchievementResponseBodyDelete>> {
  const { achievementId } = await context.params;
  const idResult = achievementIdSchema.safeParse(achievementId);

  if (!idResult.success) {
    return NextResponse.json(
      { error: getCombinedErrorMessage(idResult.error.issues) },
      { status: 400 },
    );
  }

  const sessionToken = await getCookie('sessionToken');
  const achievement =
    !!sessionToken && (await deleteAchievement(sessionToken, idResult.data));

  if (!achievement) {
    return NextResponse.json(
      { error: 'Achievement not found' },
      { status: 404 },
    );
  }

  return NextResponse.json({ achievement: achievement }, { status: 200 });
}
