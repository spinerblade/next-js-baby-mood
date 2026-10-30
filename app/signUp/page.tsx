import { SignUpForm } from './SignUpForm';

export const metadata = {
  title: 'Create an Account',
  description: 'Page for creating a new account',
};

export default function SignUpPage() {
  return (
    <>
      <h1 className="p-8 text-4xl">Create an Account</h1>
      <SignUpForm />
      <p>Hello</p>
    </>
  );
}
