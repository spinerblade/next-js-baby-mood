import Link from 'next/link';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <p>BabyMood GmbH, Kevin Buchmann All rights reserved</p>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>
      </nav>
      <address>Vienna, Austria</address>
    </footer>
  );
}
