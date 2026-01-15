"use client";

import { useState } from "react";

export default function AssignPlanModal({ member, plans, onClose, onSuccess }) {
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAssign = async () => {
    if (!selectedPlanId) {
      setError("Please select a plan");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/memberships/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: member._id,
          planId: selectedPlanId,
          gymId: "1",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to assign plan");
        return;
      }

      onSuccess?.();
      onClose();
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-end z-50">
      <div className="bg-black w-full rounded-t-3xl p-6">
        <h2 className="text-lg font-semibold mb-4">
          Assign Plan to {member.name}
        </h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <select
          value={selectedPlanId}
          onChange={(e) => setSelectedPlanId(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        >
          <option value="" className="bg-black">Select Plan</option>
          {plans.map((plan) => (
            <option key={plan._id} value={plan._id} className="bg-black">
              {plan.name} – ₹{plan.price}
            </option>
          ))}
        </select>

        <button
          onClick={handleAssign}
          disabled={loading}
          className="w-full bg-zinc-800 text-white p-3 rounded-xl"
        >
          {loading ? "Assigning..." : "Assign Plan"}
        </button>

        <button
          onClick={onClose}
          className="w-full mt-2 text-center text-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
