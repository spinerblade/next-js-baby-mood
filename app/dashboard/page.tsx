import styles from './dashboard.module.scss';
import Sidebar from './Sidebar';

export default function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <div className={styles.dashboardContainer}>
        <Sidebar />
        <main className={styles.mainContent}>
          <h2>Placeholder Main Interface</h2>
        </main>
      </div>
    </>
  );
}
