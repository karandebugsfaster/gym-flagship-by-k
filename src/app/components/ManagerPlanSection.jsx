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
  const [selectedPlan, setSelectedPlan] = useState(null);

  const fetchPlans = async () => {
    console.log("🔥 Fetching plans...");

    const res = await fetch("/api/plans?gymId=1");
    const data = await res.json();

    setPlans(data.plans || []);
    setLoadingPlans(false);
  };
  const handleDeletePlan = async (planId) => {
    const ok = confirm("Are you sure you want to delete this plan?");
    if (!ok) return;

    try {
      const res = await fetch(`/api/plans/${planId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        console.error("Failed to delete plan");
        return;
      }

      // 🔥 refresh plans after delete
      fetchPlans();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <>
      <div>
        <AddPlanButton onClick={() => setShowForm(true)} />
        {showForm && (
          <AddPlanForm
            initialData={selectedPlan}
            planId={selectedPlan?._id}
            onClose={() => {
              setShowForm(false);
              setSelectedPlan(null);
            }}
            onSuccess={fetchPlans}
          />
        )}
      </div>
      {loadingPlans && <p>Loading plans...</p>}

      {plans.map((plan) => (
        <div
          key={plan._id}
          className="flex justify-between items-center p-4 mb-4 rounded-xl border shadow-sm bg-black"
        >
          <button
            onClick={() => {
              setSelectedPlan(plan);
              setShowForm(true);
            }}
            className="text-orange-500"
          >
            ✏️
          </button>

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
          <button
            onClick={() => handleDeletePlan(plan._id)}
            className="text-red-500"
          >
            🗑️
          </button>
        </div>
      ))}
    </>
  );
};

export default ManagerPlanSection;
