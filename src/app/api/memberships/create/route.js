import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Membership from "@/models/Membership";
import Plan from "@/models/Plan";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { expireOldMemberships } from "@/lib/expireMemberships";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (
      process.env.NODE_ENV !== "development" &&
      (!session || !["admin", "manager"].includes(session.user.role))
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { userId, planId, gymId } = await req.json();

    if (!userId || !planId || !gymId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 🔥 STEP 1: Expire old memberships for this gym
    await expireOldMemberships(gymId);

    // 🔥 STEP 2: Expire any active membership of this user (plan change)
    await Membership.updateMany(
      { userId, status: "active" },
      { $set: { status: "expired" } }
    );

    // 📦 STEP 3: Fetch plan
    const plan = await Plan.findById(planId);
    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    // 🗓️ STEP 4: Calculate dates
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.durationDays);

    // ✅ STEP 5: Create membership
    const membership = await Membership.create({
      userId,
      planId,
      gymId,
      startDate,
      endDate,
      status: "active",
    });

    return NextResponse.json({ membership });
  } catch (err) {
    console.error("❌ CREATE MEMBERSHIP ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
