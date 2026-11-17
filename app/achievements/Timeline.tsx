import type { Achievement } from '@/migrations/00005-createTableAchievements';
import styles from './Timeline.module.scss';
import TimelineItem from './TimelineItem';

type Props = {
  achievements: Achievement[];
};

export default function Timeline(props: Props) {
  return (
    <ul className={styles.timeline}>
      {props.achievements.map((achievement) => {
        return <TimelineItem key={achievement.id} achievement={achievement} />;
      })}
    </ul>
  );
}
