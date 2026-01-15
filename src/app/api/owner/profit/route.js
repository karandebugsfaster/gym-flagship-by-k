import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Membership from "@/models/Membership";
import Expense from "@/models/Expense";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
  try {
    // 🔐 OWNER ONLY
    const session = await getServerSession(authOptions);

    if (
      process.env.NODE_ENV !== "development" &&
      (!session || session.user.role !== "admin")
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // 📌 gymId
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

    // 📦 FETCH SALES DATA
    const memberships = await Membership.find({ gymId }).populate("planId");

    // 📦 FETCH EXPENSE DATA
    const expenses = await Expense.find({ gymId });

    // 💰 SALES CALC
    let salesToday = 0;
    let salesThisMonth = 0;
    let salesThisYear = 0;

    memberships.forEach((m) => {
      if (!m.planId) return;

      const price = m.planId.price || 0;
      const createdAt = new Date(m.createdAt);

      if (createdAt >= startOfToday) salesToday += price;
      if (createdAt >= startOfMonth) salesThisMonth += price;
      if (createdAt >= startOfYear) salesThisYear += price;
    });

    // 💸 EXPENSE CALC
    let expenseToday = 0;
    let expenseThisMonth = 0;
    let expenseThisYear = 0;

    expenses.forEach((e) => {
      const amount = e.amount || 0;
      const createdAt = new Date(e.createdAt);

      if (createdAt >= startOfToday) expenseToday += amount;
      if (createdAt >= startOfMonth) expenseThisMonth += amount;
      if (createdAt >= startOfYear) expenseThisYear += amount;
    });

    // 🧮 PROFIT
    return NextResponse.json({
      profitToday: salesToday - expenseToday,
      profitThisMonth: salesThisMonth - expenseThisMonth,
      profitThisYear: salesThisYear - expenseThisYear,

      // optional raw numbers (VERY useful)
      sales: {
        today: salesToday,
        month: salesThisMonth,
        year: salesThisYear,
      },
      expenses: {
        today: expenseToday,
        month: expenseThisMonth,
        year: expenseThisYear,
      },
    });
  } catch (err) {
    console.error("❌ PROFIT API ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
