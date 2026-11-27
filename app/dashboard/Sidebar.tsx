import type { MessageWithBabyName } from '@/database/messages';
import type { Partner } from '@/database/parentConnection';
import type { Baby } from '@/migrations/00004-createTableBabies';
import { formatHeight, formatWeight, getDisplayName } from '@/util/format';
import ImageUpload from '../ImageUpload';
import { updateBabyPicture } from '../profile/actions';
import CloudinaryImage from '../profile/CloudinaryImage';
import styles from './Sidebar.module.scss';

type Props = {
  baby: Baby;
  partner: Partner | undefined;
  latestMoodMessage: MessageWithBabyName | undefined;
};

export default function Sidebar(props: Props) {
  return (
    <aside className={styles.sidebar}>
      <h2>My Baby</h2>
      {props.baby.profilePictureUrl ? (
        <CloudinaryImage
          publicId={props.baby.profilePictureUrl}
          alt={props.baby.name}
          width={100}
          height={120}
        />
      ) : null}
      <ImageUpload
        folder="babies"
        label="Upload baby picture"
        onUpload={updateBabyPicture.bind(null, props.baby.id)}
      />
      <section className={styles.section}>
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
