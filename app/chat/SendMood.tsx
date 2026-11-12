'use client';

import ErrorMessage from '@/ErrorMessage';
import type { Baby } from '@/migrations/00004-createTableBabies';
import type { Mood } from '@/migrations/00007-createTableMoods';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { CreateMessageConversationResponseBodyPost } from '../api/messages/route';

type Props = {
  moods: Mood[];
  babies: Baby[];
};

export default function SendMood(props: Props) {
  const [babyId, setBabyId] = useState(props.babies[0]?.id);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  async function handleSend(moodId: number) {
    setIsSending(true);
    const response = await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify({ message: { moodId, babyId } }),
    });
    const responseBody =
      (await response.json()) as CreateMessageConversationResponseBodyPost;
    setIsSending(false);

    if ('error' in responseBody) {
      setErrorMessage(responseBody.error);
      return;
    }
    setErrorMessage('');
    router.refresh();
  }

  if (props.babies.length === 0) return <p>Add a baby first</p>;
  if (props.moods.length === 0) return <p>Create a mood preset first</p>;

  return (
    <div>
      <label>
        Baby
        <select
          value={babyId}
          onChange={(event) => setBabyId(Number(event.currentTarget.value))}
        >
          {props.babies.map((baby) => (
            <option key={`baby-${baby.id}`} value={baby.id}>
              {baby.name}
            </option>
          ))}
        </select>
      </label>
      {props.moods.map((mood) => (
        <button
          key={`send-mood-${mood.id}`}
          type="button"
          disabled={isSending}
          onClick={() => handleSend(mood.id)}
        >
          {mood.emoji} {mood.description}
        </button>
      ))}
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </div>
  );
}
