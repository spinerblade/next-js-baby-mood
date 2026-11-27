import { getMoods } from '@/database/moods';
import { getMoodTypes } from '@/database/moodTypes';
import { getQuickMessages } from '@/database/quickMessages';
import { getQuickMessageTypes } from '@/database/quickMessageTypes';
import { getUser } from '@/database/users';
import { getCookie } from '@/util/cookies';
import { getDisplayName } from '@/util/format';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import CloudinaryImage from '../CloudinaryImage';
import MoodSetup from '../MoodSetup';
import styles from '../profile.module.scss';
import QuickMessageSetup from '../QuickMessageSetup';

export const metadata = {
  title: 'Profile',
  description: 'Your Profile page and settings',
};

export default async function ProfilePage(
  props: PageProps<'/profile/[username]'>,
) {
  const { username } = await props.params;
  const sessionToken = await getCookie('sessionToken');
  const user = !!sessionToken && (await getUser(sessionToken));

  if (!user) {
    redirect(`/login?returnTo=/profile/${username}`);
  }
  if (user.username !== username) {
    redirect(`/profile/${user.username}`);
  }
  const moodTypes = await getMoodTypes(sessionToken);
  const moods = await getMoods(sessionToken);
  const quickMessageTypes = await getQuickMessageTypes(sessionToken);
  const quickMessages = await getQuickMessages(sessionToken);
  return (
    <div className={styles.page}>
      <h1>Profile</h1>
      <section className={`${styles.card} ${styles.header}`}>
        <div className={styles.avatar}>
          {user.profilePictureUrl && (
            <CloudinaryImage
              publicId={user.profilePictureUrl}
              alt={getDisplayName(user)}
              width={150}
              height={150}
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <h2>{getDisplayName(user)}</h2>
          <span className={styles.username}>@{user.username}</span>
          <Link className="buttonLink self-start" href="/onboarding">
            Edit profile & partner and add babies
          </Link>
        </div>
      </section>
      <div className={styles.grid}>
        <MoodSetup moodTypes={moodTypes} moods={moods} />
        <QuickMessageSetup
          quickMessageTypes={quickMessageTypes}
          quickMessages={quickMessages}
        />
      </div>
    </div>
  );
}
