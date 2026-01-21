import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import Membership from "@/models/Membership";
import Plan from "@/models/Plan";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
  try {
    // 🔐 AUTH
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
      return NextResponse.json({ error: "gymId is required" }, { status: 400 });
    }

    // 🧠 AGGREGATION PIPELINE
    const members = await User.aggregate([
      {
        $match: {
          gymId,
          role: "user",
        },
      },
      {
        $lookup: {
          from: "memberships",
          localField: "_id",
          foreignField: "userId",
          as: "membership",
        },
      },
      {
        $unwind: {
          path: "$membership",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "plans",
          localField: "membership.planId",
          foreignField: "_id",
          as: "plan",
        },
      },
      {
        $unwind: {
          path: "$plan",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          name: 1,
          phone: 1,
          memberId: 1,
          gender: 1,
          batch: 1,
          membership: {
            endDate: "$membership.endDate",
            planName: "$plan.name",
          },
        },
      },
    ]);

    return NextResponse.json({ members });
  } catch (err) {
    console.error("❌ MEMBERS WITH MEMBERSHIP ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
