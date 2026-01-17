"use client";
import { useState } from "react";
import EditExpenseModal from "./EditExpenseModal";

export default function ExpenseList({ expenses, onUpdated }) {
  const [editingExpense, setEditingExpense] = useState(null);

  if (!expenses || expenses.length === 0) {
    return (
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-white/60 text-center">
        💸 No expenses added yet
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {expenses.map((e) => (
          <div
            key={e._id}
            className="
              rounded-2xl
              bg-white/5 backdrop-blur-xl
              border border-white/10
              p-4
              shadow-[0_0_30px_rgba(0,0,0,0.4)]
              space-y-2
            "
          >
            {/* HEADER */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-base font-semibold">{e.title}</p>
                <p className="text-xs text-white/50">
                  {e.category} • {new Date(e.createdAt).toDateString()}
                </p>
              </div>

              <p className="text-lg font-bold text-red-400">₹{e.amount}</p>
            </div>

            {/* NOTE */}
            {e.note && (
              <p className="text-sm text-white/60 border-l-2 border-red-500/30 pl-3 mt-2">
                {e.note}
              </p>
            )}

            {/* ACTIONS */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingExpense(e)}
                className="px-3 py-1 bg-yellow-500 text-black rounded"
              >
                ✏️ Edit
              </button>
              <button
                onClick={async () => {
                  if (!confirm("Delete this expense?")) return;

                  await fetch(`/api/expenses/delete?id=${e._id}`, {
                    method: "DELETE",
                  });

                  onUpdated(); // refresh list
                }}
                className="px-2 py-1 bg-red-600 text-white rounded"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editingExpense && (
        <EditExpenseModal
          expense={editingExpense}
          onClose={() => setEditingExpense(null)}
          onUpdated={() => {
            setEditingExpense(null);
            onUpdated(); // 🔥 parent will refetch
          }}
        />
      )}
    </>
  );
}
