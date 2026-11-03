import { cookies } from 'next/headers';

export const secureCookieOptions = {
  httpOnly: true,
  maxAge: 60 * 60 * 24,
  path: '/',
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
} as const;

export async function getCookie(name: string) {
  return (await cookies()).get(name)?.value;
}
