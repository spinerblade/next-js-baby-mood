import type { Baby } from '@/migrations/00004-createTableBabies';
import Image from 'next/image';
import type { ReactNode } from 'react';
import ImageUpload from '../ImageUpload';
import { updateBabyPicture } from '../profile/actions';
import CloudinaryImage from '../profile/Cloudinary';
import styles from './MainInterface.module.scss';

type Props = {
  children: ReactNode;
  baby: Baby;
};

export default function MainInterface(props: Props) {
  return (
    <section className={styles.mainInterface}>
      <h2>Main Interface</h2>
      {props.baby.profilePictureUrl ? (
        <CloudinaryImage
          publicId={props.baby.profilePictureUrl}
          alt={props.baby.name}
          width={100}
          height={120}
        />
      ) : (
        <Image
          src="/images/baby_profile_picture_placeholder.webp"
          alt="profile picture baby"
          width={100}
          height={120}
        />
      )}
      <ImageUpload
        folder="babies"
        label="Upload baby picture"
        onUpload={updateBabyPicture.bind(null, props.baby.id)}
      />

      <div className={styles.chat}>{props.children}</div>
    </section>
  );
}
