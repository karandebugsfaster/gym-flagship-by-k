import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!["admin", "manager"].includes(session.user.role)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { name, phone, gender, batch, gymId, memberId } = await req.json();

    if (!name || !phone || !gymId || !memberId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ SIMPLE RULE: same gymId = same group
    const existingUser = await User.findOne({
      role: "user",
      gymId: gymId,
      $or: [{ phone }, { memberId }],
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Member already exists" },
        { status: 409 }
      );
    }

    const user = await User.create({
      name,
      phone,
      gender,
      batch,
      gymId, // MANUAL (as you want)
      memberId, // MANUAL
      role: "user",
      password: "TEMP",
    });

    return NextResponse.json(
      {
        message: "Member added successfully",
        user: {
          id: user._id.toString(),
          name: user.name,
          phone: user.phone,
          gymId: user.gymId,
          memberId: user.memberId,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Add member error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
