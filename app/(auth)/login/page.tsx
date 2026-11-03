import Link from 'next/link';
import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <>
      <h1 className="p-8 text-4xl">Login</h1>
      <LoginForm />
      <Link href="/signUp">
        <p>Don't have an account yet? Sign up here!</p>
      </Link>
    </>
  );
}
