'use client';
import { useActionState, useState } from 'react';
import { babyFormHandler, partnerFormHandler } from './actions';
import styles from './OnboardingForm.module.scss';

export default function OnboardingForm() {
  const [partnerUsername, setPartnerUsername] = useState('');
  const [babyName, setBabyName] = useState('');
  const [babyBirthDate, setBabyBirthDate] = useState('');
  const [babyWeight, setBabyWeight] = useState('');
  const [babyHeight, setBabyHeight] = useState('');

  const [state, formAction] = useActionState(partnerFormHandler, {
    message: '',
  });
  return (
    <div className={styles.container}>
      <section className={styles.partnerForm}>
        <h2>Connect to your Partner</h2>
        <form action={formAction}>
          <h3>Check if Partner is already sign up</h3>
          <label htmlFor="partnerUsername">Partner Username</label>
          <input
            name="partnerUsername"
            placeholder="Enter your partner's username"
            required
            value={partnerUsername}
            onChange={(event) => {
              setPartnerUsername(event.currentTarget.value);
            }}
          />
          <button>Submit</button>
          <p>{state.message}</p>
        </form>
      </section>
      <section className={styles.babyForm}>
        <h2>Set up your Baby's Information</h2>
        <form action={babyFormHandler}>
          <h3>Your Baby</h3>
          <label htmlFor="babyName">Baby's Name</label>
          <input
            name="babyName"
            placeholder="Enter your baby's first name"
            required
            value={babyName}
            onChange={(event) => {
              setBabyName(event.currentTarget.value);
            }}
          />
          <label htmlFor="babyBirthDate">Baby's Birthdate</label>
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
          <label htmlFor="babyWeight">Baby's current weight</label>
          <input
            name="babyWeight"
            placeholder="Enter your baby's weight"
            required
            value={babyWeight}
            onChange={(event) => {
              setBabyWeight(event.currentTarget.value);
            }}
          />
          <label htmlFor="babyHeight">Baby's current height</label>
          <input
            name="babyHeight"
            placeholder="Enter your baby's height"
            required
            value={babyHeight}
            onChange={(event) => {
              setBabyHeight(event.currentTarget.value);
            }}
          />
          <button>Submit</button>
        </form>
      </section>
    </div>
  );
}
