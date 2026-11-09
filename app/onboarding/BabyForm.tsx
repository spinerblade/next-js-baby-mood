'use client';

import { useState } from 'react';
import styles from './BabyForm.module.scss';

export default function BabyForm() {
  const [babyName, setBabyName] = useState('');
  const [babyBirthDate, setBabyBirthDate] = useState('');
  const [babyWeight, setBabyWeight] = useState('');
  const [babyHeight, setBabyHeight] = useState('');

  return (
    <div className={styles.container}>
      <section className={styles.babyForm}>
        <h2>Set up your Baby's Information</h2>
        <form>
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
              placeholder="Enter your baby's weight"
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
              placeholder="Enter your baby's height"
              required
              value={babyHeight}
              onChange={(event) => {
                setBabyHeight(event.currentTarget.value);
              }}
            />
          </label>
          <button>Submit</button>
        </form>
      </section>
    </div>
  );
}
