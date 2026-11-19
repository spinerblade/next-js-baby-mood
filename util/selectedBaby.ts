import { getBabies, getBaby } from '@/database/babies';
import { babyIdSchema } from '@/migrations/00004-createTableBabies';
import type { Session } from '@/migrations/00014-createTableSessions';
import { getCookie } from './cookies';

export async function getSelectedBaby(sessionToken: Session['token']) {
  const selectedBabyId = await getCookie('selectedBabyId');
  if (selectedBabyId) {
    const result = babyIdSchema.safeParse(selectedBabyId);
    if (result.success) {
      const baby = await getBaby(sessionToken, result.data);

      if (baby) {
        return baby;
      }
    }
  }
  const babies = await getBabies(sessionToken);
  return babies[0];
}
