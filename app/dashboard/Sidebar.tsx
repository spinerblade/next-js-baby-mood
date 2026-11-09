import type { Partner } from '@/database/parentConnection';
import type { Baby } from '@/migrations/00004-createTableBabies';
import Link from 'next/link';
import styles from './Sidebar.module.scss';

type Props = {
  baby: Baby;
  babies: Baby[];
  partner: Partner | undefined;
};

export default function Sidebar(props: Props) {
  return (
    <aside className={styles.sidebar}>
      <h2>Placeholder for Sidebar</h2>
      <section className={styles.babySection}>
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
      <section className={styles.partnerSection}>
        <h3>My Partner</h3>
        <p>{props.partner ? props.partner.username : 'No partner connected'}</p>
      </section>
      <section className={styles.messageSection}>
        <h3>My Quick Messages</h3>
        <ul>
          <li>
            <button>predefinedMessage1</button>
          </li>
          <li>
            <button>predefinedMessage2</button>
          </li>
          <li>
            <button>predefinedMessage3</button>
          </li>
        </ul>
      </section>
    </aside>
  );
}
