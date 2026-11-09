import { getBabies } from '@/database/babies';
import { getValidSession } from '@/database/sessions';
import { getCookie } from '@/util/cookies';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Dashboard',
  description: 'The dashboard where the user sees all.',
};

export default async function DashboardPage() {
  const sessionToken = await getCookie('sessionToken');
  const session = !!sessionToken && (await getValidSession(sessionToken));

  if (!session) {
    redirect('/login?returnTo=/dashboard');
  }

  const babies = await getBabies(sessionToken);
  if (babies.length === 0) {
    redirect('/onboarding');
  }
  redirect(`/dashboard/${babies[0]?.id}`);
}
