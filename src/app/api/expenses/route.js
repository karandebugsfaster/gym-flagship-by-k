import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Expense from "@/models/Expense";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// ➕ ADD EXPENSE
export async function POST(req) {
  const session = await getServerSession(authOptions);
  console.log("SESSION:", session);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const { gymId, title, amount, category, note } = await req.json();

  if (!gymId || !title || !amount) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const expense = await Expense.create({
    gymId,
    title,
    amount,
    category,
    note,
  });

  return NextResponse.json({ expense });
}

// 📥 GET EXPENSES
export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const { searchParams } = new URL(req.url);
  const gymId = searchParams.get("gymId");

  if (!gymId) {
    return NextResponse.json({ error: "Missing gymId" }, { status: 400 });
  }

  const expenses = await Expense.find({ gymId }).sort({ createdAt: -1 });

  return NextResponse.json({ expenses });
}
