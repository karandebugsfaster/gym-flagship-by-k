"use client";

import { useEffect, useState } from "react";

export default function TodayTransactionsCard({ gymId }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchTransactions() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`/api/transactions/today?gymId=${gymId}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to load transactions");
        setTransactions([]);
        return;
      }

      setTransactions(data.transactions || []);
    } catch (err) {
      console.error("Failed to load transactions", err);
      setError("Something went wrong");
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (gymId) fetchTransactions();
  }, [gymId]);

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
        <p className="text-white/60">Loading today’s transactions…</p>
      </div>
    );
  }

  /* ---------------- ERROR ---------------- */
  if (error) {
    return (
      <div className="rounded-2xl bg-red-500/10 border border-red-500/30 p-4">
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">
          💰 Today’s Transactions
        </h3>

        <span className="text-sm text-white/60">
          {transactions.length} entries
        </span>
      </div>

      {/* EMPTY */}
      {transactions.length === 0 && (
        <p className="text-sm text-white/50">No transactions recorded today.</p>
      )}

      {/* LIST */}
      <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
        {transactions.map((t) => (
          <div
            key={t._id}
            className="
              flex items-center justify-between
              rounded-xl
              bg-black/40
              border border-white/10
              px-4 py-3
            "
          >
            {/* LEFT */}
            <div className="min-w-0">
              <p className="font-semibold truncate text-white">
                {t.memberName}
              </p>

              <p className="text-xs text-white/60">ID: {t.memberId}</p>

              <p className="text-xs text-white/40 truncate">{t.planName}</p>

              <p className="text-[11px] text-white/30 mt-0.5">
                {new Date(t.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {/* RIGHT */}
            <div className="text-green-400 font-bold text-base shrink-0">
              +₹{Number(t.amount).toLocaleString("en-IN")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
