import { getBabies } from '@/database/babies';
import { getUser } from '@/database/users';
import { getCookie } from '@/util/cookies';
import { getDisplayName } from '@/util/format';
import { getSelectedBaby } from '@/util/selectedBaby';
import Link from 'next/link';
import LogoutButton from './(auth)/logout/LogoutButton';
import BabySwitcher from './Babyswitcher/BabySwitcher';
import styles from './Header.module.scss';
import CloudinaryImage from './profile/CloudinaryImage';

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
              <li className={styles.circleLink}>
                <Link href="/dashboard">BabyMood</Link>
              </li>
              <li className={styles.circleLink}>
                <Link href="/achievements">Achievements</Link>
              </li>
              {selectedBaby && (
                <li>
                  <BabySwitcher
                    babies={babies}
                    selectedBabyId={selectedBaby.id}
                  />
                </li>
              )}
              {!user.profilePictureUrl ? (
                <li className={styles.pushRight}>
                  <Link href={`/profile/${user.username}`}>
                    {getDisplayName(user)}
                  </Link>
                </li>
              ) : (
                <li className={styles.pushRight}>
                  <Link href={`/profile/${user.username}`}>
                    <CloudinaryImage
                      publicId={user.profilePictureUrl}
                      alt={getDisplayName(user)}
                      width={100}
                      height={100}
                    />
                  </Link>
                </li>
              )}
              <li>
                <LogoutButton />
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
