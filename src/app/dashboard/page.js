import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "../components/LogoutButton";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // ❌ NOT LOGGED IN
  if (!session) {
    redirect("/login");
  }

  const { role, gymId } = session.user;

  // ❌ MEMBER SHOULD NEVER ACCESS DASHBOARD
  if (role === "user") {
    redirect("/member");
  }

  // ❌ NO GYM ASSIGNED (admin / manager misconfigured)
  if (!gymId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <h1 className="text-xl font-bold">
          No gym assigned. Please contact admin.
        </h1>
      </div>
    );
  }

  // 👑 ADMIN DASHBOARD
  if (role === "admin") {
    return (
      <div className="p-8 text-white space-y-6">
        <h1 className="text-3xl font-bold">Admin Dashboard 👑</h1>

        <p className="text-white/70">You are the gym owner</p>

        <p className="text-white/70">
          Gym ID: <b>{gymId}</b>
        </p>

        <div className="flex gap-4 mt-6">
          <Link
            href="/manager"
            className="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700 transition"
          >
            Open Manager
          </Link>

          <Link
            href="/owner/sales"
            className="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700 transition"
          >
            Open Sales
          </Link>
        </div>

        <LogoutButton />
      </div>
    );
  }

  // 🧑‍💼 MANAGER DASHBOARD
  if (role === "manager") {
    return (
      <div className="p-8 text-white space-y-6">
        <h1 className="text-3xl font-bold">Manager Dashboard 🧑‍💼</h1>

        <p className="text-white/70">You manage daily gym operations</p>

        <p className="text-white/70">
          Gym ID: <b>{gymId}</b>
        </p>

        <div className="flex gap-4 mt-6">
          <Link
            href="/manager"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition"
          >
            Go to Manager Panel
          </Link>
        </div>

        <LogoutButton />
      </div>
    );
  }

  // 🚨 FALLBACK (SHOULD NEVER HIT)
  redirect("/login");
}
