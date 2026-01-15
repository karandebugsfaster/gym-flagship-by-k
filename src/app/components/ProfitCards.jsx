"use client";

export default function ProfitCards({ profit }) {
  function color(value) {
    if (value > 0) return "text-green-400";
    if (value < 0) return "text-red-400";
    return "text-white";
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* TODAY */}
      <div className="p-6 rounded-xl border border-white/20 bg-black">
        <p className="text-sm text-white/60">Profit Today</p>
        <p className={`text-3xl font-bold ${color(profit.profitToday)}`}>
          ₹{profit.profitToday}
        </p>
      </div>

      {/* MONTH */}
      <div className="p-6 rounded-xl border border-white/20 bg-black">
        <p className="text-sm text-white/60">Profit This Month</p>
        <p className={`text-3xl font-bold ${color(profit.profitThisMonth)}`}>
          ₹{profit.profitThisMonth}
        </p>
      </div>

      {/* YEAR */}
      <div className="p-6 rounded-xl border border-white/20 bg-black">
        <p className="text-sm text-white/60">Profit This Year</p>
        <p className={`text-3xl font-bold ${color(profit.profitThisYear)}`}>
          ₹{profit.profitThisYear}
        </p>
      </div>
    </div>
  );
}
