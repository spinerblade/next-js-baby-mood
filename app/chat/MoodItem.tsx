'use client';

import ErrorMessage from '@/ErrorMessage';
import type { MoodType } from '@/migrations/00006-createTableMoodTypes';
import type { Mood } from '@/migrations/00007-createTableMoods';
import { moodsEmojis } from '@/util/moodsEmojis';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type {
  MoodResponseBodyDelete,
  MoodResponseBodyPut,
} from '../api/moods/[moodId]/route';

type Props = {
  mood: Mood;
  moodTypes: MoodType[];
};

export default function MoodItem(props: Props) {
  const [moodDescription, setMoodDescription] = useState(
    props.mood.description,
  );
  const [moodTypeId, setMoodTypeId] = useState(props.mood.moodTypeId);
  const [moodEmoji, setMoodEmoji] = useState(props.mood.emoji);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  async function handleSave() {
    const response = await fetch(`/api/moods/${props.mood.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        mood: {
          description: moodDescription,
          moodTypeId: moodTypeId,
          emoji: moodEmoji,
        },
      }),
    });
    const responseBody = (await response.json()) as MoodResponseBodyPut;

    if ('error' in responseBody) {
      setErrorMessage(responseBody.error);
      return;
    }

    setErrorMessage('');
    setIsEditing(false);
    router.refresh();
  }

  async function handleDelete() {
    const response = await fetch(`/api/moods/${props.mood.id}`, {
      method: 'DELETE',
    });
    const responseBody = (await response.json()) as MoodResponseBodyDelete;

    if ('error' in responseBody) {
      setErrorMessage(responseBody.error);
      return;
    }

    router.refresh();
  }

  function handleCancel() {
    setMoodDescription(props.mood.description);
    setMoodTypeId(props.mood.moodTypeId);
    setMoodEmoji(props.mood.emoji);
    setErrorMessage('');
    setIsEditing(false);
  }

  if (!isEditing) {
    return (
      <li>
        {props.mood.emoji} {props.mood.description}{' '}
        {
          props.moodTypes.find((type) => type.id === props.mood.moodTypeId)
            ?.name
        }{' '}
        <button type="button" onClick={() => setIsEditing(true)}>
          Edit
        </button>{' '}
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </li>
    );
  }

  return (
    <li>
      <label>
        Mood Description
        <input
          required
          maxLength={20}
          value={moodDescription}
          onChange={(event) => setMoodDescription(event.currentTarget.value)}
        />
      </label>
      <label>
        Mood Type
        <select
          value={moodTypeId}
          onChange={(event) => setMoodTypeId(Number(event.currentTarget.value))}
        >
          {props.moodTypes.map((moodType) => (
            <option key={`moodType-${moodType.id}`} value={moodType.id}>
              {moodType.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Mood Emoji
        <select
          value={moodEmoji}
          onChange={(event) => setMoodEmoji(event.currentTarget.value)}
        >
          {moodsEmojis.map((emoji) => (
            <option key={`emoji-${emoji}`} value={emoji}>
              {emoji}
            </option>
          ))}
        </select>
      </label>
      <button type="button" onClick={handleSave}>
        Save
      </button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </li>
  );
}
