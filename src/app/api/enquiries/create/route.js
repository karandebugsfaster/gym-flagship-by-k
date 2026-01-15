import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Enquiry from "@/models/Enquiry";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
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

    const body = await req.json();
    const { gymId, name, phone, address, note } = body;

    // 🧪 VALIDATION
    if (!gymId || !name || !phone) {
      return NextResponse.json(
        { error: "gymId, name and phone are required" },
        { status: 400 }
      );
    }

    // 📦 CREATE ENQUIRY
    const enquiry = await Enquiry.create({
      gymId,
      name,
      phone,
      address: address || "",
      note: note || "",
      status: "new",
    });

    return NextResponse.json({ enquiry }, { status: 201 });
  } catch (err) {
    console.error("❌ CREATE ENQUIRY ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
