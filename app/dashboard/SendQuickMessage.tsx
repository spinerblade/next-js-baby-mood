'use client';

import ErrorMessage from '@/ErrorMessage';
import type { QuickMessage } from '@/migrations/00011-createTableQuickMessages';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { CreateMessageConversationResponseBodyPost } from '../api/messages/route';

type Props = {
  quickMessages: QuickMessage[];
};

export default function SendQuickMessage(props: Props) {
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  async function handleSend(quickMessageId: number) {
    setIsSending(true);
    const response = await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify({ message: { quickMessageId } }),
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

  return (
    <div>
      {props.quickMessages.map((quickMessage) => (
        <button
          key={`send-quickMessage-${quickMessage.id}`}
          type="button"
          disabled={isSending}
          onClick={() => handleSend(quickMessage.id)}
        >
          {quickMessage.messageContent}
        </button>
      ))}
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </div>
  );
}
