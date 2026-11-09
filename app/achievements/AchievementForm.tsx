'use client';

import ErrorMessage from '@/ErrorMessage';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { CreateAchievementResponseBodyPost } from '../api/achievements/route';

export default function AchievementForm(props: { babyId: number }) {
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
        Achievement Description
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
      <button>Submit</button>
      <ErrorMessage>{errorMessage}</ErrorMessage>
      {!!successMessage && <p>{successMessage}</p>}
    </form>
  );
}
