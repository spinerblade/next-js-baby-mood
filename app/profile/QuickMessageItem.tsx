'use client';

import ErrorMessage from '@/ErrorMessage';
import type { QuickMessageType } from '@/migrations/00009-createTableQuickMessageTypes';
import type { QuickMessage } from '@/migrations/00010-createTableQuickMessages';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type {
  QuickMessageResponseBodyDelete,
  QuickMessageResponseBodyPut,
} from '../api/quickMessages/[quickMessageId]/route';

type Props = {
  quickMessage: QuickMessage;
  quickMessageTypes: QuickMessageType[];
};

export default function QuickMessageItem(props: Props) {
  const [messageContent, setMessageContent] = useState(
    props.quickMessage.messageContent,
  );
  const [quickMessageTypeId, setQuickMessageTypeId] = useState(
    props.quickMessage.quickMessageTypeId,
  );
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  async function handleSave() {
    const response = await fetch(
      `/api/quickMessages/${props.quickMessage.id}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          quickMessage: { messageContent, quickMessageTypeId },
        }),
      },
    );
    const responseBody = (await response.json()) as QuickMessageResponseBodyPut;
    if ('error' in responseBody) {
      setErrorMessage(responseBody.error);
      return;
    }
    setErrorMessage('');
    setIsEditing(false);
    router.refresh();
  }

  async function handleDelete() {
    const response = await fetch(
      `/api/quickMessages/${props.quickMessage.id}`,
      {
        method: 'DELETE',
      },
    );
    const responseBody =
      (await response.json()) as QuickMessageResponseBodyDelete;
    if ('error' in responseBody) {
      setErrorMessage(responseBody.error);
      return;
    }
    router.refresh();
  }

  function handleCancel() {
    setMessageContent(props.quickMessage.messageContent);
    setQuickMessageTypeId(props.quickMessage.quickMessageTypeId);
    setErrorMessage('');
    setIsEditing(false);
  }

  if (!isEditing) {
    return (
      <li>
        {props.quickMessage.messageContent}{' '}
        {
          props.quickMessageTypes.find(
            (type) => type.id === props.quickMessage.quickMessageTypeId,
          )?.name
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
          value={quickMessageTypeId}
          onChange={(event) =>
            setQuickMessageTypeId(Number(event.currentTarget.value))
          }
        >
          {props.quickMessageTypes.map((type) => (
            <option key={`quickMessageType-${type.id}`} value={type.id}>
              {type.name}
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
