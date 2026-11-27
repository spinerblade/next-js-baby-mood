'use client';

import ErrorMessage from '@/ErrorMessage';
import type { Baby } from '@/migrations/00004-createTableBabies';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { CreateAchievementResponseBodyPost } from '../api/achievements/route';
import styles from './AchievementForm.module.scss';

type Props = {
  babyId: Baby['id'];
  isEditing: boolean;
  onToggleEditing: () => void;
};

export default function AchievementForm(props: Props) {
  const [achievementDescription, setAchievementDescription] = useState('');
  const [achievementDate, setAchievementDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter();
  return (
    <form
      className={styles.form}
      onSubmit={async (event) => {
        event.preventDefault();

        const response = await fetch('/api/achievements', {
          method: 'POST',
          body: JSON.stringify({
            achievement: {
              babyId: props.babyId,
              description: achievementDescription,
              date: achievementDate,
            },
          }),
        });

        const responseBody =
          (await response.json()) as CreateAchievementResponseBodyPost;

        if ('error' in responseBody) {
          setSuccessMessage('');
          setErrorMessage(responseBody.error);
          return;
        }
        setErrorMessage('');
        setSuccessMessage('Achievement successfully added!');
        setAchievementDescription('');
        setAchievementDate('');
        router.refresh();
      }}
    >
      <h2>Create achievements</h2>
      <label>
        Achievement description
        <textarea
          name="achievementDescription"
          required
          value={achievementDescription}
          onChange={(event) => {
            setAchievementDescription(event.currentTarget.value);
          }}
        />
      </label>
      <label>
        Date
        <input
          name="achievementDate"
          type="date"
          required
          value={achievementDate}
          onChange={(event) => {
            setAchievementDate(event.currentTarget.value);
          }}
        />
      </label>
      <div className={styles.actions}>
        <button>Create achievement</button>
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          onClick={() => {
            props.onToggleEditing();
          }}
        >
          {props.isEditing ? 'Done' : 'Edit'}
        </button>
      </div>

      <ErrorMessage>{errorMessage}</ErrorMessage>
      {!!successMessage && <p>{successMessage}</p>}
    </form>
  );
}
