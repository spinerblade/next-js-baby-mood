import { getBabies } from '@/database/babies';
import { getUser } from '@/database/users';
import { getCookie } from '@/util/cookies';
import { getSelectedBaby } from '@/util/selectedBaby';
import Link from 'next/link';
import LogoutButton from './(auth)/logout/LogoutButton';
import BabySwitcher from './Babyswitcher/BabySwitcher';
import styles from './Header.module.scss';

export default async function Header() {
  const sessionToken = await getCookie('sessionToken');
  const user = !!sessionToken && (await getUser(sessionToken));
  const babies = user && sessionToken ? await getBabies(sessionToken) : [];
  const selectedBaby =
    user && sessionToken ? await getSelectedBaby(sessionToken) : undefined;

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul>
          {!user ? null : (
            <>
              <li>
                <Link href={`/profile/${user.username}`}>{user.username}</Link>
              </li>
              <li>
                <LogoutButton />
              </li>
              {selectedBaby && (
                <li>
                  <BabySwitcher
                    babies={babies}
                    selectedBabyId={selectedBaby.id}
                  />
                </li>
              )}
              <li>
                <Link href="/dashboard">BabyMood</Link>
              </li>

              <li>
                <Link href="/achievements">Achievements</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
