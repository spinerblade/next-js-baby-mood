import { getValidSession } from '@/database/sessions';
import { getCookie } from '@/util/cookies';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';

export const metadata = {
  title: 'Login',
  description: 'Login to BabyMood',
};

export default async function LoginPage(props: PageProps<'/login'>) {
  const sessionToken = await getCookie('sessionToken');
  const session = !!sessionToken && (await getValidSession(sessionToken));
  if (session) {
    redirect('/dashboard');
  }

  const searchParams = await props.searchParams;
  return (
    <>
      <h1 className="p-8 text-4xl font-bold text-center">babyMood</h1>
      <LoginForm returnTo={searchParams.returnTo} />
    </>
  );
}
