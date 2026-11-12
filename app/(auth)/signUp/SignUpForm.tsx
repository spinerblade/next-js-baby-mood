'use client';
import ErrorMessage from '@/ErrorMessage';
import { getSafeReturnToPath } from '@/util/validation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { SignUpResponseBodyPost } from '../api/signUp/route';
import styles from './SignUpForm.module.scss';

type Props = {
  returnTo: string | string[] | undefined;
};

export function SignUpForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();

        const response = await fetch('/api/signUp', {
          method: 'POST',
          body: JSON.stringify({
            user: {
              username: username,
              password: password,
              email: email,
            },
          }),
        });

        const responseBody = (await response.json()) as SignUpResponseBodyPost;

        if ('error' in responseBody) {
          setErrorMessage(responseBody.error);
          return;
        }
        setErrorMessage('');

        router.push(getSafeReturnToPath(props.returnTo) || '/onboarding');

        router.refresh();
      }}
    >
      <div className={styles.container}>
        <label>
          Username
          <input
            autoComplete="username"
            placeholder="Choose a Username"
            required
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </label>
        <label>
          Password
          <input
            autoComplete="new-password"
            type="password"
            placeholder="Choose a Password"
            required
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </label>

        <label>
          Email
          <input
            name="email"
            type="email"
            placeholder="Enter Email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </label>
        <button>Sign Up</button>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </div>
    </form>
  );
}
