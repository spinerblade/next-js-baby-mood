import { getAchievements } from '@/database/achievements';
import { getBabies, getBaby } from '@/database/babies';
import { getValidSession } from '@/database/sessions';
import { babyIdSchema } from '@/migrations/00004-createTableBabies';
import { getCookie } from '@/util/cookies';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import AchievementForm from '../AchievementForm';
import Chart from '../Chart';

export const metadata = {
  title: 'Achievement of your Baby',
  description: 'The achievements of the baby displayed in a chart',
};

export default async function BabyAchievementPage(
  props: PageProps<'/achievements/[babyId]'>,
) {
  const { babyId } = await props.params;
  const sessionToken = await getCookie('sessionToken');
  const session = !!sessionToken && (await getValidSession(sessionToken));

  if (!session) {
    redirect(`/login?returnTo=/achievements/${babyId}`);
  }
  const result = babyIdSchema.safeParse(babyId);
  if (!result.success) {
    notFound();
  }

  const baby = await getBaby(sessionToken, result.data);
  if (!baby) {
    notFound();
  }
  const babies = await getBabies(sessionToken);
  const achievements = await getAchievements(sessionToken, baby.id);
  return (
    <>
      <ul>
        {babies.map((babySwap) => (
          <li key={babySwap.id}>
            <Link href={`/achievements/${babySwap.id}`}>{babySwap.name}</Link>
          </li>
        ))}
      </ul>
      <Chart />
      <AchievementForm babyId={baby.id} />
      <ul>
        {achievements.map((achievement) => (
          <li key={achievement.id}>
            {achievement.description} {achievement.date.toLocaleDateString()}
          </li>
        ))}
      </ul>
    </>
  );
}
