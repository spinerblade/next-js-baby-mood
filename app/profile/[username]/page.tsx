import { getUser } from '@/database/users';
import { getCookie } from '@/util/cookies';
import Link from 'next/link';
import { redirect } from 'next/navigation';

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
  return (
    <>
      <h1>Profile</h1>
      <h2>{username}</h2>
      <h3>Setup</h3>
      <Link href="/onboarding">Click here</Link>
    </>
  );
}
