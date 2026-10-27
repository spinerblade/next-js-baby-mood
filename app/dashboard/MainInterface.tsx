import Image from 'next/image';
import styles from './MainInterface.module.scss';

export default function MainInterface() {
  return (
    <section className={styles.mainInterface}>
      <h2>Placeholder Main Interface</h2>
      <Image
        src="/images/baby_profile_picture_placeholder.webp"
        alt="profile picture baby"
        width={100}
        height={120}
      />
      <div className={styles.chat}>
        Chat
        <textarea />
      </div>
    </section>
  );
}
