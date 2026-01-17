// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Membership from "@/models/Membership";
// import Expense from "@/models/Expense";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// export async function GET(req) {
//   try {
//     // 🔐 OWNER ONLY
//     const session = await getServerSession(authOptions);

//     if (
//       process.env.NODE_ENV !== "development" &&
//       (!session || session.user.role !== "admin")
//     ) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     await connectDB();

//     // 📌 gymId
//     const { searchParams } = new URL(req.url);
//     const gymId = searchParams.get("gymId");

//     if (!gymId) {
//       return NextResponse.json({ error: "Missing gymId" }, { status: 400 });
//     }

//     // 🕒 DATE BOUNDARIES
//     const now = new Date();

//     const startOfToday = new Date(
//       now.getFullYear(),
//       now.getMonth(),
//       now.getDate()
//     );

//     const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
//     const startOfYear = new Date(now.getFullYear(), 0, 1);

//     // 📦 FETCH SALES DATA
//     const memberships = await Membership.find({ gymId }).populate("planId");

//     // 📦 FETCH EXPENSE DATA
//     const expenses = await Expense.find({ gymId });

//     // 💰 SALES CALC
//     let salesToday = 0;
//     let salesThisMonth = 0;
//     let salesThisYear = 0;

//     memberships.forEach((m) => {
//       if (!m.planId) return;

//       const price = m.planId.price || 0;
//       const createdAt = new Date(m.createdAt);

//       if (createdAt >= startOfToday) salesToday += price;
//       if (createdAt >= startOfMonth) salesThisMonth += price;
//       if (createdAt >= startOfYear) salesThisYear += price;
//     });

//     // 💸 EXPENSE CALC
//     let expenseToday = 0;
//     let expenseThisMonth = 0;
//     let expenseThisYear = 0;

//     expenses.forEach((e) => {
//       const amount = e.amount || 0;
//       const createdAt = new Date(e.createdAt);

//       if (createdAt >= startOfToday) expenseToday += amount;
//       if (createdAt >= startOfMonth) expenseThisMonth += amount;
//       if (createdAt >= startOfYear) expenseThisYear += amount;
//     });

//     // 🧮 PROFIT
//     return NextResponse.json({
//       profitToday: salesToday - expenseToday,
//       profitThisMonth: salesThisMonth - expenseThisMonth,
//       profitThisYear: salesThisYear - expenseThisYear,

//       // optional raw numbers (VERY useful)
//       sales: {
//         today: salesToday,
//         month: salesThisMonth,
//         year: salesThisYear,
//       },
//       expenses: {
//         today: expenseToday,
//         month: expenseThisMonth,
//         year: expenseThisYear,
//       },
//     });
//   } catch (err) {
//     console.error("❌ PROFIT API ERROR:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Membership from "@/models/Membership";
import Expense from "@/models/Expense";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (
      process.env.NODE_ENV !== "development" &&
      (!session || session.user.role !== "admin")
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const gymId = searchParams.get("gymId");

    if (!gymId) {
      return NextResponse.json({ error: "Missing gymId" }, { status: 400 });
    }

    // 🕒 DATE RANGES (IMPORTANT FIX)
    const now = new Date();

    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date(startOfToday);
    endOfToday.setDate(endOfToday.getDate() + 1);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear() + 1, 0, 1);

    // 💰 SALES (MEMBERSHIPS)
    const salesTodayDocs = await Membership.find({
      gymId,
      createdAt: { $gte: startOfToday, $lt: endOfToday },
    }).populate("planId");

    const salesMonthDocs = await Membership.find({
      gymId,
      createdAt: { $gte: startOfMonth, $lt: endOfMonth },
    }).populate("planId");

    const salesYearDocs = await Membership.find({
      gymId,
      createdAt: { $gte: startOfYear, $lt: endOfYear },
    }).populate("planId");

    const salesToday = salesTodayDocs.reduce(
      (sum, m) => sum + (m.planId?.price || 0),
      0
    );
    const salesThisMonth = salesMonthDocs.reduce(
      (sum, m) => sum + (m.planId?.price || 0),
      0
    );
    const salesThisYear = salesYearDocs.reduce(
      (sum, m) => sum + (m.planId?.price || 0),
      0
    );

    // 💸 EXPENSES
    const expenseToday = await Expense.aggregate([
      {
        $match: {
          gymId,
          createdAt: { $gte: startOfToday, $lt: endOfToday },
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const expenseMonth = await Expense.aggregate([
      {
        $match: {
          gymId,
          createdAt: { $gte: startOfMonth, $lt: endOfMonth },
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const expenseYear = await Expense.aggregate([
      {
        $match: {
          gymId,
          createdAt: { $gte: startOfYear, $lt: endOfYear },
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const expenseTodayTotal = expenseToday[0]?.total || 0;
    const expenseMonthTotal = expenseMonth[0]?.total || 0;
    const expenseYearTotal = expenseYear[0]?.total || 0;

    return NextResponse.json({
      profitToday: salesToday - expenseTodayTotal,
      profitThisMonth: salesThisMonth - expenseMonthTotal,
      profitThisYear: salesThisYear - expenseYearTotal,

      sales: {
        today: salesToday,
        month: salesThisMonth,
        year: salesThisYear,
      },
      expenses: {
        today: expenseTodayTotal,
        month: expenseMonthTotal,
        year: expenseYearTotal,
      },
    });
  } catch (err) {
    console.error("❌ PROFIT API ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
