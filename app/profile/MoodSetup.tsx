import type { MoodType } from '@/migrations/00006-createTableMoodTypes';
import type { Mood } from '@/migrations/00008-createTableMoods';
import MoodForm from './MoodForm';
import MoodItem from './MoodItem';
import styles from './profile.module.scss';

type Props = {
  moodTypes: MoodType[];
  moods: Mood[];
};

export default function MoodSetup(props: Props) {
  return (
    <section className={styles.card}>
      <h2>Moods</h2>
      {props.moods.length === 0 && <p>No moods added yet</p>}
      <ul className={styles.list}>
        {props.moods.map((mood) => (
          <MoodItem key={mood.id} mood={mood} moodTypes={props.moodTypes} />
        ))}
      </ul>
      <MoodForm moodTypes={props.moodTypes} />
    </section>
  );
}
