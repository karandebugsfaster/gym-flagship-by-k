// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AddMemberForm({onClose}) {
//   // const router = useRouter();

//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [gender, setGender] = useState("male");
//   const [batch, setBatch] = useState("morning");
//   const [gymId, setGymId] = useState("");
//   const [memberId, setMemberId] = useState("");

//   const handleSave = async () => {
//     if (!name || !phone || !gymId || !memberId) {
//       alert("Please fill all required fields");
//       return;
//     }

//     // const res = await fetch("/api/members/add", {
//     //   method: "POST",
//     //   headers: { "Content-Type": "application/json" },
//     //   body: JSON.stringify({
//     //     name,
//     //     phone,
//     //     gender,
//     //     batch,
//     //     gymId,
//     //     memberId,
//     //   }),
//     // });

//     // const data = await res.json();

//     // if (res.ok) {
//     //   router.push(`/members/${data.user.id}`);
//     // }
//   };

//   return (
//     <div className="mt-6 p-4 rounded-xl bg-white/10">
//       <h2 className="text-xl font-bold mb-4">Add Member</h2>

//       {/* Name */}
//       <input
//         placeholder="Member Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className="block w-full mb-3 p-2 rounded text-white"
//       />

//       {/* Phone */}
//       <input
//         placeholder="Phone Number"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//         className="block w-full mb-3 p-2 rounded text-white"
//       />
//       {/* Gym ID */}
//       <input
//         placeholder="Gym ID"
//         value={gymId}
//         onChange={(e) => setGymId(e.target.value)}
//         className="block w-full mb-3 p-2 rounded text-white"
//         required
//       />

//       {/* Member ID */}
//       <input
//         placeholder="Member ID"
//         value={memberId}
//         onChange={(e) => setMemberId(e.target.value)}
//         className="block w-full mb-3 p-2 rounded text-white"
//         required
//       />

//       {/* Gender */}
//       <div className="mb-3">
//         <p className="mb-1">Gender</p>
//         <div className="flex gap-3">
//           {["male", "female"].map((g) => (
//             <button
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
//           className="px-4 py-2 bg-green-500 text-black rounded"
//         >
//           Proceed
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

export default function AddMemberForm({ onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("male");
  const [batch, setBatch] = useState("morning");
  const [gymId, setGymId] = useState("");
  const [memberId, setMemberId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setError("");

    if (!name || !phone || !gymId || !memberId) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/members/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          gender,
          batch,
          gymId,
          memberId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to add member");
        return;
      }

      // ✅ SUCCESS
      onClose(); // close modal
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" mb-3 p-4 rounded-xl bg-white/10">
      <h2 className="text-xl font-bold mb-4">Add Member</h2>

      {error && (
        <p className="mb-3 text-sm text-red-400 text-center">{error}</p>
      )}

      <input
        placeholder="Member Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="block w-full mb-3 p-2 rounded text-white bg-transparent border border-white/20"
      />

      <input
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="block w-full mb-3 p-2 rounded text-white bg-transparent border border-white/20"
      />

      <input
        placeholder="Gym ID"
        value={gymId}
        onChange={(e) => setGymId(e.target.value)}
        className="block w-full mb-3 p-2 rounded text-white bg-transparent border border-white/20"
      />

      <input
        placeholder="Member ID"
        value={memberId}
        onChange={(e) => setMemberId(e.target.value)}
        className="block w-full mb-3 p-2 rounded text-white bg-transparent border border-white/20"
      />

      {/* Gender */}
      <div className="mb-3">
        <p className="mb-1">Gender</p>
        <div className="flex gap-3">
          {["male", "female"].map((g) => (
            <button
              type="button"
              key={g}
              onClick={() => setGender(g)}
              className={`px-4 py-2 rounded ${
                gender === g ? "bg-orange-500 text-black" : "bg-white/20"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Batch */}
      <div className="mb-4">
        <p className="mb-1">Batch</p>
        <div className="flex gap-3 flex-wrap">
          {["morning", "noon", "evening", "night"].map((b) => (
            <button
              type="button"
              key={b}
              onClick={() => setBatch(b)}
              className={`px-4 py-2 rounded ${
                batch === b ? "bg-orange-500 text-black" : "bg-white/20"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-black rounded disabled:opacity-50"
        >
          {loading ? "Saving..." : "Proceed"}
        </button>

        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-400 text-black rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
