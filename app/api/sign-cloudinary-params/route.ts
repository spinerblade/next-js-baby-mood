import { getValidSession } from '@/database/sessions';
import { getCookie } from '@/util/cookies';
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

export type CreateCloudinarySignaturePost =
  | {
      signature: string;
    }
  | {
      error: string;
    };

export async function POST(
  request: Request,
): Promise<NextResponse<CreateCloudinarySignaturePost>> {
  const sessionToken = await getCookie('sessionToken');
  const session = !!sessionToken && (await getValidSession(sessionToken));
  if (!session) {
    return NextResponse.json(
      { error: 'You need to be logged in' },
      { status: 401 },
    );
  }

  const secret = process.env.CLOUDINARY_API_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: 'Cloudinary not configured' },
      { status: 500 },
    );
  }

  const body = (await request.json()) as {
    paramsToSign: Record<string, string>;
  };
  const signature = cloudinary.utils.api_sign_request(
    body.paramsToSign,
    secret,
  );

  return NextResponse.json({ signature });
}
