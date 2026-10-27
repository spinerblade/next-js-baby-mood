import styles from './dashboard.module.scss';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h2>Placeholder for Sidebar</h2>
      <div>babyName</div>
      <ul>
        <li>birthDate</li>
        <li>weight</li>
        <li>height</li>
      </ul>
      <div>currentMood</div>
      <div>urgentTask</div>
      <div>partnerName</div>
      <div>quickMessages</div>
      <ul>
        <li>predefinedMessage1</li>
        <li>predefinedMessage1</li>
        <li>predefinedMessage1</li>
      </ul>
    </aside>
  );
}
