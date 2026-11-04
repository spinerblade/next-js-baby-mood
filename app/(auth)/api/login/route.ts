import { randomBytes } from 'node:crypto';
import { createSessionInsecure } from '@/database/sessions';
import { getUserWithPasswordHashInsecure } from '@/database/users';
import {
  type User,
  userSchemaLogin,
} from '@/migrations/00000-createTableUsers';
import { secureCookieOptions } from '@/util/cookies';
import { getCombinedErrorMessage } from '@/util/validation';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

export type LoginResponseBodyPost =
  | {
      user: Pick<User, 'id' | 'username'>;
    }
  | {
      error: string;
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<LoginResponseBodyPost>> {
  const requestBody = await request.json();

  const result = userSchemaLogin.safeParse(requestBody);
  if (!result.success) {
    return NextResponse.json(
      {
        error: getCombinedErrorMessage(result.error.issues),
      },
      { status: 400 },
    );
  }

  const userWithPasswordHash = await getUserWithPasswordHashInsecure(
    result.data.user.username,
  );
  if (!userWithPasswordHash) {
    return NextResponse.json(
      { error: 'Username or password invalid' },
      { status: 401 },
    );
  }

  const isPasswordValid = await bcrypt.compare(
    result.data.user.password,
    userWithPasswordHash.passwordHash,
  );

  userWithPasswordHash.passwordHash = '';

  if (!isPasswordValid) {
    return NextResponse.json(
      {
        error: 'Username or password invalid',
      },
      { status: 401 },
    );
  }

  const sessionToken = randomBytes(100).toString('base64');

  const session = await createSessionInsecure(
    sessionToken,
    userWithPasswordHash.id,
  );

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

  return NextResponse.json({
    user: {
      id: userWithPasswordHash.id,
      username: userWithPasswordHash.username,
    },
  });
}
