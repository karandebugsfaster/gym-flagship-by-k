import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { expireOldMemberships } from "@/lib/expireMemberships";

export async function GET() {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!["admin", "manager"].includes(session.user.role)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // 🔥 THIS IS THE KEY LINE
    const members = await User.find({
      role: "user",
      // gymId: session.user.gymId, // e.g. "1"
      gymId: "1",
    }).sort({ createdAt: -1 });

    await expireOldMemberships("1"); // later replace with session.user.gymId

    return NextResponse.json({ members });
  } catch (err) {
    console.error("Fetch members error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
