import { randomBytes } from 'node:crypto';
import { createSessionInsecure } from '@/database/sessions';
import { createUserInsecure, getUserInsecure } from '@/database/users';
import {
  type User,
  userSchemaSignUp,
} from '@/migrations/00000-createTableUsers';
import { secureCookieOptions } from '@/util/cookies';
import { getCombinedErrorMessage } from '@/util/validation';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

export type SignUpResponseBodyPost =
  | {
      user: Pick<User, 'id' | 'username' | 'email'>;
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
    result.data.user.email,
  );

  if (!user) {
    return NextResponse.json(
      {
        error: 'Creating user failed',
      },
      { status: 500 },
    );
  }

  const sessionToken = randomBytes(100).toString('base64');
  const session = await createSessionInsecure(sessionToken, user.id);

  if (!session) {
    return NextResponse.json(
      {
        error: 'Session creation failed',
      },
      { status: 500 },
    );
  }

  (await cookies()).set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });

  return NextResponse.json(
    {
      user: user,
    },
    { status: 201 },
  );
}
