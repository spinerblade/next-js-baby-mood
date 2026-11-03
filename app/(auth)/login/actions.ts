import { redirect } from 'next/navigation';

export function loginHandler() {
  redirect('/dashboard');
}
