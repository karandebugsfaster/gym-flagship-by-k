"use client";

import { useEffect, useState } from "react";

export default function UserDashboardClient() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/user/dashboard");
      const json = await res.json();
      setData(json);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading your info...</p>;

  return (
    <div className="space-y-4 rounded-xl border border-white/10 p-6">
      <div>
        <p className="text-white/60">Joined On</p>
        <p className="text-lg font-semibold">
          {data.joiningDate ? new Date(data.joiningDate).toDateString() : "—"}
        </p>
      </div>

      <div>
        <p className="text-white/60">Membership Expires On</p>
        <p className="text-lg font-semibold text-red-400">
          {data.expiryDate
            ? new Date(data.expiryDate).toDateString()
            : "No active membership"}
        </p>
      </div>
    </div>
  );
}
