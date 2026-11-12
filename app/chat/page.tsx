import { getBabies } from '@/database/babies';
import { getMessages } from '@/database/messages';
import { getMoods } from '@/database/moods';
import { getMoodTypes } from '@/database/moodTypes';
import { getPartner } from '@/database/parentConnection';
import { getValidSession } from '@/database/sessions';
import { getUser } from '@/database/users';
import { getCookie } from '@/util/cookies';
import { redirect } from 'next/navigation';
import MoodForm from './MoodForm';
import MoodItem from './MoodItem';
import SendMood from './SendMood';

export default async function ChatPage() {
  const sessionToken = await getCookie('sessionToken');
  const session = !!sessionToken && (await getValidSession(sessionToken));

  if (!session) {
    redirect('/login?returnTo=/chat');
  }
  const moodTypes = await getMoodTypes(sessionToken);
  const moods = await getMoods(sessionToken);
  const user = await getUser(sessionToken);
  if (!user) {
    redirect('/login?returnTo=/chat');
  }
  const partner = await getPartner(sessionToken);
  if (!partner) {
    return <p>Connect with your your partner first to use the chat!</p>;
  }
  const babies = await getBabies(sessionToken);
  const messages = await getMessages(sessionToken);
  return (
    <>
      <h1>Chat</h1>
      <h2>Mood setup</h2>
      <MoodForm moodTypes={moodTypes} />
      <h2>Your Moods</h2>
      {moods.length === 0 && <p>No moods added yet</p>}
      <ul>
        {moods.map((mood) => {
          return <MoodItem key={mood.id} mood={mood} moodTypes={moodTypes} />;
        })}
      </ul>
      <h2>Messages</h2>
      {messages.length === 0 && <p>No messages yet</p>}
      <ul>
        {messages.map((message) => {
          return (
            <li key={message.id}>
              {message.senderId === user.id
                ? 'You'
                : (partner.firstName ?? partner.username)}
              :{message.emoji} {message.content}
              {message.babyName && ` – ${message.babyName}`}
              <small>{message.sentAt.toLocaleTimeString()}</small>
            </li>
          );
        })}
      </ul>
      <SendMood moods={moods} babies={babies} />
    </>
  );
}
