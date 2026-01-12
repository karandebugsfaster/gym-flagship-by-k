"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="mt-6 px-4 py-2 rounded bg-red-500 text-white"
    >
      Logout
    </button>
  );
}
