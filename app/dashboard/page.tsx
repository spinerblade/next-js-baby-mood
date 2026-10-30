import styles from './dashboard.module.scss';
import MainInterface from './MainInterface';
import Sidebar from './Sidebar';

export const metadata = {
  title: 'Dashboard',
  description: 'The dashboard where the user sees all.',
};

export default function DashboardPage() {
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
