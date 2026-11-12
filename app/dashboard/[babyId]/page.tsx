import { getBabies, getBaby } from '@/database/babies';
import { getPartner } from '@/database/parentConnection';
import { getValidSession } from '@/database/sessions';
import { babyIdSchema } from '@/migrations/00004-createTableBabies';
import { getCookie } from '@/util/cookies';
import { notFound, redirect } from 'next/navigation';
import styles from '../dashboard.module.scss';
import MainInterface from '../MainInterface';
import Sidebar from '../Sidebar';

export const metadata = {
  title: 'Dashboard of your baby',
  description: 'The dashboard where the user sees all.',
};

export default async function BabyDashboardPage(
  props: PageProps<'/dashboard/[babyId]'>,
) {
  const { babyId } = await props.params;
  const sessionToken = await getCookie('sessionToken');
  const session = !!sessionToken && (await getValidSession(sessionToken));

  if (!session) {
    redirect(`/login?returnTo=/dashboard/${babyId}`);
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
  const partner = await getPartner(sessionToken);
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar baby={baby} babies={babies} partner={partner} />
      <main className={styles.mainContent}>
        <h1>Dashboard</h1>
        <MainInterface />
      </main>
    </div>
  );
}
