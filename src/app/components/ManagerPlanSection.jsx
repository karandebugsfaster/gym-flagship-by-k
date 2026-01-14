"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddPlanForm from "./AddPlanForm";
import AddPlanButton from "./AddPlanButton";

const ManagerPlanSection = () => {
  const [plans, setPlans] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loadingPlans, setLoadingPlans] = useState(true);

  useEffect(() => {
    async function fetchPlans() {
      console.log("🔥 Fetching plans...");

      const res = await fetch("/api/plans?gymId=1");
      const data = await res.json();

      setPlans(data.plans || []);
      setLoadingPlans(false);
    }

    fetchPlans();
  }, []);

  return (
    <>
      <div>
        <AddPlanButton onClick={() => setShowForm(true)} />
        {showForm && <AddPlanForm onClose={() => setShowForm(false)} />}
      </div>
      {loadingPlans && <p>Loading plans...</p>}

      {plans.map((plan) => (
        <div
          key={plan._id}
          className="flex justify-between items-center p-4 mb-4 rounded-xl border shadow-sm bg-black"
        >
          <div>
            <h3 className="font-semibold text-lg">{plan.name}</h3>
            <p className="text-gray-400">₹{plan.price}</p>
            <p className="text-gray-400">{plan.durationDays}</p>
          </div>

          <div className="text-gray-400 font-medium">
            {plan.durationDays % 30 === 0
              ? `${plan.durationDays / 30} Months`
              : `${plan.durationDays} Days`}
          </div>
        </div>
      ))}
    </>
  );
};

export default ManagerPlanSection;
