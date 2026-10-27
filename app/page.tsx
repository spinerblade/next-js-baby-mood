import Link from 'next/link';

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
