import { getValidSession } from '@/database/sessions';
import { getCookie } from '@/util/cookies';
import { redirect } from 'next/navigation';
import styles from './dashboard.module.scss';
import MainInterface from './MainInterface';
import Sidebar from './Sidebar';

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
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <h1>Dashboard</h1>
        <MainInterface />
      </main>
    </div>
  );
}
