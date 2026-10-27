import Link from 'next/link';

export default function SignUpSuccessPage() {
  return (
    <>
      <h1>Account has been created!</h1>
      <p>You will be redirected to the dashboard.</p>
      <p>
        If nothing happens, press{' '}
        <Link
          href="/dashboard"
          className="text-sky-700 hover:text-sky-300 underline"
        >
          here
        </Link>
        .
      </p>
    </>
  );
}
