import { getValidSession } from '@/database/sessions';
import { getCookie } from '@/util/cookies';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { SignUpForm } from './SignUpForm';

export const metadata = {
  title: 'Sign Up',
  description: 'Create a new account at BabyMood',
};

export default async function SignUpPage(props: PageProps<'/signUp'>) {
  const sessionToken = await getCookie('sessionToken');
  const session = !!sessionToken && (await getValidSession(sessionToken));

  if (session) {
    redirect('/dashboard');
  }

  const searchParams = await props.searchParams;
  return (
    <>
      <h1 className="p-8 text-4xl">Create an Account</h1>
      <SignUpForm returnTo={searchParams.returnTo} />
    </>
  );
}
