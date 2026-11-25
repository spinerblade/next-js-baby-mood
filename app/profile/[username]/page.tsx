import ImageUpload from '@/app/ImageUpload';
import { getMoods } from '@/database/moods';
import { getMoodTypes } from '@/database/moodTypes';
import { getQuickMessages } from '@/database/quickMessages';
import { getQuickMessageTypes } from '@/database/quickMessageTypes';
import { getUser } from '@/database/users';
import { getCookie } from '@/util/cookies';
import { getDisplayName } from '@/util/format';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { updateUserPicture } from '../actions';
import CloudinaryImage from '../CloudinaryImage';
import MoodSetup from '../MoodSetup';
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
    <>
      <h1>Profile</h1>
      <h2>{getDisplayName(user)}</h2>
      {user.profilePictureUrl && (
        <CloudinaryImage
          publicId={user.profilePictureUrl}
          alt={getDisplayName(user)}
          width={150}
          height={150}
        />
      )}
      <ImageUpload
        folder="users"
        label="Upload profile picture"
        onUpload={updateUserPicture}
      />

      <h3>Setup</h3>
      <Link href="/onboarding">Click here to add your partner and babies</Link>
      <MoodSetup moodTypes={moodTypes} moods={moods} />
      <QuickMessageSetup
        quickMessageTypes={quickMessageTypes}
        quickMessages={quickMessages}
      />
    </>
  );
}
