import {
  deleteQuickMessage,
  updateQuickMessage,
} from '@/database/quickMessages';
import {
  type QuickMessage,
  quickMessageIdSchema,
  quickMessageSchema,
} from '@/migrations/00010-createTableQuickMessages';
import { getCookie } from '@/util/cookies';
import { getCombinedErrorMessage } from '@/util/validation';
import { NextResponse } from 'next/server';

export type QuickMessageResponseBodyDelete =
  | {
      quickMessage: QuickMessage;
    }
  | {
      error: string;
    };

export async function DELETE(
  request: Request,
  context: RouteContext<'/api/quickMessages/[quickMessageId]'>,
): Promise<NextResponse<QuickMessageResponseBodyDelete>> {
  const { quickMessageId } = await context.params;
  const result = quickMessageIdSchema.safeParse(quickMessageId);
  if (!result.success) {
    return NextResponse.json(
      { error: getCombinedErrorMessage(result.error.issues) },
      { status: 400 },
    );
  }
  const sessionToken = await getCookie('sessionToken');
  const quickMessage =
    !!sessionToken && (await deleteQuickMessage(sessionToken, result.data));

  if (!quickMessage) {
    return NextResponse.json(
      { error: 'Quick message not found' },
      { status: 404 },
    );
  }
  return NextResponse.json({ quickMessage: quickMessage }, { status: 200 });
}

export type QuickMessageResponseBodyPut =
  | {
      quickMessage: QuickMessage;
    }
  | {
      error: string;
    };

export async function PUT(
  request: Request,
  context: RouteContext<'/api/quickMessages/[quickMessageId]'>,
): Promise<NextResponse<QuickMessageResponseBodyPut>> {
  const { quickMessageId } = await context.params;
  const idResult = quickMessageIdSchema.safeParse(quickMessageId);
  if (!idResult.success) {
    return NextResponse.json(
      { error: getCombinedErrorMessage(idResult.error.issues) },
      { status: 400 },
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
  const sessionToken = await getCookie('sessionToken');
  const quickMessage =
    !!sessionToken &&
    (await updateQuickMessage(
      sessionToken,
      idResult.data,
      result.data.quickMessage.quickMessageTypeId,
      result.data.quickMessage.messageContent,
    ));

  if (!quickMessage) {
    return NextResponse.json(
      { error: 'Quick message not found' },
      { status: 404 },
    );
  }
  return NextResponse.json({ quickMessage: quickMessage }, { status: 200 });
}
