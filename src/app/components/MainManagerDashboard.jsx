"use client";
import React from "react";
import { useState, useEffect } from "react";

const MainManagerDashboard = () => {
  const [stats, setStats] = useState(null);

  /* ----------------------------------
     FETCH STATS
  ---------------------------------- */
  const fetchStats = async () => {
    const res = await fetch("/api/manager/stats?gymId=1");
    const data = await res.json();
    setStats(data);
  };

  /* ----------------------------------
     INITIAL LOAD
  ---------------------------------- */
  useEffect(() => {
    fetchStats();
  }, []);
  return (
    <>
      {stats && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-white/10">
            <p className="text-sm text-gray-400">Total Members</p>
            <p className="text-2xl font-bold">{stats.totalMembers}</p>
          </div>

          <div className="p-4 rounded-xl bg-white/10">
            <p className="text-sm text-gray-400">Total Plans</p>
            <p className="text-2xl font-bold">{stats.totalPlans}</p>
          </div>

          <div className="p-4 rounded-xl bg-white/10">
            <p className="text-sm text-gray-400">Members Added Today</p>
            <p className="text-xl font-semibold">{stats.membersToday}</p>
          </div>

          <div className="p-4 rounded-xl bg-white/10">
            <p className="text-sm text-gray-400">This Month</p>
            <p className="text-xl font-semibold">{stats.membersThisMonth}</p>
          </div>

          <div className="p-4 rounded-xl bg-red-900/30">
            <p className="text-sm text-red-300">Expired Members</p>
            <p className="text-2xl font-bold text-red-400">
              {stats.expiredMembers}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/10 col-span-2">
            <p className="text-sm text-gray-400">This Year</p>
            <p className="text-xl font-semibold">{stats.membersThisYear}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default MainManagerDashboard;
