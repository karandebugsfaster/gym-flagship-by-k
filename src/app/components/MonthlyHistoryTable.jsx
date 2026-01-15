"use client";

export default function MonthlyHistoryTable({ history }) {
  if (!history || history.length === 0) {
    return <p className="text-white/60">No monthly history available yet.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-white/20">
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

            const monthName = new Date(row.year, row.month - 1).toLocaleString(
              "default",
              { month: "long" }
            );

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
  );
}
