import {
  getAcceptedParentConnection,
  getParentConnectionRequests,
} from '@/database/parentConnection';
import { getUser } from '@/database/users';
import { getCookie } from '@/util/cookies';
import { redirect } from 'next/navigation';
import BabyForm from './BabyForm';
import OnboardingForm from './OnboardingForm';
import PartnerRequests from './PartnerRequests';

export const metadata = {
  title: 'Onboarding',
  description: 'Setup your account and connection to your partner',
};

export default async function Onboarding() {
  const sessionToken = await getCookie('sessionToken');
  const user = !!sessionToken && (await getUser(sessionToken));

  if (!user) {
    redirect('/login?returnTo=/onboarding');
  }
  const connectionRequests = await getParentConnectionRequests(sessionToken);

  const acceptedConnection = await getAcceptedParentConnection(sessionToken);
  return (
    <>
      <h1>Setup your Account details</h1>
      {acceptedConnection ? (
        <BabyForm />
      ) : (
        <>
          <OnboardingForm />
          <PartnerRequests requests={connectionRequests} />
        </>
      )}
    </>
  );
}
