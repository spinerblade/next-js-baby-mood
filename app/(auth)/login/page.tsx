import { title } from 'node:process';
import { getValidSession } from '@/database/sessions';
import { getCookie } from '@/util/cookies';
import Link from 'next/link';
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
      <h1 className="p-8 text-4xl">Login</h1>
      <LoginForm returnTo={searchParams.returnTo} />
      <Link href="/signUp">
        <p>Don't have an account yet? Sign up here!</p>
      </Link>
    </>
  );
}
