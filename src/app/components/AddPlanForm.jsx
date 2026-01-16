// "use client";

// import { useState } from "react";

// export default function AddPlanForm({
//   onClose,
//   onSuccess,
//   initialData = null,
//   planId = null,
// }) {
//   const [name, setName] = useState(initialData?.name || "");
//   const [durationType, setDurationType] = useState(
//     initialData
//       ? initialData.durationDays % 30 === 0
//         ? "months"
//         : "days"
//       : "months"
//   );
//   const [duration, setDuration] = useState(
//     initialData
//       ? initialData.durationDays % 30 === 0
//         ? initialData.durationDays / 30
//         : initialData.durationDays
//       : ""
//   );
//   const [price, setPrice] = useState(initialData?.price || "");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSave = async () => {
//     setError("");

//     if (!name || !duration || !price) {
//       setError("Please fill all required fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       const url = planId ? `/api/plans/${planId}` : "/api/plans/create";
//       const method = planId ? "PATCH" : "POST";

//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name,
//           duration: Number(duration),
//           durationType,
//           price: Number(price),
//           gymId: "1",
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Failed to create plan");
//         return;
//       }

//       // ✅ SUCCESS
//       onSuccess?.(); // refresh plans list
//       onClose(); // close modal
//     } catch (err) {
//       console.error(err);
//       setError("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className=" mb-3 bg-black/40 flex justify-center items-end z-50">
//       <div className="w-full rounded-t-3xl bg-black p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold">Add Plan</h2>
//           <button onClick={onClose}>✕</button>
//         </div>

//         {error && (
//           <p className="mb-3 text-sm text-red-500 text-center">{error}</p>
//         )}

//         {/* Plan Name */}
//         <input
//           placeholder="Plan Name (Eg. 6 Months)"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="block w-full mb-3 p-3 rounded border"
//         />

//         {/* Duration Type */}
//         <div className="flex gap-3 mb-3">
//           {["months", "days"].map((type) => (
//             <button
//               key={type}
//               type="button"
//               onClick={() => setDurationType(type)}
//               className={`flex-1 py-2 rounded ${
//                 durationType === type ? "bg-black text-white" : "border"
//               }`}
//             >
//               {type === "months" ? "Months" : "Days"}
//             </button>
//           ))}
//         </div>

//         {/* Duration */}
//         <input
//           placeholder={`Duration (${
//             durationType === "months" ? "Eg. 6" : "Eg. 30"
//           })`}
//           value={duration}
//           onChange={(e) => setDuration(e.target.value)}
//           className="block w-full mb-3 p-3 rounded border"
//         />

//         {/* Price */}
//         <input
//           placeholder="Plan Amount (Eg. 5000)"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           className="block w-full mb-4 p-3 rounded border"
//         />

//         <button
//           onClick={handleSave}
//           disabled={loading}
//           className="w-full bg-zinc-800 text-white py-3 rounded-xl disabled:opacity-50"
//         >
//           {loading ? "Saving..." : planId ? "Update Plan" : "Add Plan"}
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";

export default function AddPlanForm({
  onClose,
  onSuccess,
  initialData = null,
  planId = null,
}) {
  const [name, setName] = useState(initialData?.name || "");
  const [durationType, setDurationType] = useState(
    initialData
      ? initialData.durationDays % 30 === 0
        ? "months"
        : "days"
      : "months"
  );
  const [duration, setDuration] = useState(
    initialData
      ? initialData.durationDays % 30 === 0
        ? initialData.durationDays / 30
        : initialData.durationDays
      : ""
  );
  const [price, setPrice] = useState(initialData?.price || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setError("");

    if (!name || !duration || !price) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const url = planId ? `/api/plans/${planId}` : "/api/plans/create";
      const method = planId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          duration: Number(duration),
          durationType,
          price: Number(price),
          gymId: "1",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to save plan");
        return;
      }

      onSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
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
          rounded-t-3xl sm:rounded-3xl
          bg-neutral-950
          border border-white/10
          p-5
          space-y-4
        "
      >
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">
            {planId ? "Update Plan" : "Add New Plan"}
          </h2>
          <button onClick={onClose} className="text-white/60 text-lg">
            ✕
          </button>
        </div>

        {error && <p className="text-sm text-red-400 text-center">{error}</p>}

        {/* PLAN NAME */}
        <input
          placeholder="Plan Name (eg. 6 Months)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white"
        />

        {/* DURATION TYPE */}
        <div>
          <p className="text-sm mb-2 text-white/70">Duration Type</p>
          <div className="grid grid-cols-2 gap-3">
            {["months", "days"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setDurationType(type)}
                className={`py-3 rounded-xl font-semibold ${
                  durationType === type
                    ? "bg-orange-500 text-black"
                    : "bg-white/10 text-white"
                }`}
              >
                {type === "months" ? "Months" : "Days"}
              </button>
            ))}
          </div>
        </div>

        {/* DURATION */}
        <input
          placeholder={
            durationType === "months" ? "Duration (eg. 6)" : "Duration (eg. 30)"
          }
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white"
        />

        {/* PRICE */}
        <input
          placeholder="Plan Amount (eg. 5000)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white"
        />

        {/* ACTION */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-green-500 text-black font-bold disabled:opacity-50"
        >
          {loading ? "Saving..." : planId ? "Update Plan" : "Add Plan"}
        </button>
      </div>
    </div>
  );
}
