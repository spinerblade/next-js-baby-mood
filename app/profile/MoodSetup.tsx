import type { MoodType } from '@/migrations/00006-createTableMoodTypes';
import type { Mood } from '@/migrations/00008-createTableMoods';
import MoodForm from './MoodForm';
import MoodItem from './MoodItem';

type Props = {
  moodTypes: MoodType[];
  moods: Mood[];
};

export default function MoodSetup(props: Props) {
  return (
    <>
      <h4>Mood setup</h4>
      <MoodForm moodTypes={props.moodTypes} />
      <h5>Your Moods</h5>
      {props.moods.length === 0 && <p>No moods added yet</p>}
      <ul>
        {props.moods.map((mood) => {
          return (
            <MoodItem key={mood.id} mood={mood} moodTypes={props.moodTypes} />
          );
        })}
      </ul>
    </>
  );
}
