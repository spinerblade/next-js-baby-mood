'use client';

import ErrorMessage from '@/ErrorMessage';
import { useActionState } from 'react';
import { updateUserProfile } from './actions';
import styles from './OnboardingForm.module.scss';

type Props = {
  firstName: string | null;
  lastName: string | null;
  birthDate: string | null;
};

export default function ProfileForm(props: Props) {
  const [state, formAction, isPending] = useActionState(updateUserProfile, {});

  return (
    <div className={styles.container}>
      <section className={styles.partnerForm}>
        <h2>About you</h2>
        <form action={formAction}>
          <label>
            First Name
            <input
              name="firstName"
              placeholder="Enter First Name"
              required
              defaultValue={props.firstName ?? ''}
            />
          </label>
          <label>
            Last Name
            <input
              name="lastName"
              placeholder="Enter Last Name"
              required
              defaultValue={props.lastName ?? ''}
            />
          </label>
          <label>
            Birthdate
            <input
              name="birthDate"
              type="date"
              required
              max={new Date().toISOString().slice(0, 10)}
              defaultValue={props.birthDate ?? ''}
            />
          </label>
          <button disabled={isPending}>{isPending ? 'Saving…' : 'Save'}</button>
          {!!state.error && <ErrorMessage>{state.error}</ErrorMessage>}
          {state.success && <p>Saved!</p>}
        </form>
      </section>
    </div>
  );
}
