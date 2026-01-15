import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Enquiry from "@/models/Enquiry";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);

    if (
      process.env.NODE_ENV !== "development" &&
      (!session || !["admin", "manager"].includes(session.user.role))
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { enquiryId, status } = await req.json();

    if (!enquiryId || !status) {
      return NextResponse.json(
        { error: "enquiryId and status required" },
        { status: 400 }
      );
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      enquiryId,
      { status },
      { new: true }
    );

    return NextResponse.json({ enquiry });
  } catch (err) {
    console.error("❌ UPDATE ENQUIRY STATUS ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
