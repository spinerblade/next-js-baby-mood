import type { MessageWithBabyName } from '@/database/messages';
import type { Partner } from '@/database/parentConnection';
import type { User } from '@/migrations/00000-createTableUsers';
import type { Baby } from '@/migrations/00004-createTableBabies';
import type { Mood } from '@/migrations/00007-createTableMoods';
import Link from 'next/link';
import SendMood from './SendMood';

type Props = {
  user: Pick<User, 'id' | 'username'>;
  partner: Partner | undefined;
  messages: MessageWithBabyName[];
  moods: Mood[];
  babyId: Baby['id'];
};

export default function Chat(props: Props) {
  if (!props.partner) {
    return <p>Connect with your partner first to use the chat!</p>;
  }

  return (
    <>
      <h3>Messages</h3>
      {props.messages.length === 0 && <p>No messages yet</p>}
      <ul>
        {props.messages.map((message) => (
          <li key={`message-${message.id}`}>
            {message.senderId === props.user.id
              ? 'You'
              : (props.partner?.firstName ?? props.partner?.username)}
            : {message.emoji} {message.content}
            {message.babyName && ` – ${message.babyName}`}
            <small>{message.sentAt.toLocaleTimeString()}</small>
          </li>
        ))}
      </ul>
      {props.moods.length === 0 ? (
        <p>
          No moods yet –{' '}
          <Link href={`/profile/${props.user.username}`}>create one</Link>
        </p>
      ) : (
        <SendMood moods={props.moods} babyId={props.babyId} />
      )}
    </>
  );
}
