import type { QuickMessageType } from '@/migrations/00009-createTableQuickMessageTypes';
import type { QuickMessage } from '@/migrations/00011-createTableQuickMessages';
import QuickMessageForm from './QuickMessageForm';
import QuickMessageItem from './QuickMessageItem';

type Props = {
  quickMessageTypes: QuickMessageType[];
  quickMessages: QuickMessage[];
};

export default function QuickMessageSetup(props: Props) {
  return (
    <>
      <h4>Quick message setup</h4>
      <QuickMessageForm quickMessageTypes={props.quickMessageTypes} />
      <h5>Your Quick Messages</h5>
      {props.quickMessages.length === 0 && <p>No quick messages added yet</p>}
      <ul>
        {props.quickMessages.map((quickMessage) => (
          <QuickMessageItem
            key={`quickMessage-${quickMessage.id}`}
            quickMessage={quickMessage}
            quickMessageTypes={props.quickMessageTypes}
          />
        ))}
      </ul>
    </>
  );
}
