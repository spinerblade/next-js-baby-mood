import type { Route } from 'next';
import { redirect } from 'next/navigation';

export function signUpHandler() {
  redirect('/signUp/success' as Route);
}
