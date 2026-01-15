// src/app/api/memberships/by-user/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Membership from "@/models/Membership";
import { expireOldMemberships } from "@/lib/expireMemberships";
import User from "@/models/User";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  // 🔥 STEP 1: get user's gymId (IMPORTANT)
  const user = await User.findById(userId);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // 🔥 STEP 2: AUTO-EXPIRE memberships for this gym
  await expireOldMemberships(user.gymId);

  // 🔥 STEP 3: fetch latest membership (active OR expired)
  const membership = await Membership.findOne({
    userId,
  })
    .sort({ endDate: -1 }) // latest membership
    .populate("planId");

  return NextResponse.json({ membership });
}
