import { getUser } from '@/database/users';
import { getCookie } from '@/util/cookies';
import Link from 'next/link';
import LogoutButton from './(auth)/logout/LogoutButton';
import styles from './Header.module.scss';

export default async function Header() {
  const sessionToken = await getCookie('sessionToken');
  const user = !!sessionToken && (await getUser(sessionToken));
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul>
          {!user ? (
            <></>
          ) : (
            <>
              <li>
                <Link href={`/profile/${user.username}`}>{user.username}</Link>
              </li>
              <li>
                <LogoutButton />
              </li>
              <li>
                <Link href="/dashboard">BabyDashboard</Link>
              </li>
              <li>BabyMood/Chat</li>
              <li>
                <Link href="/achievements">Achievements/Timeline</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
