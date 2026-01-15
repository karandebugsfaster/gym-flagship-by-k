import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import Membership from "@/models/Membership";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "user") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const userId = session.user.id;

    // 👤 USER INFO
    const user = await User.findById(userId).select("createdAt");

    // 🎫 ACTIVE MEMBERSHIP
    const membership = await Membership.findOne({
      userId,
      status: "active",
    }).select("endDate");

    return NextResponse.json({
      joiningDate: user?.createdAt || null,
      expiryDate: membership?.endDate || null,
    });
  } catch (err) {
    console.error("❌ USER DASHBOARD ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
