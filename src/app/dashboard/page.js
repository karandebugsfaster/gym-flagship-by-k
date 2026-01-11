"use client";

import { useSession, signOut } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>Not logged in</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <p>Name: {session.user.name}</p>
      <p>Phone: {session.user.phone}</p>
      <p>Role: {session.user.role}</p>
      <p>Gym ID: {session.user.gymId}</p>

      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}
