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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {/* TOTAL MEMBERS */}
      <div className="rounded-2xl bg-white/10 p-5 border border-white/10">
        <p className="text-sm text-white/60">Total Members</p>
        <p className="text-3xl font-extrabold mt-1">{stats.totalMembers}</p>
      </div>

      {/* TOTAL PLANS */}
      <div className="rounded-2xl bg-white/10 p-5 border border-white/10">
        <p className="text-sm text-white/60">Total Plans</p>
        <p className="text-3xl font-extrabold mt-1">{stats.totalPlans}</p>
      </div>

      {/* TODAY */}
      <div className="rounded-2xl bg-white/10 p-5 border border-white/10">
        <p className="text-sm text-white/60">Members Added Today</p>
        <p className="text-2xl font-bold mt-1">{stats.membersToday}</p>
      </div>

      {/* THIS MONTH */}
      <div className="rounded-2xl bg-white/10 p-5 border border-white/10">
        <p className="text-sm text-white/60">This Month</p>
        <p className="text-2xl font-bold mt-1">{stats.membersThisMonth}</p>
      </div>

      {/* EXPIRED */}
      <div className="rounded-2xl bg-red-500/15 p-5 border border-red-500/30">
        <p className="text-sm text-red-300">Expired Members</p>
        <p className="text-3xl font-extrabold text-red-400 mt-1">
          {stats.expiredMembers}
        </p>
      </div>

      {/* ENQUIRIES */}
      <div className="rounded-2xl bg-green-500/15 p-5 border border-green-500/30 sm:col-span-2">
        <p className="text-sm text-green-400">📞 Enquiries handled today</p>
        <p className="text-3xl font-extrabold text-green-400 mt-1">
          {stats.enquiriesHandledToday}
        </p>
      </div>

      {/* YEAR */}
      <div className="rounded-2xl bg-white/10 p-5 border border-white/10 sm:col-span-2">
        <p className="text-sm text-white/60">This Year</p>
        <p className="text-2xl font-bold mt-1">{stats.membersThisYear}</p>
      </div>
    </div>
  );
}
