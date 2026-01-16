import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import Plan from "@/models/Plan";
import Enquiry from "@/models/Enquiry";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Membership from "@/models/Membership";
import { expireOldMemberships } from "@/lib/expireMemberships";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (
      process.env.NODE_ENV !== "development" &&
      (!session || !["admin", "manager"].includes(session.user.role))
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const gymId = searchParams.get("gymId");

    if (!gymId) {
      return NextResponse.json({ error: "Missing gymId" }, { status: 400 });
    }
    await expireOldMemberships(gymId);

    // 📊 TOTAL COUNTS
    const totalMembers = await User.countDocuments({
      gymId,
      role: "user",
    });

    const totalPlans = await Plan.countDocuments({ gymId });

    // 🕒 DATE CALCULATIONS
    const now = new Date();

    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const startOfYear = new Date(now.getFullYear(), 0, 1);

    // 📈 GROWTH METRICS
    const membersToday = await User.countDocuments({
      gymId,
      role: "user",
      createdAt: { $gte: startOfToday },
    });

    const membersThisMonth = await User.countDocuments({
      gymId,
      role: "user",
      createdAt: { $gte: startOfMonth },
    });

    const membersThisYear = await User.countDocuments({
      gymId,
      role: "user",
      createdAt: { $gte: startOfYear },
    });

    const expiredMembers = await Membership.countDocuments({
      gymId,
      $or: [{ status: "expired" }, { endDate: { $lt: now } }],
    });

    const enquiriesHandledToday = await Enquiry.countDocuments({
      gymId,
      updatedAt: { $gte: startOfToday },
    });

    return NextResponse.json({
      totalMembers,
      totalPlans,
      membersToday,
      membersThisMonth,
      membersThisYear,
      expiredMembers,
      enquiriesHandledToday, // 👈 NEW
    });
  } catch (err) {
    console.error("❌ MANAGER STATS ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
