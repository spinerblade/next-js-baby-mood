import type { MessageWithBabyName } from '@/database/messages';
import type { Partner } from '@/database/parentConnection';
import type { Baby } from '@/migrations/00004-createTableBabies';
import type { Mood } from '@/migrations/00007-createTableMoods';
import { formatHeight, formatWeight, getDisplayName } from '@/util/format';
import styles from './Sidebar.module.scss';

type Props = {
  baby: Baby;
  username: string;
  partner: Partner | undefined;
  moods: Mood[];
  latestMoodMessage: MessageWithBabyName | undefined;
};

export default function Sidebar(props: Props) {
  return (
    <aside className={styles.sidebar}>
      <section className={styles.section}>
        <h2>My Baby</h2>
        <dl>
          <dt>Baby name</dt>
          <dd>{props.baby.name}</dd>
          <dt>Birth date</dt>
          <dd>{props.baby.birthDate.toLocaleDateString()}</dd>
          <dt>Weight</dt>
          <dd>{formatWeight(props.baby.weight)}</dd>
          <dt>Height</dt>
          <dd>{formatHeight(props.baby.height)}</dd>
          <dt>Mood</dt>
          <dd>
            {props.latestMoodMessage
              ? `${props.latestMoodMessage.emoji} ${props.latestMoodMessage.content}`
              : 'No mood sent yet'}
            {props.latestMoodMessage && (
              <small>
                {' '}
                ·{' '}
                {props.latestMoodMessage.sentAt.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </small>
            )}
          </dd>
        </dl>
      </section>
      <section className={styles.section}>
        <h2>My Partner</h2>
        <p>
          {props.partner
            ? getDisplayName(props.partner)
            : 'No partner connected'}
        </p>
      </section>
    </aside>
  );
}
