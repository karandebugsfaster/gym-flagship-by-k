import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Enquiry from "@/models/Enquiry";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(req) {
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
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    await Enquiry.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ DELETE ENQUIRY ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
