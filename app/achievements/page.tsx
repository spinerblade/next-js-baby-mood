import { getAchievements } from '@/database/achievements';
import { getValidSession } from '@/database/sessions';
import { getCookie } from '@/util/cookies';
import { getSelectedBaby } from '@/util/selectedBaby';
import { redirect } from 'next/navigation';
import AchievementForm from './AchievementForm';
import Timeline from './Timeline';

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

  const baby = await getSelectedBaby(sessionToken);
  if (!baby) {
    redirect('/onboarding');
  }

  const achievements = await getAchievements(sessionToken, baby.id);
  return (
    <>
      <Timeline achievements={achievements} />
      <AchievementForm babyId={baby.id} />
    </>
  );
}
