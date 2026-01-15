import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Enquiry from "@/models/Enquiry";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
  try {
    // 🔐 AUTH
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

    // 📋 FETCH ENQUIRIES
    const enquiries = await Enquiry.find({ gymId }).sort({ createdAt: -1 });

    return NextResponse.json({ enquiries });
  } catch (err) {
    console.error("❌ FETCH ENQUIRIES ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
