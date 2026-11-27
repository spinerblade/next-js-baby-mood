import { getValidSession } from '@/database/sessions';
import { getCookie } from '@/util/cookies';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'BabyMood',
  description: 'Landing page of the app',
};

export default async function HomePage() {
  const sessionToken = await getCookie('sessionToken');
  const session = !!sessionToken && (await getValidSession(sessionToken));

  if (session) {
    redirect('/dashboard');
  }
  redirect('/login');
}
