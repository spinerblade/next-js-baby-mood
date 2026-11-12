import { getBabies } from '@/database/babies';
import { getValidSession } from '@/database/sessions';
import { getCookie } from '@/util/cookies';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Achievements',
  description: 'The achievements of the baby displayed in a chart',
};

export default async function AchievementPage() {
  const sessionToken = await getCookie('sessionToken');
  const session = !!sessionToken && (await getValidSession(sessionToken));

  if (!session) {
    redirect('/login?returnTo=/achievements');
  }

  const babies = await getBabies(sessionToken);
  if (babies.length === 0) {
    redirect('/onboarding');
  }
  redirect(`/achievements/${babies[0]?.id}`);
}
