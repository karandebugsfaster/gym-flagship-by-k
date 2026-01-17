import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Expense from "@/models/Expense";

export async function DELETE(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await Expense.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
