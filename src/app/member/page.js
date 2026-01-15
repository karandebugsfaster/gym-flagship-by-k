import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import User from "@/models/User";
import LogoutButton from "../components/LogoutButton";
import UserDashboardClient from "../user/UserDashboardClient";

export default async function MemberDashboard() {
  // 1️⃣ Get session
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // 2️⃣ Only members allowed
  if (session.user.role !== "user") {
    redirect("/dashboard");
  }

  // 3️⃣ Fetch member from DB
  await connectDB();

  const member = await User.findById(session.user.id);

  if (!member) {
    redirect("/login");
  }

  return (
    <>
      <div className="p-6 text-white">
        <h1 className="text-3xl font-bold mb-4">Welcome, {member.name} 👋</h1>

        <div className="space-y-2 text-white/80">
          <p>
            <b>Phone:</b> {member.phone}
          </p>
          <p>
            <b>Gym ID:</b> {member.gymId}
          </p>
          <p>
            <b>Member ID:</b> {member.memberId}
          </p>
          <p>
            <b>Gender:</b> {member.gender}
          </p>
          <p>
            <b>Batch:</b> {member.batch}
          </p>
        </div>

        <p className="mt-6 text-sm text-white/50">
          More features coming soon 🚀
        </p>
      </div>
      <UserDashboardClient />
      <LogoutButton />
    </>
  );
}
