import type { Route } from 'next';
import { redirect } from 'next/navigation';

export function signUpHandler() {
  redirect('/onboarding' as Route);
}
