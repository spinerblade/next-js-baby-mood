import Link from 'next/link';

export const metadata = {
  title: 'BabyMood',
  description: 'Landing page of the app',
};

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <h1 className="pt-8 text-3xl">BabyMood</h1>
      <Link href="/login">
        <p className="hover:text-sky-500 text-sky-700 underline">Login</p>
      </Link>
      <Link href="/signUp">
        <p className="hover:text-sky-500 text-sky-700 underline">Signup</p>
      </Link>
    </div>
  );
}
