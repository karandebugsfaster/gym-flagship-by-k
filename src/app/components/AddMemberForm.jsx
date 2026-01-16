// "use client";

// import { useState } from "react";

// export default function AddMemberForm({ onClose }) {
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [gender, setGender] = useState("male");
//   const [batch, setBatch] = useState("morning");
//   const [gymId, setGymId] = useState("");
//   const [memberId, setMemberId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSave = async () => {
//     setError("");

//     if (!name || !phone || !gymId || !memberId) {
//       setError("Please fill all required fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await fetch("/api/members/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name,
//           phone,
//           gender,
//           batch,
//           gymId,
//           memberId,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Failed to add member");
//         return;
//       }

//       // ✅ SUCCESS
//       onClose(); // close modal
//     } catch (err) {
//       console.error(err);
//       setError("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className=" mb-3 p-4 rounded-xl bg-white/10">
//       <h2 className="text-xl font-bold mb-4">Add Member</h2>

//       {error && (
//         <p className="mb-3 text-sm text-red-400 text-center">{error}</p>
//       )}

//       <input
//         placeholder="Member Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className="block w-full mb-3 p-2 rounded text-white bg-transparent border border-white/20"
//       />

//       <input
//         placeholder="Phone Number"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//         className="block w-full mb-3 p-2 rounded text-white bg-transparent border border-white/20"
//       />

//       <input
//         placeholder="Gym ID"
//         value={gymId}
//         onChange={(e) => setGymId(e.target.value)}
//         className="block w-full mb-3 p-2 rounded text-white bg-transparent border border-white/20"
//       />

//       <input
//         placeholder="Member ID"
//         value={memberId}
//         onChange={(e) => setMemberId(e.target.value)}
//         className="block w-full mb-3 p-2 rounded text-white bg-transparent border border-white/20"
//       />

//       {/* Gender */}
//       <div className="mb-3">
//         <p className="mb-1">Gender</p>
//         <div className="flex gap-3">
//           {["male", "female"].map((g) => (
//             <button
//               type="button"
//               key={g}
//               onClick={() => setGender(g)}
//               className={`px-4 py-2 rounded ${
//                 gender === g ? "bg-orange-500 text-black" : "bg-white/20"
//               }`}
//             >
//               {g}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Batch */}
//       <div className="mb-4">
//         <p className="mb-1">Batch</p>
//         <div className="flex gap-3 flex-wrap">
//           {["morning", "noon", "evening", "night"].map((b) => (
//             <button
//               type="button"
//               key={b}
//               onClick={() => setBatch(b)}
//               className={`px-4 py-2 rounded ${
//                 batch === b ? "bg-orange-500 text-black" : "bg-white/20"
//               }`}
//             >
//               {b}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="flex gap-3">
//         <button
//           onClick={handleSave}
//           disabled={loading}
//           className="px-4 py-2 bg-green-500 text-black rounded disabled:opacity-50"
//         >
//           {loading ? "Saving..." : "Proceed"}
//         </button>

//         <button
//           onClick={onClose}
//           className="px-4 py-2 bg-gray-400 text-black rounded"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// }
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
          <option value="" className="bg-black">
            Select Plan
          </option>
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
