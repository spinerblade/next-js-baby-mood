import {
  acceptParentConnectionRequest,
  declineParentConnectionRequest,
} from '@/database/parentConnection';
import {
  type ParentConnection,
  parentConnectionIdSchema,
} from '@/migrations/00003-createTableParentConnections';
import { getCookie } from '@/util/cookies';
import { getCombinedErrorMessage } from '@/util/validation';
import { NextResponse } from 'next/server';

export type AcceptParentConnectionResponseBodyPut =
  | {
      connection: ParentConnection;
    }
  | {
      error: string;
    };
export type DeclineParentConnectionResponseBodyDelete =
  | {
      connection: ParentConnection;
    }
  | {
      error: string;
    };

export async function PUT(
  request: Request,
  context: RouteContext<'/api/parentConnections/[id]'>,
): Promise<NextResponse<AcceptParentConnectionResponseBodyPut>> {
  const { id } = await context.params;
  const result = parentConnectionIdSchema.safeParse(id);
  if (!result.success) {
    return NextResponse.json(
      { error: getCombinedErrorMessage(result.error.issues) },
      { status: 400 },
    );
  }

  const sessionToken = await getCookie('sessionToken');
  const connection =
    !!sessionToken &&
    (await acceptParentConnectionRequest(sessionToken, result.data));

  if (!connection) {
    return NextResponse.json({ error: 'Request not found' }, { status: 404 });
  }
  return NextResponse.json({ connection: connection }, { status: 200 });
}

export async function DELETE(
  request: Request,
  context: RouteContext<'/api/parentConnections/[id]'>,
): Promise<NextResponse<DeclineParentConnectionResponseBodyDelete>> {
  const { id } = await context.params;
  const result = parentConnectionIdSchema.safeParse(id);
  if (!result.success) {
    return NextResponse.json(
      { error: getCombinedErrorMessage(result.error.issues) },
      { status: 400 },
    );
  }

  const sessionToken = await getCookie('sessionToken');
  const connection =
    !!sessionToken &&
    (await declineParentConnectionRequest(sessionToken, result.data));

  if (!connection) {
    return NextResponse.json({ error: 'Request not found' }, { status: 404 });
  }
  return NextResponse.json({ connection: connection }, { status: 200 });
}
