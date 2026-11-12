import { createMoodMessage } from '@/database/messages';
import { getUser } from '@/database/users';
import {
  type MessageConversation,
  moodMessageSchema,
} from '@/migrations/00013-createTableMessageConversations';
import { getCookie } from '@/util/cookies';
import { getCombinedErrorMessage } from '@/util/validation';
import { NextResponse } from 'next/server';

export type CreateMessageConversationResponseBodyPost =
  | {
      message: MessageConversation;
    }
  | {
      error: string;
    };

export async function POST(
  request: Request,
): Promise<NextResponse<CreateMessageConversationResponseBodyPost>> {
  const sessionToken = await getCookie('sessionToken');
  const currentUser = sessionToken && (await getUser(sessionToken));
  if (!currentUser) {
    return NextResponse.json(
      { error: 'You need to be logged in' },
      { status: 401 },
    );
  }
  const requestBody = await request.json();
  const result = moodMessageSchema.safeParse(requestBody);
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

  const moodMessage = await createMoodMessage(
    sessionToken,
    result.data.message.moodId,
    result.data.message.babyId,
  );
  if (!moodMessage) {
    return NextResponse.json(
      { error: 'Mood or baby not found' },
      { status: 404 },
    );
  }
  return NextResponse.json(
    {
      message: moodMessage,
    },
    {
      status: 201,
    },
  );
}
