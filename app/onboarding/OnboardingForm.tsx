'use client';

import ErrorMessage from '@/ErrorMessage';
import { useActionState, useState } from 'react';
import type { CreateParentConnectionResponseBodyPost } from '../api/parentConnections/route';
import { partnerFormHandler } from './actions';
import styles from './OnboardingForm.module.scss';

export default function OnboardingForm() {
  const [partnerUsername, setPartnerUsername] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [state, formAction] = useActionState(partnerFormHandler, {
    message: '',
  });

  return (
    <div className={styles.container}>
      <section className={styles.partnerForm}>
        <h2>Connect to your Partner</h2>
        <form action={formAction}>
          <h3>Check if Partner is already sign up</h3>
          <label>
            Partner Username
            <input
              name="partnerUsername"
              placeholder="Enter your partner's username"
              required
              value={partnerUsername}
              onChange={(event) => {
                setPartnerUsername(event.currentTarget.value);
              }}
            />
          </label>
          <button>Submit</button>
          <p>{state.message}</p>
        </form>
        {!!state.partnerUsername && (
          <form
            onSubmit={async (event) => {
              event.preventDefault();

              const response = await fetch('/api/parentConnections', {
                method: 'POST',
                body: JSON.stringify({
                  partnerUsername: state.partnerUsername,
                }),
              });
              const responseBody =
                (await response.json()) as CreateParentConnectionResponseBodyPost;

              if ('error' in responseBody) {
                setErrorMessage(responseBody.error);
                setSuccessMessage('');
                return;
              }
              setErrorMessage('');
              setSuccessMessage(`Request sent to ${state.partnerUsername}`);
            }}
          >
            <button>Send request</button>
            {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            {!!successMessage && <p>{successMessage}</p>}
          </form>
        )}
      </section>
    </div>
  );
}

/* <label>
          First Name
          <input
            name="firstName"
            placeholder="Enter First Name"
            required
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
        </label>
        <label>
          Last Name
          <input
            name="lastName"
            placeholder="Enter Last Name"
            required
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
        </label> */
