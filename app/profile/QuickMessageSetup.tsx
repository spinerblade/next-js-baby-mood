import type { QuickMessageType } from '@/migrations/00009-createTableQuickMessageTypes';
import type { QuickMessage } from '@/migrations/00011-createTableQuickMessages';
import styles from './profile.module.scss';
import QuickMessageForm from './QuickMessageForm';
import QuickMessageItem from './QuickMessageItem';

type Props = {
  quickMessageTypes: QuickMessageType[];
  quickMessages: QuickMessage[];
};

export default function QuickMessageSetup(props: Props) {
  return (
    <section className={styles.card}>
      <h2>Quick Messages</h2>
      {props.quickMessages.length === 0 && <p>No quick messages added yet</p>}
      <ul className={styles.list}>
        {props.quickMessages.map((quickMessage) => (
          <QuickMessageItem
            key={`quickMessage-${quickMessage.id}`}
            quickMessage={quickMessage}
            quickMessageTypes={props.quickMessageTypes}
          />
        ))}
      </ul>
      <QuickMessageForm quickMessageTypes={props.quickMessageTypes} />
    </section>
  );
}
