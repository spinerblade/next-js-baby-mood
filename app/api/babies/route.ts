import { createBaby } from '@/database/babies';
import { getAcceptedParentConnection } from '@/database/parentConnection';
import { getUser } from '@/database/users';
import { type Baby, babySchema } from '@/migrations/00004-createTableBabies';
import { getCookie } from '@/util/cookies';
import { getCombinedErrorMessage } from '@/util/validation';
import { NextResponse } from 'next/server';

export type CreateBabyResponseBodyPost =
  | {
      baby: Baby;
    }
  | {
      error: string;
    };

export async function POST(
  request: Request,
): Promise<NextResponse<CreateBabyResponseBodyPost>> {
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
  const result = babySchema.safeParse(requestBody);

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

  const baby = await createBaby(
    sessionToken,
    connection.id,
    result.data.baby.name,
    result.data.baby.birthDate,
    result.data.baby.weight,
    result.data.baby.height,
    result.data.baby.genderId,
    null,
  );

  if (!baby) {
    return NextResponse.json(
      { error: 'Baby could not be created' },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json(
    {
      baby: baby,
    },
    { status: 201 },
  );
}
