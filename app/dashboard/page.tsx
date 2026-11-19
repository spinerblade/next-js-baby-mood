import { getMessages } from '@/database/messages';
import { getMoods } from '@/database/moods';
import { getPartner } from '@/database/parentConnection';
import { getValidSession } from '@/database/sessions';
import { getUser } from '@/database/users';
import { getCookie } from '@/util/cookies';
import { getSelectedBaby } from '@/util/selectedBaby';
import { redirect } from 'next/navigation';
import Chat from './Chat';
import styles from './dashboard.module.scss';
import MainInterface from './MainInterface';
import Sidebar from './Sidebar';

export const metadata = {
  title: 'Dashboard of your baby',
  description: 'The dashboard where the user sees all.',
};

export default async function DashboardPage() {
  const sessionToken = await getCookie('sessionToken');
  const session = !!sessionToken && (await getValidSession(sessionToken));

  if (!session) {
    redirect('/login?returnTo=/dashboard');
  }
  const baby = await getSelectedBaby(sessionToken);
  if (!baby) {
    redirect('/onboarding');
  }

  const user = await getUser(sessionToken);
  if (!user) {
    redirect('/login?returnTo=/dashboard');
  }

  const partner = await getPartner(sessionToken);
  const moods = await getMoods(sessionToken);

  const messages = await getMessages(sessionToken);

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar
        baby={baby}
        partner={partner}
        moods={moods}
        username={user.username}
      />
      <main className={styles.mainContent}>
        <h1>Dashboard</h1>
        <MainInterface baby={baby}>
          <Chat
            user={user}
            partner={partner}
            messages={messages}
            moods={moods}
            babyId={baby.id}
          />
        </MainInterface>
      </main>
    </div>
  );
}
