"use client";

export default function FinanceSkeleton() {
  return (
    <div className="space-y-10 animate-pulse">
      {/* OVERVIEW */}
      <div className="rounded-3xl p-6 bg-white/5 border border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-2xl bg-white/10 p-5">
              <div className="h-4 w-24 bg-white/30 rounded mb-3"></div>
              <div className="h-8 w-32 bg-white/40 rounded"></div>
              <p className="mt-2 text-xs text-white/40">Calculating revenue…</p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-40 rounded-3xl bg-white/5 border border-white/10"></div>
      <div className="h-64 rounded-3xl bg-white/5 border border-white/10"></div>
    </div>
  );
}
