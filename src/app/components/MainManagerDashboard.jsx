// "use client";
// import React from "react";
// import { useState, useEffect } from "react";

// const MainManagerDashboard = () => {
//   const [stats, setStats] = useState(null);

//   /* ----------------------------------
//      FETCH STATS
//   ---------------------------------- */
//   const fetchStats = async () => {
//     const res = await fetch("/api/manager/stats?gymId=1");
//     const data = await res.json();
//     setStats(data);
//   };

//   /* ----------------------------------
//      INITIAL LOAD
//   ---------------------------------- */
//   useEffect(() => {
//     fetchStats();
//   }, []);
//   return (
//     <>
//       {stats && (
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div className="p-4 rounded-xl bg-white/10">
//             <p className="text-sm text-gray-400">Total Members</p>
//             <p className="text-2xl font-bold">{stats.totalMembers}</p>
//           </div>

//           <div className="p-4 rounded-xl bg-white/10">
//             <p className="text-sm text-gray-400">Total Plans</p>
//             <p className="text-2xl font-bold">{stats.totalPlans}</p>
//           </div>

//           <div className="p-4 rounded-xl bg-white/10">
//             <p className="text-sm text-gray-400">Members Added Today</p>
//             <p className="text-xl font-semibold">{stats.membersToday}</p>
//           </div>

//           <div className="p-4 rounded-xl bg-white/10">
//             <p className="text-sm text-gray-400">This Month</p>
//             <p className="text-xl font-semibold">{stats.membersThisMonth}</p>
//           </div>

//           <div className="p-4 rounded-xl bg-red-900/30">
//             <p className="text-sm text-red-300">Expired Members</p>
//             <p className="text-2xl font-bold text-red-400">
//               {stats.expiredMembers}
//             </p>
//           </div>

//           <div className="p-4 rounded-xl bg-green-500/10 col-span-2">
//             <p className="text-sm text-green-400">📞 Enquiries handled today</p>
//             <p className="text-2xl font-bold text-green-400">
//               {stats.enquiriesHandledToday}
//             </p>
//           </div>

//           <div className="p-4 rounded-xl bg-white/10 col-span-2">
//             <p className="text-sm text-gray-400">This Year</p>
//             <p className="text-xl font-semibold">{stats.membersThisYear}</p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default MainManagerDashboard;
"use client";

import { useEffect, useState } from "react";
import StatsSkeleton from "./StatsSkeleton";
import CountUpNumber from "./CountUpNumber";

export default function MainManagerDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchStats() {
    try {
      const res = await fetch("/api/manager/stats?gymId=1");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Stats fetch failed", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <StatsSkeleton />;

  return (
    <div className="space-y-3">
      {/* SECTION TITLE */}
      <div className="px-1">
        <p className="text-sm text-white/60">Gym Overview</p>
      </div>

      {/* HORIZONTAL SCROLL STATS */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {/* TOTAL MEMBERS */}
        <StatCard title="Total Members" value={stats.totalMembers} />

        {/* TOTAL PLANS */}
        <StatCard title="Total Plans" value={stats.totalPlans} />

        {/* MEMBERS TODAY */}
        <StatCard title="Added Today" value={stats.membersToday} />

        {/* THIS MONTH */}
        <StatCard title="This Month" value={stats.membersThisMonth} />

        {/* EXPIRED */}
        <div className="text-red-400">

        <StatCard title="Expired" value={stats.expiredMembers}  color="red" />
        </div>

        {/* ENQUIRIES */}
        <StatCard
          title="Enquiries Today"
          value={stats.enquiriesHandledToday}
          color="green"
        />

        {/* THIS YEAR */}
        <StatCard title="This Year" value={stats.membersThisYear} />
      </div>
    </div>
  );
}

/* ----------------------------------
   SINGLE STAT CARD (INTERNAL)
---------------------------------- */
function StatCard({ title, value, color }) {
  const colorClass =
    color === "red" ? "glass-red" : color === "green" ? "glass-green" : "";

  return (
    <div
      className={`glass-card glass-border ${colorClass}
      min-w-[220px] max-w-[220px]
      p-5 flex flex-col justify-between`}
    >
      <p className="text-sm text-white/60">{title}</p>

      <p className="stat-number mt-2">
        <CountUpNumber value={value} />
      </p>
    </div>
  );
}
