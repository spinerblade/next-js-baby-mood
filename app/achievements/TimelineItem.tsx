'use client';
import ErrorMessage from '@/ErrorMessage';
import type { Achievement } from '@/migrations/00005-createTableAchievements';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type {
  AchievementResponseBodyDelete,
  AchievementResponseBodyPut,
} from '../api/achievements/[achievementId]/route';
import styles from './Timeline.module.scss';

type Props = {
  achievement: Achievement;
  isEditing: boolean;
};

export default function TimelineItem(props: Props) {
  const [description, setDescription] = useState(props.achievement.description);
  const [date, setDate] = useState(props.achievement.date.toISOString());
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  async function handleSave() {
    const response = await fetch(`/api/achievements/${props.achievement.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        achievement: {
          description: description,
          date: date,
        },
      }),
    });
    const responseBody = (await response.json()) as AchievementResponseBodyPut;

    if ('error' in responseBody) {
      setErrorMessage(responseBody.error);
      return;
    }

    setErrorMessage('');
    router.refresh();
  }

  async function handleDelete() {
    const response = await fetch(`/api/achievements/${props.achievement.id}`, {
      method: 'DELETE',
    });
    const responseBody =
      (await response.json()) as AchievementResponseBodyDelete;

    if ('error' in responseBody) {
      setErrorMessage(responseBody.error);
      return;
    }

    router.refresh();
  }

  if (!props.isEditing) {
    return (
      <li className={styles.item}>
        <p>{props.achievement.description}</p>
        <time dateTime={props.achievement.date.toISOString()}>
          {props.achievement.date.toLocaleDateString('de-AT')}
        </time>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </li>
    );
  }

  return (
    <li className={styles.item}>
      <label>
        Description
        <textarea
          required
          maxLength={255}
          value={description}
          onChange={(event) => setDescription(event.currentTarget.value)}
        />
      </label>
      <label>
        Date
        <input
          type="date"
          required
          value={date}
          max={new Date().toISOString()}
          onChange={(event) => setDate(event.currentTarget.value)}
        />
      </label>
      <button type="button" onClick={handleSave}>
        Save
      </button>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </li>
  );
}
