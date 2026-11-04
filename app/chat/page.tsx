import { getAllBabyData } from '@/database/babies';

export default async function ChatPage() {
  const allBabies = await getAllBabyData();

  return (
    <>
      <h1>All Babies</h1>
      <ul>
        {allBabies.map((baby) => {
          return <li key={baby.id}>{baby.name}</li>;
        })}
      </ul>
      <h1>All users</h1>
      <ul></ul>
    </>
  );
}
