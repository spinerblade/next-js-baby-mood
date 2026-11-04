'use client';
import { logout } from './actions';

export default function LogoutButton() {
  return (
    <>
      <form>
        <button
          className="bg-amber-600 hover:bg-sky-400 w-20 h-8"
          formAction={logout}
        >
          Logout
        </button>
      </form>
    </>
  );
}
