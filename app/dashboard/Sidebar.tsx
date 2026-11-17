import type { Partner } from '@/database/parentConnection';
import type { Baby } from '@/migrations/00004-createTableBabies';
import type { Mood } from '@/migrations/00007-createTableMoods';
import Link from 'next/link';
import styles from './Sidebar.module.scss';

type Props = {
  baby: Baby;
  babies: Baby[];
  partner: Partner | undefined;
  moods: Mood[];
};

export default function Sidebar(props: Props) {
  return (
    <aside className={styles.sidebar}>
      <h2>Sidebar</h2>
      <section className={styles.section}>
        <ul>
          {props.babies.map((baby) => (
            <li key={baby.id}>
              <Link href={`/dashboard/${baby.id}`}>{baby.name}</Link>
            </li>
          ))}
        </ul>
        <h3>My Baby</h3>
        <dl>
          <dt>Baby Name</dt>
          <dd>{props.baby.name}</dd>
          <dt>Birth Date</dt>
          <dd>{props.baby.birthDate.toLocaleDateString()}</dd>
          <dt>Weight</dt>
          <dd>{props.baby.weight}</dd>
          <dt>Height</dt>
          <dd>{props.baby.height}</dd>
          <dt>Mood</dt>
          <dd>currentMood</dd>
        </dl>
      </section>
      <section className={styles.section}>
        <h3>My Partner</h3>
        <p>{props.partner ? props.partner.username : 'No partner connected'}</p>
      </section>
      <section className={styles.section}>
        <h3>My Quick Messages</h3>
        {props.moods.length === 0 ? (
          <p>
            No moods yet – <Link href="/chat">create one</Link>
          </p>
        ) : (
          <ul>
            {props.moods.map((mood) => (
              <li key={`sidebar-mood-${mood.id}`}>
                <button type="button">
                  {mood.emoji} {mood.description}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </aside>
  );
}
