'use client';
import ErrorMessage from '@/ErrorMessage';
import { getSafeReturnToPath } from '@/util/validation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { LoginResponseBodyPost } from '../api/login/route';
import styles from './login.module.scss';

type Props = {
  returnTo: string | string[] | undefined;
};

export default function LoginForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  return (
    <form
      className={styles.form}
      onSubmit={async (event) => {
        event.preventDefault();

        const response = await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify({
            user: {
              username: username,
              password: password,
            },
          }),
        });

        const responseBody = (await response.json()) as LoginResponseBodyPost;

        if ('error' in responseBody) {
          setErrorMessage(responseBody.error);
          return;
        }

        setErrorMessage('');

        router.push(getSafeReturnToPath(props.returnTo) || '/dashboard');

        router.refresh();
      }}
    >
      <div className={styles.container}>
        <label>
          User Name
          <input
            autoComplete="username"
            placeholder="Enter Username"
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
            type="password"
            autoComplete="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </label>
        <button>Log In</button>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </div>
    </form>
  );
}
