// "use client";

// import { useState } from "react";

// export default function AddExpenseForm({ gymId, onSuccess }) {
//   const [title, setTitle] = useState("");
//   const [amount, setAmount] = useState("");
//   const [category, setCategory] = useState("salary");
//   const [note, setNote] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   async function handleSubmit() {
//     setError("");

//     if (!title || !amount) {
//       setError("Title and amount are required");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await fetch("/api/expenses", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           gymId,
//           title,
//           amount: Number(amount),
//           category,
//           note,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Failed to add expense");
//         return;
//       }

//       // ✅ reset form
//       setTitle("");
//       setAmount("");
//       setCategory("salary");
//       setNote("");

//       onSuccess(); // 🔥 refresh expense list
//     } catch (err) {
//       setError("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="p-4 rounded-xl border border-white/20 bg-white/5">
//       <h2 className="text-lg font-semibold mb-3">Add Expense</h2>

//       {error && <p className="text-red-400 mb-2">{error}</p>}

//       <input
//         placeholder="Expense title (e.g. Trainer Salary)"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="w-full mb-2 p-2 rounded bg-black border border-white/20"
//       />

//       <input
//         type="number"
//         placeholder="Amount"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         className="w-full mb-2 p-2 rounded bg-black border border-white/20"
//       />

//       <select
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//         className="w-full mb-2 p-2 rounded bg-black border border-white/20"
//       >
//         <option value="salary">Salary</option>
//         <option value="electricity">Electricity</option>
//         <option value="rent">Rent</option>
//         <option value="maintenance">Maintenance</option>
//         <option value="other">Other</option>
//       </select>

//       <textarea
//         placeholder="Optional note"
//         value={note}
//         onChange={(e) => setNote(e.target.value)}
//         className="w-full mb-3 p-2 rounded bg-black border border-white/20"
//       />

//       <button
//         onClick={handleSubmit}
//         disabled={loading}
//         className="px-4 py-2 bg-green-500 text-black rounded"
//       >
//         {loading ? "Saving..." : "Add Expense"}
//       </button>
//     </div>
//   );
// }
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

      // reset
      setTitle("");
      setAmount("");
      setCategory("salary");
      setNote("");

      onSuccess();
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        rounded-3xl
        bg-white/5 backdrop-blur-xl
        border border-white/10
        p-5
        shadow-[0_0_40px_rgba(0,0,0,0.4)]
        space-y-4
      "
    >
      {/* HEADER */}
      <h2 className="text-lg font-bold tracking-wide">➕ Add Expense</h2>

      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl p-2">
          {error}
        </p>
      )}

      {/* TITLE */}
      <input
        placeholder="Expense title (e.g. Trainer Salary)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="
          w-full
          p-3
          rounded-xl
          bg-black/40
          border border-white/10
          text-white
          placeholder:text-white/40
        "
      />

      {/* AMOUNT */}
      <input
        type="number"
        placeholder="Amount (₹)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="
          w-full
          p-3
          rounded-xl
          bg-black/40
          border border-white/10
          text-white
          placeholder:text-white/40
        "
      />

      {/* CATEGORY */}
      <div>
        <p className="text-xs text-white/60 mb-2">Category</p>
        <div className="grid grid-cols-2 gap-2">
          {["salary", "electricity", "rent", "maintenance", "other"].map(
            (c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`
                py-2 rounded-xl text-sm font-semibold capitalize
                ${
                  category === c
                    ? "bg-orange-500 text-black"
                    : "bg-white/10 text-white"
                }
              `}
              >
                {c}
              </button>
            )
          )}
        </div>
      </div>

      {/* NOTE */}
      <textarea
        placeholder="Optional note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={3}
        className="
          w-full
          p-3
          rounded-xl
          bg-black/40
          border border-white/10
          text-white
          placeholder:text-white/40
          resize-none
        "
      />

      {/* ACTION */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="
          w-full
          py-3
          rounded-xl
          bg-green-500
          text-black
          font-bold
          disabled:opacity-50
        "
      >
        {loading ? "Saving Expense…" : "Add Expense"}
      </button>
    </div>
  );
}
