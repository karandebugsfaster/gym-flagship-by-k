"use client";

import { useState } from "react";

export default function AddExpenseForm({ gymId, onSuccess }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("salary");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    setError("");

    if (!title || !amount) {
      setError("Title and amount are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gymId,
          title,
          amount: Number(amount),
          category,
          note,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to add expense");
        return;
      }

      // ✅ reset form
      setTitle("");
      setAmount("");
      setCategory("salary");
      setNote("");

      onSuccess(); // 🔥 refresh expense list
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 rounded-xl border border-white/20 bg-white/5">
      <h2 className="text-lg font-semibold mb-3">Add Expense</h2>

      {error && <p className="text-red-400 mb-2">{error}</p>}

      <input
        placeholder="Expense title (e.g. Trainer Salary)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-2 p-2 rounded bg-black border border-white/20"
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full mb-2 p-2 rounded bg-black border border-white/20"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full mb-2 p-2 rounded bg-black border border-white/20"
      >
        <option value="salary">Salary</option>
        <option value="electricity">Electricity</option>
        <option value="rent">Rent</option>
        <option value="maintenance">Maintenance</option>
        <option value="other">Other</option>
      </select>

      <textarea
        placeholder="Optional note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full mb-3 p-2 rounded bg-black border border-white/20"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-4 py-2 bg-green-500 text-black rounded"
      >
        {loading ? "Saving..." : "Add Expense"}
      </button>
    </div>
  );
}
