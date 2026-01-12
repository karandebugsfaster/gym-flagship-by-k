// only admin folder
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import Gym from "@/models/Gym";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // only admin can create gym
    if (session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Only admin can create gym" },
        { status: 403 }
      );
    }

    const { name } = await req.json();

    if (!name) {
      return NextResponse.json(
        { message: "Gym name is required" },
        { status: 400 }
      );
    }

    // create gym
    const gym = await Gym.create({
      name,
      ownerId: session.user.id,
    });

    // attach gymId to admin
    await User.findByIdAndUpdate(session.user.id, {
      gymId: gym._id.toString(),
    });

    return NextResponse.json(
      {
        message: "Gym created successfully",
        gym,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
