import { createUserInsecure, getUserInsecure } from '@/database/users';
import {
  type User,
  userSchemaSignUp,
} from '@/migrations/00000-createTableUsers';
import { getCombinedErrorMessage } from '@/util/validation';
import bcrypt from 'bcrypt';
import { type NextRequest, NextResponse } from 'next/server';

export type SignUpResponseBodyPost =
  | {
      user: User;
    }
  | {
      error: string;
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<SignUpResponseBodyPost>> {
  const requestBody = await request.json();
  const result = userSchemaSignUp.safeParse(requestBody);

  if (!result.success) {
    return NextResponse.json(
      {
        error: getCombinedErrorMessage(result.error.issues),
      },
      { status: 400 },
    );
  }

  const existingUser = await getUserInsecure(result.data.user.username);

  if (existingUser) {
    return NextResponse.json(
      {
        error: 'Username already exits',
      },
      { status: 400 },
    );
  }

  const passwordHash = await bcrypt.hash(result.data.user.password, 12);

  const user = await createUserInsecure(
    result.data.user.username,
    passwordHash,
  );

  if (!user) {
    return NextResponse.json(
      {
        error: 'Creating user failed',
      },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      user: user,
    },
    { status: 201 },
  );
}
