'use client';
import type { ParentConnectionRequest } from '@/database/parentConnection';
import ErrorMessage from '@/ErrorMessage';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type {
  AcceptParentConnectionResponseBodyPut,
  DeclineParentConnectionResponseBodyDelete,
} from '../api/parentConnections/[id]/route';
import styles from './PartnerRequests.module.scss';

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
            <li className={styles.request} key={request.id}>
              <h2>New Request</h2>
              <p className="inline-block px-3 py-1 rounded-full font-semibold bg-(--color-primary) text-(--color-text-inverse)">
                {request.username}
              </p>

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
                className="m-4"
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
                className="m-4"
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
