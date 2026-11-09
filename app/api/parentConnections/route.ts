import {
  createParentConnectionRequest,
  getAcceptedParentConnection,
  getAcceptedParentConnectionInsecure,
  getParentConnectionInsecure,
} from '@/database/parentConnection';
import { getUser, getUserInsecure } from '@/database/users';
import {
  type ParentConnection,
  partnerSchemaSearch,
} from '@/migrations/00003-createTableParentConnections';
import { getCookie } from '@/util/cookies';
import { getCombinedErrorMessage } from '@/util/validation';
import { NextResponse } from 'next/server';

export type CreateParentConnectionResponseBodyPost =
  | {
      parentConnectionRequest: ParentConnection;
    }
  | {
      error: string;
    };

export async function POST(
  request: Request,
): Promise<NextResponse<CreateParentConnectionResponseBodyPost>> {
  const sessionToken = await getCookie('sessionToken');
  const currentUser = sessionToken && (await getUser(sessionToken));

  if (!currentUser) {
    return NextResponse.json(
      { error: 'You need to be logged in' },
      { status: 401 },
    );
  }

  const requestBody = await request.json();

  const result = partnerSchemaSearch.safeParse(requestBody);

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

  const partner = await getUserInsecure(result.data.partnerUsername);

  if (!partner) {
    return NextResponse.json(
      { error: 'Your partner was not found' },
      { status: 404 },
    );
  }

  if (partner.id === currentUser.id) {
    return NextResponse.json(
      { error: 'You can not connect to yourself' },
      { status: 400 },
    );
  }

  const existingConnection = await getParentConnectionInsecure(
    currentUser.id,
    partner.id,
  );

  if (existingConnection) {
    return NextResponse.json(
      { error: 'A request or connection with this user already exists' },
      { status: 400 },
    );
  }

  const senderConnection = await getAcceptedParentConnection(sessionToken);

  if (senderConnection) {
    return NextResponse.json(
      { error: 'You are already connected to a partner' },
      { status: 400 },
    );
  }

  const partnerConnection = await getAcceptedParentConnectionInsecure(
    partner.id,
  );

  if (partnerConnection) {
    return NextResponse.json(
      { error: 'This user is already connected to a partner' },
      { status: 400 },
    );
  }

  const parentConnectionRequest = await createParentConnectionRequest(
    sessionToken,
    partner.id,
  );

  if (!parentConnectionRequest) {
    return NextResponse.json(
      { error: 'Request could not be sent' },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json(
    {
      parentConnectionRequest: parentConnectionRequest,
    },
    { status: 201 },
  );
}
