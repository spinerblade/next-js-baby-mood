import type { MessageWithBabyName } from '@/database/messages';
import type { Partner } from '@/database/parentConnection';
import type { User } from '@/migrations/00000-createTableUsers';
import type { Baby } from '@/migrations/00004-createTableBabies';
import type { Mood } from '@/migrations/00008-createTableMoods';
import type { QuickMessage } from '@/migrations/00011-createTableQuickMessages';
import { getDisplayName } from '@/util/format';
import Link from 'next/link';
import styles from './Chat.module.scss';
import SendMood from './SendMood';
import SendQuickMessage from './SendQuickMessage';

type Props = {
  user: Pick<User, 'id' | 'username'>;
  partner: Partner | undefined;
  messages: MessageWithBabyName[];
  moods: Mood[];
  babyId: Baby['id'];
  quickMessages: QuickMessage[];
};

export default function Chat(props: Props) {
  const partner = props.partner;
  if (!partner) {
    return <p>Connect with your partner first to use the chat!</p>;
  }
  return (
    <>
      <h3>Chat</h3>
      {props.messages.length === 0 && (
        <>
          <p>No messages predefined yet</p>
          <Link className="buttonLink" href={`/profile/${props.user.username}`}>
            create one
          </Link>
        </>
      )}
      <ul className={styles.messageList}>
        {props.messages.map((message) => {
          const isOwn = message.senderId === props.user.id;
          return (
            <li
              key={`message-${message.id}`}
              className={`${styles.message} ${isOwn ? styles.own : styles.partner}`}
            >
              {!isOwn && (
                <span className={styles.sender}>{getDisplayName(partner)}</span>
              )}
              <div className={styles.bubble}>
                {message.emoji} {message.content}
                {message.babyName && (
                  <span className={styles.baby}>{message.babyName}</span>
                )}
              </div>
              <small className={styles.time}>
                {message.sentAt.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </small>
            </li>
          );
        })}
      </ul>
      {props.moods.length === 0 ? (
        <>
          <p>No moods predefined yet.</p>
          <Link className="buttonLink" href={`/profile/${props.user.username}`}>
            create one
          </Link>
        </>
      ) : (
        <SendMood moods={props.moods} babyId={props.babyId} />
      )}
      {props.quickMessages.length > 0 && (
        <SendQuickMessage quickMessages={props.quickMessages} />
      )}
    </>
  );
}
