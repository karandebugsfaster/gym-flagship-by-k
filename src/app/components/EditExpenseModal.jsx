"use client";

import { useState } from "react";
import { useToast } from "./ToastProvider";

export default function EditExpenseModal({ expense, onClose, onUpdated }) {
  const { showToast } = useToast();

  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount);
  const [note, setNote] = useState(expense.note || "");
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    if (loading) return;
    setLoading(true);

    const res = await fetch("/api/expenses", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        expenseId: expense._id,
        title,
        amount,
        note,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      showToast("Failed to update expense", "error");
      return;
    }

    showToast("Expense updated");
    onUpdated();
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#111] p-6 rounded-xl w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold text-white">Edit Expense</h2>

        <input
          className="w-full bg-black border border-white/20 rounded px-3 py-2 text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          className="w-full bg-black border border-white/20 rounded px-3 py-2 text-white"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <textarea
          className="w-full bg-black border border-white/20 rounded px-3 py-2 text-white"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 text-white rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-orange-500 text-black rounded"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
