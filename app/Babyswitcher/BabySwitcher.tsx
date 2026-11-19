'use client';

import ErrorMessage from '@/ErrorMessage';
import type { Baby } from '@/migrations/00004-createTableBabies';
import { useState } from 'react';
import { selectBaby } from './actions';
import styles from './BabySwitcher.module.scss';

type Props = {
  babies: Baby[];
  selectedBabyId: Baby['id'];
};

export default function BabySwitcher(props: Props) {
  const [errorMessage, setErrorMessage] = useState('');

  async function handleChange(babyId: Baby['id']) {
    const result = await selectBaby(babyId);
    if (result?.error) {
      setErrorMessage(result.error);
      return;
    }
    setErrorMessage('');
  }
  return (
    <div>
      <select
        className={styles.babySelector}
        aria-label="Select baby"
        value={props.selectedBabyId}
        onChange={async (event) => {
          await handleChange(Number(event.currentTarget.value));
        }}
      >
        {props.babies.map((baby) => (
          <option key={baby.id} value={baby.id}>
            {baby.name}
          </option>
        ))}
      </select>

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
}
