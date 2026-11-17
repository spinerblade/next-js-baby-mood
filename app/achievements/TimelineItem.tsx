import type { Achievement } from '@/migrations/00005-createTableAchievements';
import styles from './Timeline.module.scss';

type Props = {
  achievement: Achievement;
};

export default function TimelineItem(props: Props) {
  return (
    <li className={styles.item}>
      <p>{props.achievement.description}</p>
      <time dateTime={props.achievement.date.toISOString()}>
        {props.achievement.date.toLocaleDateString('de-AT')}
      </time>
    </li>
  );
}
