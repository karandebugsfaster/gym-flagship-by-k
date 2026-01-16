// "use client";

// import { useEffect, useState } from "react";
// import AddExpenseForm from "./AddExpenseForm";
// import ExpenseList from "./ExpenseList";
// import ProfitCards from "./ProfitCards";
// import MonthlyHistoryTable from "./MonthlyHistoryTable";

// export default function OwnerSalesDashboard({ gymId }) {
//   const [sales, setSales] = useState(null);
//   const [expenses, setExpenses] = useState([]);
//   const [profit, setProfit] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [monthlyHistory, setMonthlyHistory] = useState([]);

//   async function fetchSales() {
//     const res = await fetch(`/api/owner/sales?gymId=${gymId}`);
//     const data = await res.json();
//     setSales(data);
//   }

//   async function fetchExpenses() {
//     const res = await fetch(`/api/expenses?gymId=${gymId}`);
//     const data = await res.json();
//     setExpenses(data.expenses || []);
//   }

//   async function fetchProfit() {
//     const res = await fetch(`/api/owner/profit?gymId=${gymId}`);
//     const data = await res.json();
//     setProfit(data);
//   }
//   async function fetchMonthlyHistory() {
//     const res = await fetch(`/api/owner/history/monthly?gymId=${gymId}`);
//     const data = await res.json();
//     setMonthlyHistory(data.history || []);
//   }

//   async function loadAll() {
//     await Promise.all([
//       fetchSales(),
//       fetchExpenses(),
//       fetchProfit(),
//       fetchMonthlyHistory(),
//     ]);
//     setLoading(false);
//   }

//   useEffect(() => {
//     loadAll();
//   }, []);

//   if (loading) {
//     return <p className="text-white/60">Loading financial data...</p>;
//   }

//   return (
//     <div className="space-y-12">
//       {/* SALES */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="p-6 rounded-xl bg-green-600/20 border border-green-500">
//           <p>Total Sales</p>
//           <p className="text-3xl font-bold">₹{sales.totalSales}</p>
//         </div>

//         <div className="p-6 rounded-xl bg-blue-600/20 border border-blue-500">
//           <p>Sales Today</p>
//           <p className="text-3xl font-bold">₹{sales.salesToday}</p>
//         </div>

//         <div className="p-6 rounded-xl bg-purple-600/20 border border-purple-500">
//           <p>This Month</p>
//           <p className="text-3xl font-bold">₹{sales.salesThisMonth}</p>
//         </div>

//         <div className="p-6 rounded-xl bg-orange-600/20 border border-orange-500">
//           <p>This Year</p>
//           <p className="text-3xl font-bold">₹{sales.salesThisYear}</p>
//         </div>
//       </div>

//       {/* PROFIT */}
//       <div>
//         <h2 className="text-2xl font-bold mb-4">Net Profit</h2>
//         <ProfitCards profit={profit} />
//       </div>

//       {/* MONTHLY HISTORY */}
//       <div>
//         <h2 className="text-2xl font-bold mb-4">Monthly Performance</h2>

//         <MonthlyHistoryTable history={monthlyHistory} />
//       </div>

//       {/* EXPENSES */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <AddExpenseForm
//           gymId={gymId}
//           onSuccess={() => {
//             fetchExpenses();
//             fetchProfit(); // 🔥 refresh profit after expense
//           }}
//         />
//         <ExpenseList expenses={expenses} />
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseList from "./ExpenseList";
import ProfitCards from "./ProfitCards";
import MonthlyHistoryTable from "./MonthlyHistoryTable";
import FinanceSkeleton from "./FinanceSkeleton";
import CountUpNumber from "./CountUpNumber";

export default function OwnerSalesDashboard({ gymId }) {
  const [sales, setSales] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [profit, setProfit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [monthlyHistory, setMonthlyHistory] = useState([]);

  async function fetchSales() {
    const res = await fetch(`/api/owner/sales?gymId=${gymId}`);
    const data = await res.json();
    setSales(data);
  }

  async function fetchExpenses() {
    const res = await fetch(`/api/expenses?gymId=${gymId}`);
    const data = await res.json();
    setExpenses(data.expenses || []);
  }

  async function fetchProfit() {
    const res = await fetch(`/api/owner/profit?gymId=${gymId}`);
    const data = await res.json();
    setProfit(data);
  }

  async function fetchMonthlyHistory() {
    const res = await fetch(`/api/owner/history/monthly?gymId=${gymId}`);
    const data = await res.json();
    setMonthlyHistory(data.history || []);
  }

  async function loadAll() {
    await Promise.all([
      fetchSales(),
      fetchExpenses(),
      fetchProfit(),
      fetchMonthlyHistory(),
    ]);
    setLoading(false);
  }

  useEffect(() => {
    loadAll();
  }, []);

  if (loading) return <FinanceSkeleton />;

  return (
    <div className="space-y-12">
      {/* 💎 FINANCE OVERVIEW BOX */}
      <div className="rounded-3xl p-6 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.4)] space-y-6">
        <h2 className="text-lg font-bold tracking-wide">
          💼 Financial Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl p-5 bg-green-500/15 border border-green-500/30">
            <p className="text-sm text-green-300">Total Sales</p>
            <p className="text-3xl font-extrabold text-green-400">
              <CountUpNumber value={sales.totalSales} prefix="₹" />
            </p>
          </div>

          <div className="rounded-2xl p-5 bg-blue-500/15 border border-blue-500/30">
            <p className="text-sm text-blue-300">Sales Today</p>
            <p className="text-3xl font-extrabold text-blue-400">
              <CountUpNumber value={sales.salesToday} prefix="₹" />
            </p>
          </div>

          <div className="rounded-2xl p-5 bg-purple-500/15 border border-purple-500/30">
            <p className="text-sm text-purple-300">This Month</p>
            <p className="text-3xl font-extrabold text-purple-400">
              <CountUpNumber value={sales.salesThisMonth} prefix="₹" />
            </p>
          </div>

          <div className="rounded-2xl p-5 bg-orange-500/15 border border-orange-500/30">
            <p className="text-sm text-orange-300">This Year</p>
            <p className="text-3xl font-extrabold text-orange-400">
              <CountUpNumber value={sales.salesThisYear} prefix="₹" />
            </p>
          </div>
        </div>
      </div>

      {/* 💰 PROFIT */}
      <div className="rounded-3xl p-6 bg-white/5 border border-white/10">
        <h2 className="text-xl font-bold mb-4">💰 Net Profit</h2>
        <ProfitCards profit={profit} />
      </div>

      {/* 📈 MONTHLY PERFORMANCE */}
      <div className="rounded-3xl p-6 bg-white/5 border border-white/10">
        <h2 className="text-xl font-bold mb-4">📈 Monthly Performance</h2>
        <MonthlyHistoryTable history={monthlyHistory} />
      </div>

      {/* 🧾 EXPENSES */}
      <div className="rounded-3xl p-6 bg-white/5 border border-white/10">
        <h2 className="text-xl font-bold mb-6">🧾 Expenses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AddExpenseForm
            gymId={gymId}
            onSuccess={() => {
              fetchExpenses();
              fetchProfit();
            }}
          />
          <ExpenseList expenses={expenses} />
        </div>
      </div>
    </div>
  );
}
