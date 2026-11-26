import { createQuickMessage } from '@/database/quickMessages';
import { getUser } from '@/database/users';
import {
  type QuickMessage,
  quickMessageSchema,
} from '@/migrations/00011-createTableQuickMessages';
import { getCookie } from '@/util/cookies';
import { getCombinedErrorMessage } from '@/util/validation';
import { NextResponse } from 'next/server';

export type CreateQuickMessageResponseBodyPost =
  | {
      quickMessage: QuickMessage;
    }
  | {
      error: string;
    };

export async function POST(
  request: Request,
): Promise<NextResponse<CreateQuickMessageResponseBodyPost>> {
  const sessionToken = await getCookie('sessionToken');
  const currentUser = sessionToken && (await getUser(sessionToken));
  if (!currentUser) {
    return NextResponse.json(
      { error: 'You need to be logged in' },
      { status: 401 },
    );
  }
  const requestBody = await request.json();
  const result = quickMessageSchema.safeParse(requestBody);
  if (!result.success) {
    return NextResponse.json(
      { error: getCombinedErrorMessage(result.error.issues) },
      { status: 400 },
    );
  }

  const quickMessage = await createQuickMessage(
    sessionToken,
    result.data.quickMessage.quickMessageTypeId,
    result.data.quickMessage.messageContent,
  );
  if (!quickMessage) {
    return NextResponse.json(
      { error: 'Quick message could not be created' },
      { status: 500 },
    );
  }
  return NextResponse.json({ quickMessage: quickMessage }, { status: 201 });
}
