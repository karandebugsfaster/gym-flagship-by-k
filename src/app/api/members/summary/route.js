import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import Membership from "@/models/Membership";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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

    // 🔥 Fetch all members of gym
    const members = await User.find({
      gymId,
      role: "user",
    }).select("name memberId phone");

    // 🔥 Fetch memberships in ONE go
    const memberships = await Membership.find({ gymId }).select(
      "userId endDate",
    );

    const membershipMap = {};
    memberships.forEach((m) => {
      membershipMap[m.userId.toString()] = m;
    });

    const today = new Date();

    const result = members.map((m) => {
      const membership = membershipMap[m._id.toString()];

      let daysLeft = null;

      if (membership?.endDate) {
        const diff = Math.ceil(
          (new Date(membership.endDate) - today) / (1000 * 60 * 60 * 24),
        );
        daysLeft = diff > 0 ? diff : 0;
      }

      return {
        _id: m._id,
        name: m.name,
        memberId: m.memberId,
        phone: m.phone,
        daysLeft, // 👈 THIS IS WHAT UI NEEDS
      };
    });

    return NextResponse.json({ members: result });
  } catch (err) {
    console.error("❌ MEMBER SUMMARY ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
