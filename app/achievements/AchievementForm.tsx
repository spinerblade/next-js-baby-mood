'use client';

import ErrorMessage from '@/ErrorMessage';
import type { Baby } from '@/migrations/00004-createTableBabies';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { CreateAchievementResponseBodyPost } from '../api/achievements/route';

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
      <button>Create achievement</button>

      <button
        type="button"
        onClick={() => {
          props.onToggleEditing();
        }}
      >
        {props.isEditing ? 'Done' : 'Edit'}
      </button>

      <ErrorMessage>{errorMessage}</ErrorMessage>
      {!!successMessage && <p>{successMessage}</p>}
    </form>
  );
}
