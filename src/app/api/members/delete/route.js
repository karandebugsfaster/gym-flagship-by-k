import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import User from "@/models/User";
import Membership from "@/models/Membership";

export async function DELETE(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session || !["admin", "manager"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const membershipId = searchParams.get("membershipId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // Delete all memberships for this user
    if (membershipId) {
      await Membership.findByIdAndDelete(membershipId);
    } else {
      await Membership.deleteMany({ userId });
    }

    // Delete the user
    await User.findByIdAndDelete(userId);

    return NextResponse.json({
      success: true,
      message: "Member and all associated memberships deleted successfully",
    });
  } catch (err) {
    console.error("❌ DELETE MEMBER ERROR:", err);
    return NextResponse.json(
      { error: "Server error", details: err.message },
      { status: 500 },
    );
  }
}
