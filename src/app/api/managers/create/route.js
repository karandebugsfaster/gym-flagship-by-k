import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    // 1️⃣ Must be logged in
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ Must be admin
    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 3️⃣ Admin must have gym
    if (!session.user.gymId) {
      return NextResponse.json({ error: "No gym assigned" }, { status: 400 });
    }

    const { name, phone, password } = await req.json();

    if (!name || !phone || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    // 4️⃣ Prevent duplicate phone
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return NextResponse.json(
        { error: "Phone already in use" },
        { status: 409 }
      );
    }

    // 5️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6️⃣ Create manager
    const manager = await User.create({
      name,
      phone,
      password: hashedPassword,
      role: "manager",
      gymId: session.user.gymId,
    });

    return NextResponse.json(
      {
        success: true,
        managerId: manager._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create manager error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
