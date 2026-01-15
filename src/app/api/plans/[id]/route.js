import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Plan from "@/models/Plan";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PATCH(req, context) {
  try {
    const { id } = await context.params; // ✅ FIXED HERE

    const session = await getServerSession(authOptions);

    if (
      process.env.NODE_ENV !== "development" &&
      (!session || !["admin", "manager"].includes(session.user.role))
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { name, price, duration, durationType } = await req.json();

    if (!name || !price || !duration || !durationType) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const durationDays = durationType === "months" ? duration * 30 : duration;

    const updatedPlan = await Plan.findByIdAndUpdate(
      id,
      {
        name,
        price,
        durationDays,
      },
      { new: true }
    );

    if (!updatedPlan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    return NextResponse.json({ plan: updatedPlan });
  } catch (err) {
    console.error("❌ UPDATE PLAN ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  try {
    // ✅ unwrap params correctly (same rule as PATCH)
    const { id } = await context.params;

    const session = await getServerSession(authOptions);

    if (
      process.env.NODE_ENV !== "development" &&
      (!session || !["admin", "manager"].includes(session.user.role))
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const deletedPlan = await Plan.findByIdAndDelete(id);

    if (!deletedPlan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ DELETE PLAN ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
