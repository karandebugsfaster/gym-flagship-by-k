"use client";

import { useEffect, useState } from "react";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseList from "./ExpenseList";
import ProfitCards from "./ProfitCards";
import MonthlyHistoryTable from "./MonthlyHistoryTable";

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

  if (loading) {
    return <p className="text-white/60">Loading financial data...</p>;
  }

  return (
    <div className="space-y-12">
      {/* SALES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-green-600/20 border border-green-500">
          <p>Total Sales</p>
          <p className="text-3xl font-bold">₹{sales.totalSales}</p>
        </div>

        <div className="p-6 rounded-xl bg-blue-600/20 border border-blue-500">
          <p>Sales Today</p>
          <p className="text-3xl font-bold">₹{sales.salesToday}</p>
        </div>

        <div className="p-6 rounded-xl bg-purple-600/20 border border-purple-500">
          <p>This Month</p>
          <p className="text-3xl font-bold">₹{sales.salesThisMonth}</p>
        </div>

        <div className="p-6 rounded-xl bg-orange-600/20 border border-orange-500">
          <p>This Year</p>
          <p className="text-3xl font-bold">₹{sales.salesThisYear}</p>
        </div>
      </div>

      {/* PROFIT */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Net Profit</h2>
        <ProfitCards profit={profit} />
      </div>

      {/* MONTHLY HISTORY */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Monthly Performance</h2>

        <MonthlyHistoryTable history={monthlyHistory} />
      </div>

      {/* EXPENSES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AddExpenseForm
          gymId={gymId}
          onSuccess={() => {
            fetchExpenses();
            fetchProfit(); // 🔥 refresh profit after expense
          }}
        />
        <ExpenseList expenses={expenses} />
      </div>
    </div>
  );
}
