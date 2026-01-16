// "use client";

// import { useState } from "react";

// export default function AssignPlanModal({ member, plans, onClose, onSuccess }) {
//   const [selectedPlanId, setSelectedPlanId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleAssign = async () => {
//     if (!selectedPlanId) {
//       setError("Please select a plan");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await fetch("/api/memberships/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: member._id,
//           planId: selectedPlanId,
//           gymId: "1",
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Failed to assign plan");
//         return;
//       }

//       onSuccess?.();
//       onClose();
//     } catch (err) {
//       setError("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex justify-center items-end z-50">
//       <div className="bg-black w-full rounded-t-3xl p-6">
//         <h2 className="text-lg font-semibold mb-4">
//           Assign Plan to {member.name}
//         </h2>

//         {error && <p className="text-red-500 mb-3">{error}</p>}

//         <select
//           value={selectedPlanId}
//           onChange={(e) => setSelectedPlanId(e.target.value)}
//           className="w-full border p-3 rounded mb-4"
//         >
//           <option value="" className="bg-black">Select Plan</option>
//           {plans.map((plan) => (
//             <option key={plan._id} value={plan._id} className="bg-black">
//               {plan.name} – ₹{plan.price}
//             </option>
//           ))}
//         </select>

//         <button
//           onClick={handleAssign}
//           disabled={loading}
//           className="w-full bg-zinc-800 text-white p-3 rounded-xl"
//         >
//           {loading ? "Assigning..." : "Assign Plan"}
//         </button>

//         <button
//           onClick={onClose}
//           className="w-full mt-2 text-center text-gray-500"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";

export default function AssignPlanModal({
  member,
  plans,
  onClose,
  onSuccess,
}) {
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAssign = async () => {
    setError("");

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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60">
      {/* MODAL */}
      <div
        className="
          w-full sm:max-w-lg
          bg-neutral-950
          rounded-t-3xl sm:rounded-3xl
          border border-white/10
          p-5
          space-y-4
        "
      >
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">
            Assign Plan — {member.name}
          </h2>
          <button onClick={onClose} className="text-white/60 text-lg">
            ✕
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-400 text-center">{error}</p>
        )}

        {/* PLANS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
          {plans.map((plan) => (
            <button
              key={plan._id}
              type="button"
              onClick={() => setSelectedPlanId(plan._id)}
              className={`p-4 rounded-2xl text-left border transition ${
                selectedPlanId === plan._id
                  ? "bg-orange-500 text-black border-orange-500"
                  : "bg-white/5 border-white/10 text-white"
              }`}
            >
              <p className="font-semibold text-base">{plan.name}</p>
              <p className="text-sm opacity-80">₹{plan.price}</p>
            </button>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={handleAssign}
            disabled={loading}
            className="flex-1 py-3 rounded-xl bg-green-500 text-black font-bold disabled:opacity-50"
          >
            {loading ? "Assigning..." : "Assign Plan"}
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-white/20 text-white font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
