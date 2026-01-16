// "use client";

// import React from "react";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import AddPlanForm from "./AddPlanForm";
// import AddPlanButton from "./AddPlanButton";

// const ManagerPlanSection = () => {
//   const [plans, setPlans] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [loadingPlans, setLoadingPlans] = useState(true);
//   const [selectedPlan, setSelectedPlan] = useState(null);

//   const fetchPlans = async () => {
//     console.log("🔥 Fetching plans...");

//     const res = await fetch("/api/plans?gymId=1");
//     const data = await res.json();

//     setPlans(data.plans || []);
//     setLoadingPlans(false);
//   };
//   const handleDeletePlan = async (planId) => {
//     const ok = confirm("Are you sure you want to delete this plan?");
//     if (!ok) return;

//     try {
//       const res = await fetch(`/api/plans/${planId}`, {
//         method: "DELETE",
//       });

//       if (!res.ok) {
//         console.error("Failed to delete plan");
//         return;
//       }

//       // 🔥 refresh plans after delete
//       fetchPlans();
//     } catch (err) {
//       console.error("Delete failed", err);
//     }
//   };

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   return (
//     <>
//       <div>
//         <AddPlanButton onClick={() => setShowForm(true)} />
//         {showForm && (
//           <AddPlanForm
//             initialData={selectedPlan}
//             planId={selectedPlan?._id}
//             onClose={() => {
//               setShowForm(false);
//               setSelectedPlan(null);
//             }}
//             onSuccess={fetchPlans}
//           />
//         )}
//       </div>
//       {loadingPlans && <p>Loading plans...</p>}

//       {plans.map((plan) => (
//         <div
//           key={plan._id}
//           className="flex justify-between items-center p-4 mb-4 rounded-xl border shadow-sm bg-black"
//         >
//           <button
//             onClick={() => {
//               setSelectedPlan(plan);
//               setShowForm(true);
//             }}
//             className="text-orange-500"
//           >
//             ✏️
//           </button>

//           <div>
//             <h3 className="font-semibold text-lg">{plan.name}</h3>
//             <p className="text-gray-400">₹{plan.price}</p>
//             <p className="text-gray-400">{plan.durationDays}</p>
//           </div>

//           <div className="text-gray-400 font-medium">
//             {plan.durationDays % 30 === 0
//               ? `${plan.durationDays / 30} Months`
//               : `${plan.durationDays} Days`}
//           </div>
//           <button
//             onClick={() => handleDeletePlan(plan._id)}
//             className="text-red-500"
//           >
//             🗑️
//           </button>
//         </div>
//       ))}
//     </>
//   );
// };

// export default ManagerPlanSection;
"use client";

import { useState, useEffect } from "react";
import AddPlanForm from "./AddPlanForm";
import AddPlanButton from "./AddPlanButton";

const ManagerPlanSection = () => {
  const [plans, setPlans] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const fetchPlans = async () => {
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
      if (res.ok) fetchPlans();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <>
      {/* ➕ ADD PLAN */}
      <div className="mb-6">
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

      {loadingPlans && <p className="text-white/60">Loading plans...</p>}

      {/* 📦 PLANS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className="
              relative
              rounded-2xl
              bg-white/5
              border border-white/10
              p-4
              space-y-3
            "
          >
            {/* ACTION ICONS */}
            <div className="absolute top-3 right-3 flex gap-3">
              <button
                onClick={() => {
                  setSelectedPlan(plan);
                  setShowForm(true);
                }}
                className="text-orange-400 text-lg"
                aria-label="Edit plan"
              >
                ✏️
              </button>

              <button
                onClick={() => handleDeletePlan(plan._id)}
                className="text-red-500 text-lg"
                aria-label="Delete plan"
              >
                🗑️
              </button>
            </div>

            {/* PLAN INFO */}
            <div>
              <h3 className="text-lg font-bold">{plan.name}</h3>
              <p className="text-sm text-white/60 mt-1">₹{plan.price}</p>
            </div>

            <div className="flex justify-between items-center pt-2">
              <p className="text-sm text-white/70">Duration</p>
              <p className="font-semibold">
                {plan.durationDays % 30 === 0
                  ? `${plan.durationDays / 30} Months`
                  : `${plan.durationDays} Days`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ManagerPlanSection;
