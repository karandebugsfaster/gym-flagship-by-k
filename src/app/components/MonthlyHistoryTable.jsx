// "use client";

// export default function MonthlyHistoryTable({ history }) {
//   if (!history || history.length === 0) {
//     return <p className="text-white/60">No monthly history available yet.</p>;
//   }

//   return (
//     <div className="overflow-x-auto rounded-xl border border-white/20">
//       <table className="min-w-full text-sm text-left">
//         <thead className="bg-white/10">
//           <tr>
//             <th className="px-4 py-3">Month</th>
//             <th className="px-4 py-3">Sales (₹)</th>
//             <th className="px-4 py-3">Expenses (₹)</th>
//             <th className="px-4 py-3">Profit (₹)</th>
//             <th className="px-4 py-3">Members Joined</th>
//           </tr>
//         </thead>

//         <tbody>
//           {history.map((row, index) => {
//             const profitColor =
//               row.profit > 0
//                 ? "text-green-400"
//                 : row.profit < 0
//                 ? "text-red-400"
//                 : "text-white";

//             const monthName = new Date(row.year, row.month - 1).toLocaleString(
//               "default",
//               { month: "long" }
//             );

//             return (
//               <tr
//                 key={index}
//                 className="border-t border-white/10 hover:bg-white/5"
//               >
//                 <td className="px-4 py-3">
//                   {monthName} {row.year}
//                 </td>

//                 <td className="px-4 py-3">₹{row.sales}</td>

//                 <td className="px-4 py-3">₹{row.expenses}</td>

//                 <td className={`px-4 py-3 font-semibold ${profitColor}`}>
//                   ₹{row.profit}
//                 </td>

//                 <td className="px-4 py-3">{row.membersJoined}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }
"use client";

export default function MonthlyHistoryTable({ history }) {
  if (!history || history.length === 0) {
    return (
      <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-white/60 text-center">
        📉 No monthly history available yet
      </div>
    );
  }

  return (
    <>
      {/* 📱 MOBILE VIEW (CARDS) */}
      <div className="space-y-4 sm:hidden">
        {history.map((row, index) => {
          const profitColor =
            row.profit > 0
              ? "text-green-400"
              : row.profit < 0
              ? "text-red-400"
              : "text-white";

          const monthName = new Date(row.year, row.month - 1).toLocaleString(
            "default",
            { month: "long" }
          );

          return (
            <div
              key={index}
              className="
                rounded-2xl
                bg-white/5 backdrop-blur-xl
                border border-white/10
                p-4
                space-y-2
                shadow-[0_0_30px_rgba(0,0,0,0.4)]
              "
            >
              <p className="text-lg font-bold">
                {monthName} {row.year}
              </p>

              <div className="text-sm text-white/70 space-y-1">
                <p>💰 Sales: ₹{row.sales}</p>
                <p>💸 Expenses: ₹{row.expenses}</p>
                <p className={`font-semibold ${profitColor}`}>
                  📈 Profit: ₹{row.profit}
                </p>
                <p>👥 Members Joined: {row.membersJoined}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 💻 TABLET + DESKTOP VIEW (TABLE) */}
      <div className="hidden sm:block overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-white/10">
            <tr>
              <th className="px-4 py-3">Month</th>
              <th className="px-4 py-3">Sales (₹)</th>
              <th className="px-4 py-3">Expenses (₹)</th>
              <th className="px-4 py-3">Profit (₹)</th>
              <th className="px-4 py-3">Members Joined</th>
            </tr>
          </thead>

          <tbody>
            {history.map((row, index) => {
              const profitColor =
                row.profit > 0
                  ? "text-green-400"
                  : row.profit < 0
                  ? "text-red-400"
                  : "text-white";

              const monthName = new Date(
                row.year,
                row.month - 1
              ).toLocaleString("default", { month: "long" });

              return (
                <tr
                  key={index}
                  className="border-t border-white/10 hover:bg-white/5"
                >
                  <td className="px-4 py-3">
                    {monthName} {row.year}
                  </td>
                  <td className="px-4 py-3">₹{row.sales}</td>
                  <td className="px-4 py-3">₹{row.expenses}</td>
                  <td className={`px-4 py-3 font-semibold ${profitColor}`}>
                    ₹{row.profit}
                  </td>
                  <td className="px-4 py-3">{row.membersJoined}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
