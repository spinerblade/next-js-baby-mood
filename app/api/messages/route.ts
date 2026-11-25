import {
  createMoodMessage,
  createQuickMessageMessage,
} from '@/database/messages';
import { getUser } from '@/database/users';
import {
  type MessageConversation,
  messageSchema,
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
  const result = messageSchema.safeParse(requestBody);
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

  const data = result.data.message;
  const message =
    'moodId' in data
      ? await createMoodMessage(sessionToken, data.moodId, data.babyId)
      : await createQuickMessageMessage(sessionToken, data.quickMessageId);

  if (!message) {
    return NextResponse.json(
      { error: 'Message could not be sent' },
      { status: 404 },
    );
  }
  return NextResponse.json({ message: message }, { status: 201 });
}
