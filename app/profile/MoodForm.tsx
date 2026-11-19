'use client';
import ErrorMessage from '@/ErrorMessage';
import type { MoodType } from '@/migrations/00006-createTableMoodTypes';
import { moodsEmojis } from '@/util/moodsEmojis';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { CreateMoodResponseBodyPost } from '../api/moods/route';

type Props = {
  moodTypes: MoodType[];
};

export default function MoodForm(props: Props) {
  const [moodDescription, setMoodDescription] = useState('');
  const [moodTypeId, setMoodTypeId] = useState('');
  const [moodEmoji, setMoodEmoji] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const response = await fetch('/api/moods', {
          method: 'POST',
          body: JSON.stringify({
            mood: {
              description: moodDescription,
              moodTypeId: Number(moodTypeId),
              emoji: moodEmoji,
            },
          }),
        });
        const responseBody =
          (await response.json()) as CreateMoodResponseBodyPost;
        if ('error' in responseBody) {
          setSuccessMessage('');
          setErrorMessage(responseBody.error);
          return;
        }
        setErrorMessage('');
        setSuccessMessage('Mood added!');
        setMoodDescription('');
        setMoodTypeId('');
        setMoodEmoji('');
        router.refresh();
      }}
    >
      <label>
        Mood Description
        <input
          required
          value={moodDescription}
          maxLength={20}
          onChange={(event) => {
            setMoodDescription(event.currentTarget.value);
          }}
        />
      </label>
      <label>
        Mood Type
        <select
          required
          value={moodTypeId}
          onChange={(event) => {
            setMoodTypeId(event.currentTarget.value);
          }}
        >
          <option value="">Choose a type</option>
          {props.moodTypes.map((moodType) => {
            return (
              <option key={moodType.id} value={moodType.id}>
                {moodType.name}
              </option>
            );
          })}
        </select>
      </label>
      <label>
        Mood Emoji
        <select
          required
          value={moodEmoji}
          onChange={(event) => {
            setMoodEmoji(event.currentTarget.value);
          }}
        >
          <option value="">Choose an emoji</option>
          {moodsEmojis.map((moodsEmoji) => {
            return (
              <option key={moodsEmoji} value={moodsEmoji}>
                {moodsEmoji}
              </option>
            );
          })}
        </select>
      </label>
      <button>Submit</button>
      <ErrorMessage>{errorMessage}</ErrorMessage>
      {!!successMessage && <p>{successMessage}</p>}
    </form>
  );
}
