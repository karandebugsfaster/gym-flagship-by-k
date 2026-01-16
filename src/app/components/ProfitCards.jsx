// "use client";

// export default function ProfitCards({ profit }) {
//   function color(value) {
//     if (value > 0) return "text-green-400";
//     if (value < 0) return "text-red-400";
//     return "text-white";
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       {/* TODAY */}
//       <div className="p-6 rounded-xl border border-white/20 bg-black">
//         <p className="text-sm text-white/60">Profit Today</p>
//         <p className={`text-3xl font-bold ${color(profit.profitToday)}`}>
//           ₹{profit.profitToday}
//         </p>
//       </div>

//       {/* MONTH */}
//       <div className="p-6 rounded-xl border border-white/20 bg-black">
//         <p className="text-sm text-white/60">Profit This Month</p>
//         <p className={`text-3xl font-bold ${color(profit.profitThisMonth)}`}>
//           ₹{profit.profitThisMonth}
//         </p>
//       </div>

//       {/* YEAR */}
//       <div className="p-6 rounded-xl border border-white/20 bg-black">
//         <p className="text-sm text-white/60">Profit This Year</p>
//         <p className={`text-3xl font-bold ${color(profit.profitThisYear)}`}>
//           ₹{profit.profitThisYear}
//         </p>
//       </div>
//     </div>
//   );
// }
"use client";

export default function ProfitCards({ profit }) {
  function color(value) {
    if (value > 0) return "text-green-400";
    if (value < 0) return "text-red-400";
    return "text-white";
  }

  function bg(value) {
    if (value > 0) return "bg-green-500/10 border-green-500/30";
    if (value < 0) return "bg-red-500/10 border-red-500/30";
    return "bg-white/5 border-white/10";
  }

  const cards = [
    {
      label: "Profit Today",
      value: profit.profitToday,
    },
    {
      label: "This Month",
      value: profit.profitThisMonth,
    },
    {
      label: "This Year",
      value: profit.profitThisYear,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className={`
            rounded-2xl
            p-5
            backdrop-blur-xl
            border
            ${bg(c.value)}
            shadow-[0_0_40px_rgba(0,0,0,0.4)]
          `}
        >
          <p className="text-sm text-white/60 mb-1">{c.label}</p>

          <p className={`text-3xl font-extrabold ${color(c.value)}`}>
            ₹{c.value}
          </p>

          <p className="text-xs text-white/40 mt-2">
            {c.value > 0
              ? "Positive cash flow"
              : c.value < 0
              ? "Loss recorded"
              : "Break-even"}
          </p>
        </div>
      ))}
    </div>
  );
}
