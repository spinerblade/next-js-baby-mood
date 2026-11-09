'use client';

import ErrorMessage from '@/ErrorMessage';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { CreateBabyResponseBodyPost } from '../api/babies/route';
import styles from './BabyForm.module.scss';

export default function BabyForm() {
  const [babyName, setBabyName] = useState('');
  const [babyBirthDate, setBabyBirthDate] = useState('');
  const [babyWeight, setBabyWeight] = useState('');
  const [babyHeight, setBabyHeight] = useState('');
  const [babyGenderId, setBabyGenderId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter();

  return (
    <div className={styles.container}>
      <section className={styles.babyForm}>
        <h2>Set up your Baby's Information</h2>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const response = await fetch('/api/babies', {
              method: 'POST',
              body: JSON.stringify({
                baby: {
                  name: babyName,
                  birthDate: babyBirthDate,
                  weight: babyWeight,
                  height: babyHeight,
                  genderId: babyGenderId,
                },
              }),
            });

            const responseBody =
              (await response.json()) as CreateBabyResponseBodyPost;

            if ('error' in responseBody) {
              setSuccessMessage('');
              setErrorMessage(responseBody.error);
              return;
            }
            setErrorMessage('');
            setSuccessMessage(`${responseBody.baby.name} was added!`);
            setBabyName('');
            setBabyBirthDate('');
            setBabyGenderId('');
            setBabyWeight('');
            setBabyHeight('');
          }}
        >
          <h3>Your Baby</h3>
          <label>
            Baby's Name
            <input
              name="babyName"
              placeholder="Enter your baby's first name"
              required
              value={babyName}
              onChange={(event) => {
                setBabyName(event.currentTarget.value);
              }}
            />
          </label>
          <label>
            Baby's Gender
            <select
              name="babyGenderId"

              required
              value={babyGenderId}
              onChange={(event) => {
                setBabyGenderId(event.currentTarget.value);
              }}
            >
              <option value="">Choose a gender</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
              <option value="3">Other</option>
            </select>
          </label>
          <label>
            Baby's Birthdate
            <input
              name="babyBirthDate"
              type="date"
              placeholder="Enter your baby's birthdate"
              required
              value={babyBirthDate}
              onChange={(event) => {
                setBabyBirthDate(event.currentTarget.value);
              }}
            />
          </label>
          <label>
            Baby's current weight
            <input
              name="babyWeight"
              type="number"
              placeholder="Weight in grams"
              required
              value={babyWeight}
              onChange={(event) => {
                setBabyWeight(event.currentTarget.value);
              }}
            />
          </label>
          <label>
            Baby's current height
            <input
              name="babyHeight"
              type="number"
              placeholder="Height in centimeter"
              required
              value={babyHeight}
              onChange={(event) => {
                setBabyHeight(event.currentTarget.value);
              }}
            />
          </label>
          <button>Submit</button>
          <ErrorMessage>{errorMessage}</ErrorMessage>
          {!!successMessage && (
            <>
              <p>{successMessage}</p>
              <button type="button" onClick={() => router.push('/dashboard')}>
                Go to dashboard
              </button>
            </>
          )}
        </form>
      </section>
    </div>
  );
}
