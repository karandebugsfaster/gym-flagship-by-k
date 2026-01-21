import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TotalMembersClient from "@/app/components/TotalMembersClient";

export default async function TotalMembersPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  if (!["admin", "manager"].includes(session.user.role)) {
    redirect("/dashboard");
  }

  return (
    <div>
      {/* <h1 className="text-xl font-bold text-white mb-4">Total Members</h1> */}

      <TotalMembersClient gymId="1" />
    </div>
  );
}
