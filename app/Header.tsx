import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/dashboard">BabyDashboard</Link>
          </li>
          <li>BabyMood/Chat</li>
          <li>
            <Link href="/achievements">Achievements/Timeline</Link>
          </li>
          <li>TODOList/Tasks</li>
        </ul>
      </nav>
    </header>
  );
}
