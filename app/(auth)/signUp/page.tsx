import Link from 'next/link';
import { SignUpForm } from './SignUpForm';

export const metadata = {
  title: 'Create an Account',
  description: 'Page for creating a new account',
};

export default async function SignUpPage(props: PageProps<'/signUp'>) {
  const searchParams = await props.searchParams;
  return (
    <>
      <h1 className="p-8 text-4xl">Create an Account</h1>
      <SignUpForm returnTo={searchParams.returnTo} />
    </>
  );
}
