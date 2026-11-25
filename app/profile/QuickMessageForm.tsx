'use client';
import ErrorMessage from '@/ErrorMessage';
import type { QuickMessageType } from '@/migrations/00009-createTableQuickMessageTypes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { CreateQuickMessageResponseBodyPost } from '../api/quickMessages/route';

type Props = {
  quickMessageTypes: QuickMessageType[];
};

export default function QuickMessageForm(props: Props) {
  const [messageContent, setMessageContent] = useState('');
  const [quickMessageTypeId, setQuickMessageTypeId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const response = await fetch('/api/quickMessages', {
          method: 'POST',
          body: JSON.stringify({
            quickMessage: {
              messageContent: messageContent,
              quickMessageTypeId: Number(quickMessageTypeId),
            },
          }),
        });
        const responseBody =
          (await response.json()) as CreateQuickMessageResponseBodyPost;
        if ('error' in responseBody) {
          setSuccessMessage('');
          setErrorMessage(responseBody.error);
          return;
        }
        setErrorMessage('');
        setSuccessMessage('Quick message added!');
        setMessageContent('');
        setQuickMessageTypeId('');
        router.refresh();
      }}
    >
      <label>
        Message
        <input
          required
          maxLength={100}
          value={messageContent}
          onChange={(event) => setMessageContent(event.currentTarget.value)}
        />
      </label>
      <label>
        Type
        <select
          required
          value={quickMessageTypeId}
          onChange={(event) => setQuickMessageTypeId(event.currentTarget.value)}
        >
          <option value="">Choose a type</option>
          {props.quickMessageTypes.map((type) => (
            <option key={`quickMessageType-${type.id}`} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </label>
      <button>Create Quick Message</button>
      <ErrorMessage>{errorMessage}</ErrorMessage>
      {!!successMessage && <p>{successMessage}</p>}
    </form>
  );
}
