import { getAchievements } from '@/database/achievements';
import { getMessages } from '@/database/messages';
import { getMoods } from '@/database/moods';
import { getPartner } from '@/database/parentConnection';
import { getQuickMessages } from '@/database/quickMessages';
import { getValidSession } from '@/database/sessions';
import { getUser } from '@/database/users';
import { getCookie } from '@/util/cookies';
import { getSelectedBaby } from '@/util/selectedBaby';
import { redirect } from 'next/navigation';
import Chat from './Chat';
import styles from './dashboard.module.scss';
import LatestAchievement from './LatestAchievement';
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
  const quickMessages = await getQuickMessages(sessionToken);
  const messages = await getMessages(sessionToken);
  const latestMoodMessage = messages.findLast(
    (message) => message.moodTypeId !== null && message.babyId === baby.id,
  );
  const achievements = await getAchievements(sessionToken, baby.id);
  const latestAchievement = achievements.at(-1);

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar
        baby={baby}
        partner={partner}
        latestMoodMessage={latestMoodMessage}
      />
      <main className={styles.mainContent}>
        <div className={styles.row}>
          <MainInterface>
            <Chat
              user={user}
              partner={partner}
              messages={messages}
              moods={moods}
              quickMessages={quickMessages}
              babyId={baby.id}
            />
          </MainInterface>
          <LatestAchievement achievement={latestAchievement} />
        </div>
      </main>
    </div>
  );
}
