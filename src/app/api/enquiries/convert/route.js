import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Enquiry from "@/models/Enquiry";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (
      process.env.NODE_ENV !== "development" &&
      (!session || !["admin", "manager"].includes(session.user.role))
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { enquiryId, gymId } = await req.json();

    if (!enquiryId || !gymId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const enquiry = await Enquiry.findById(enquiryId);
    if (!enquiry) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    // 🚫 prevent double conversion
    if (enquiry.status === "converted") {
      return NextResponse.json({ error: "Already converted" }, { status: 409 });
    }

    // ✅ create member
    const user = await User.create({
      name: enquiry.name,
      phone: enquiry.phone,
      gymId,
      role: "user",
      password: "TEMP",
    });

    // ✅ mark enquiry converted
    enquiry.status = "converted";
    await enquiry.save();

    return NextResponse.json({
      success: true,
      userId: user._id,
    });
  } catch (err) {
    console.error("❌ CONVERT ENQUIRY ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
