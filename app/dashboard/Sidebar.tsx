import styles from './Sidebar.module.scss';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h2>Placeholder for Sidebar</h2>
      <section className={styles.babySection}>
        <h3>My Baby</h3>
        <dl>
          <dt>Baby Name</dt>
          <dd>babyName</dd>
          <dt>Birth Date</dt>
          <dd>birthDate</dd>
          <dt>Weight</dt>
          <dd>weight</dd>
          <dt>Height</dt>
          <dd>height</dd>
          <dt>Mood</dt>
          <dd>currentMood</dd>
        </dl>
      </section>
      <section className={styles.partnerSection}>
        <h3>My Partner</h3>
        <p>partnerName</p>
        <p>urgentTask</p>
      </section>
      <section className={styles.messageSection}>
        <h3>My Quick Messages</h3>
        <ul>
          <li>
            <button>predefinedMessage1</button>
          </li>
          <li>
            <button>predefinedMessage2</button>
          </li>
          <li>
            <button>predefinedMessage3</button>
          </li>
        </ul>
      </section>
    </aside>
  );
}
