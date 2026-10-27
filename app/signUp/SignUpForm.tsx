'use client';
import { useState } from 'react';
import { signUpHandler } from './actions';
import styles from './signUp.module.scss';

export function SignUpForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  return (
    <form action={signUpHandler}>
      <div className={styles.container}>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          placeholder="Choose a Username"
          required
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Choose a Password"
          required
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <label htmlFor="firstName">First Name</label>
        <input
          name="firstName"
          placeholder="Enter First Name"
          required
          value={firstName}
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          name="lastName"
          placeholder="Enter Last Name"
          required
          value={lastName}
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        />
        <label htmlFor="email">Email</label>
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
        <button>Submit</button>
      </div>
    </form>
  );
}
