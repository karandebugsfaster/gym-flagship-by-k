import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import Plan from "@/models/Plan";

export async function GET(req) {
  await connectDB();

  const session = await getServerSession(authOptions);

  // 1️⃣ Auth check
  //   if (!session || !["admin", "manager"].includes(session.user.role)) {
  //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  //   }
  if (
    process.env.NODE_ENV !== "development" &&
    (!session || !["admin", "manager"].includes(session.user.role))
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2️⃣ Get gymId from query
  const { searchParams } = new URL(req.url);
  const gymId = searchParams.get("gymId");

  if (!gymId) {
    return NextResponse.json({ error: "gymId is required" }, { status: 400 });
  }

  // 3️⃣ Fetch plans
  const plans = await Plan.find({ gymId }).sort({ createdAt: -1 });

  // 4️⃣ Return plans
  return NextResponse.json({ plans });
}
