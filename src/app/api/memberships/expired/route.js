import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
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

    const now = new Date();

    const expiredMemberships = await Membership.find({
      gymId,
      $or: [{ status: "expired" }, { endDate: { $lt: now } }],
    })
      .populate("userId")
      .populate("planId")
      .sort({ endDate: -1 });

    return NextResponse.json({ expiredMemberships });
  } catch (err) {
    console.error("❌ FETCH EXPIRED MEMBERS ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
