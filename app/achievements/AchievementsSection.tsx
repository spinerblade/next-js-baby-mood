'use client';

import type { Baby } from '@/migrations/00004-createTableBabies';
import type { Achievement } from '@/migrations/00005-createTableAchievements';
import { useState } from 'react';
import AchievementForm from './AchievementForm';
import Timeline from './Timeline';

type Props = {
  achievements: Achievement[];
  babyId: Baby['id'];
};

export default function AchievementsSection(props: Props) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      <Timeline achievements={props.achievements} isEditing={isEditing} />
      <AchievementForm
        babyId={props.babyId}
        onToggleEditing={() => {
          setIsEditing(!isEditing);
        }}
        isEditing={isEditing}
      />
    </>
  );
}
