import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "../components/LogoutButton";
import UserDashboardClient from "../user/UserDashboardClient";

export default async function UserDashboardPage() {
  // 1️⃣ SESSION
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // 2️⃣ ONLY MEMBERS
  if (session.user.role !== "user") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen p-6 text-white space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Welcome, {session.user.name} 👋</h1>
        <p className="text-white/60 text-sm">Member Dashboard</p>
      </div>

      {/* BASIC INFO */}
      <div className="rounded-xl border border-white/20 p-4 space-y-2 bg-white/5">
        <p>
          <b>Phone:</b> {session.user.phone}
        </p>
        <p>
          <b>Gym ID:</b> {session.user.gymId}
        </p>
        <p>
          <b>Member ID:</b> {session.user.id}
        </p>
      </div>

      {/* MEMBERSHIP INFO (CLIENT) */}
      <UserDashboardClient gymId={session.user.gymId} />

      {/* LOGOUT */}
      <div className="pt-6">
        <LogoutButton />
      </div>
    </div>
  );
}
