import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Membership from "@/models/Membership";
import Expense from "@/models/Expense";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
  try {
    // 🔐 OWNER CHECK (SAFE)
    if (process.env.NODE_ENV !== "development") {
      const session = await getServerSession(authOptions);
      if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const gymId = searchParams.get("gymId");
    if (!gymId) {
      return NextResponse.json({ error: "Missing gymId" }, { status: 400 });
    }

    const memberships = await Membership.find({ gymId }).populate("planId");
    const expenses = await Expense.find({ gymId });
    const users = await User.find({ gymId, role: "user" });

    const monthlyStats = {};

    // 💰 SALES
    memberships.forEach((m) => {
      if (!m.planId || !m.createdAt) return;
      const d = new Date(m.createdAt);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`;

      monthlyStats[key] ??= {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        sales: 0,
        expenses: 0,
        membersJoined: 0,
      };

      monthlyStats[key].sales += Number(m.planId.price || 0);
    });

    // 💸 EXPENSES
    expenses.forEach((e) => {
      const d = new Date(e.createdAt);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`;

      monthlyStats[key] ??= {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        sales: 0,
        expenses: 0,
        membersJoined: 0,
      };

      monthlyStats[key].expenses += Number(e.amount || 0);
    });

    // 👥 MEMBERS JOINED
    users.forEach((u) => {
      const d = new Date(u.createdAt);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`;

      monthlyStats[key] ??= {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        sales: 0,
        expenses: 0,
        membersJoined: 0,
      };

      monthlyStats[key].membersJoined += 1;
    });

    const history = Object.values(monthlyStats)
      .map((m) => ({
        ...m,
        profit: m.sales - m.expenses,
      }))
      .sort((a, b) =>
        a.year === b.year ? a.month - b.month : a.year - b.year
      );

    return NextResponse.json({ history });
  } catch (err) {
    console.error("❌ MONTHLY HISTORY ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
