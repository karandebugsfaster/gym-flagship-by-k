import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ManagerClient from "@/app/components/ManagerClient";

export default async function ManagerPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  if (!["admin", "manager"].includes(session.user.role)) {
    redirect("/dashboard");
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Manager Dashboard</h1>
      <ManagerClient />
    </div>
  );
}

// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { connectDB } from "@/lib/db";
// import User from "@/models/User";

// export async function GET() {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   if (!["admin", "manager"].includes(session.user.role)) {
//     return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//   }

//   await connectDB();

//   const members = await User.find({
//     gymId: session.user.gymId,
//     role: "user",
//   }).select("name phone gender batch createdAt");

//   return NextResponse.json({ members });
// }

