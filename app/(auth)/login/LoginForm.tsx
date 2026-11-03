'use client';
import { useState } from 'react';
import { loginHandler } from './actions';
import styles from './login.module.scss';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <form action={loginHandler} className={styles.form}>
      <div className={styles.container}>
        <label htmlFor="username">User Name</label>
        <input
          name="username"
          placeholder="Enter Username"
          required
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          required
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button>Log In</button>
      </div>
    </form>
  );
}
