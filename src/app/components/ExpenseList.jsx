"use client";

export default function ExpenseList({ expenses }) {
  if (expenses.length === 0) {
    return <p className="text-white/60">No expenses added yet.</p>;
  }

  return (
    <div className="space-y-3">
      {expenses.map((e) => (
        <div
          key={e._id}
          className="p-3 rounded-xl border border-white/20 bg-black"
        >
          <div className="flex justify-between">
            <p className="font-semibold">{e.title}</p>
            <p className="text-red-400">₹{e.amount}</p>
          </div>

          <p className="text-sm text-white/60">
            {e.category} • {new Date(e.createdAt).toDateString()}
          </p>

          {e.note && <p className="text-sm text-white/50 mt-1">{e.note}</p>}
        </div>
      ))}
    </div>
  );
}
