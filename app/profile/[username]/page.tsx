import ImageUpload from '@/app/ImageUpload';
import { getMoods } from '@/database/moods';
import { getMoodTypes } from '@/database/moodTypes';
import { getUser } from '@/database/users';
import { getCookie } from '@/util/cookies';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { updateUserPicture } from '../actions';
import CloudinaryImage from '../Cloudinary';
import MoodSetup from '../MoodSetup';

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
  return (
    <>
      <h1>Profile</h1>
      <h2>{username}</h2>
      {user.profilePictureUrl && (
        <CloudinaryImage
          publicId={user.profilePictureUrl}
          alt={username}
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
    </>
  );
}
