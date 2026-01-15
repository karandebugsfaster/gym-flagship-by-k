import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Membership from "@/models/Membership";
import Plan from "@/models/Plan";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export async function GET(req) {
  try {
    // 🔐 AUTH
    const session = await getServerSession(authOptions);

    if (
      process.env.NODE_ENV !== "development" &&
      (!session || session.user.role !== "admin")
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // 📌 GET gymId
    const { searchParams } = new URL(req.url);
    const gymId = searchParams.get("gymId");

    if (!gymId) {
      return NextResponse.json({ error: "Missing gymId" }, { status: 400 });
    }

    // 🕒 DATE BOUNDARIES
    const now = new Date();

    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    // 📦 FETCH MEMBERSHIPS + PLAN
    const memberships = await Membership.find({ gymId }).populate("planId");

    // 💰 SALES CALCULATIONS
    let totalSales = 0;
    let salesToday = 0;
    let salesThisMonth = 0;
    let salesThisYear = 0;

    memberships.forEach((m) => {
      if (!m.planId) return;

      const price = m.planId.price || 0;
      const createdAt = new Date(m.createdAt);

      totalSales += price;

      if (createdAt >= startOfToday) {
        salesToday += price;
      }

      if (createdAt >= startOfMonth) {
        salesThisMonth += price;
      }

      if (createdAt >= startOfYear) {
        salesThisYear += price;
      }
    });

    return NextResponse.json({
      totalSales,
      salesToday,
      salesThisMonth,
      salesThisYear,
    });
  } catch (err) {
    console.error("❌ OWNER SALES ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
