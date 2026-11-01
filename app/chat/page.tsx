import { getAllBabyData } from '@/database/babies';
import { getAllUserData } from '@/database/users';

export default async function ChatPage() {
  const allBabies = await getAllBabyData();
  const allUsers = await getAllUserData();
  return (
    <>
      <h1>All Babies</h1>
      <ul>
        {allBabies.map((baby) => {
          return <li key={baby.id}>{baby.name}</li>;
        })}
      </ul>
      <h1>All users</h1>
      <ul>
        {allUsers.map((user) => {
          return <li key={user.id}>{user.username}</li>;
        })}
      </ul>
    </>
  );
}
