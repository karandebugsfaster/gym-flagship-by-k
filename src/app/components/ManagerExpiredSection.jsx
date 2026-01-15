"use client";

import { useEffect, useState } from "react";
import ExpiredMembersSection from "./ExpiredMembersSection";

export default function ManagerDashboardClient() {
  const gymId = "1"; // 🔥 single source of truth

  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);

  useEffect(() => {
    async function fetchPlans() {
      const res = await fetch(`/api/plans?gymId=${gymId}`);
      const data = await res.json();
      setPlans(data.plans || []);
      setLoadingPlans(false);
    }

    fetchPlans();
  }, []);

  if (loadingPlans) return <p>Loading dashboard...</p>;

  return (
    <>
      {/* other manager sections already here */}

      <ExpiredMembersSection gymId={gymId} plans={plans} />
    </>
  );
}
