export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Membership from "@/models/Membership";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const gymId = searchParams.get("gymId");

  if (!gymId) {
    return NextResponse.json({ error: "Missing gymId" }, { status: 400 });
  }

  const now = new Date();
  const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

  const expiringSoon = await Membership.find({
    gymId,
    status: "active",
    endDate: {
      $gt: now,
      $lte: threeDaysFromNow,
    },
  })
    .populate("userId")
    .populate("planId");

  return NextResponse.json({ expiringSoon });
}
