import type { ReactNode } from 'react';
import styles from './MainInterface.module.scss';

type Props = {
  children: ReactNode;
};

export default function MainInterface(props: Props) {
  return (
    <section className={styles.mainInterface}>
      <div className={styles.chat}>{props.children}</div>
    </section>
  );
}
