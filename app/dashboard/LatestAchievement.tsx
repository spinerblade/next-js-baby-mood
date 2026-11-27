import type { Achievement } from '@/migrations/00005-createTableAchievements';
import Link from 'next/link';
import styles from './dashboard.module.scss';

type Props = {
  achievement: Achievement | undefined;
};

export default function LatestAchievement(props: Props) {
  return (
    <section className={styles.achievementCard}>
      <h3>Latest Achievement</h3>
      {props.achievement ? (
        <>
          <p>{props.achievement.description}</p>
          <small>
            {props.achievement.date.toLocaleDateString('de-AT', {
              timeZone: 'UTC',
            })}
          </small>
        </>
      ) : (
        <>
          <p>No achievements yet.</p>
          <Link className="buttonLink" href="/achievements">
            Add your baby's first achievements!
          </Link>
        </>
      )}
    </section>
  );
}
