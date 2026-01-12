import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { name, phone, gender, batch } = await req.json();

    if (!name || !phone) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const user = await User.create({
      name,
      phone,
      gender,
      batch,
      role: "user",
      gymId: session.user.gymId,
      password: "TEMP",
    });

    return NextResponse.json(
      { message: "Member added", user },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
