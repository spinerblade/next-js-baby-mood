'use client';
import type { ParentConnectionRequest } from '@/database/parentConnection';
import ErrorMessage from '@/ErrorMessage';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type {
  AcceptParentConnectionResponseBodyPut,
  DeclineParentConnectionResponseBodyDelete,
} from '../api/parentConnections/[id]/route';

export default function PartnerRequests(props: {
  requests: ParentConnectionRequest[];
}) {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  return (
    <>
      {!!errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      <ul>
        {props.requests.map((request) => {
          return (
            <li key={request.id}>
              <h2>New Request</h2>
              <div>{request.username}</div>

              <button
                onClick={async () => {
                  const response = await fetch(
                    `/api/parentConnections/${request.id}`,
                    {
                      method: 'PUT',
                    },
                  );
                  const responseBody =
                    (await response.json()) as AcceptParentConnectionResponseBodyPut;
                  if ('error' in responseBody) {
                    setErrorMessage(responseBody.error);
                    return;
                  }
                  setErrorMessage('');
                  router.refresh();
                }}
                type="button"
                className="bg-gray-700 hover:bg-gray-500 m-4"
              >
                Accept
              </button>
              <button
                onClick={async () => {
                  const response = await fetch(
                    `/api/parentConnections/${request.id}`,
                    {
                      method: 'DELETE',
                    },
                  );
                  const responseBody =
                    (await response.json()) as DeclineParentConnectionResponseBodyDelete;
                  if ('error' in responseBody) {
                    setErrorMessage(responseBody.error);
                    return;
                  }
                  setErrorMessage('');
                  router.refresh();
                }}
                type="button"
                className="bg-gray-700 hover:bg-gray-500 m-4"
              >
                Decline
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
