import Link from 'next/link';

export const metadata = {
  title: 'BabyMood',
  description: 'Landing page of the app',
};

export default function HomePage() {
  return (
    <div>
      <p>Hello World</p>
      <Link href="/login">
        <p>Login</p>
      </Link>
      <Link href="/signUp">
        <p>Signup</p>
      </Link>
    </div>
  );
}
