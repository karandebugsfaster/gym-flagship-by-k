// "use client";

// import { useEffect, useState } from "react";
// import { MoreVertical } from "lucide-react";

// export default function TotalMembersClient({ gymId }) {
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");

//   async function fetchMembers() {
//     try {
//       const res = await fetch(`/api/members/with-membership?gymId=${gymId}`);
//       const data = await res.json();
//       setMembers(data.members || []);
//     } catch (err) {
//       console.error("Failed to load members", err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchMembers();
//   }, []);

//   /* ---------------- SEARCH ---------------- */
//   const filtered = members.filter((m) => {
//     const q = search.toLowerCase();
//     return (
//       m.name?.toLowerCase().includes(q) || m.memberId?.toLowerCase().includes(q)
//     );
//   });

//   function daysLeft(endDate) {
//     if (!endDate) return "—";
//     const diff = Math.ceil(
//       (new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24),
//     );
//     return diff > 0 ? `${diff} days left` : "Expired";
//   }

//   if (loading) {
//     return <p className="text-white/60">Loading members…</p>;
//   }

//   return (
//     <>
//       {/* 🔍 SEARCH */}
//       <input
//         type="text"
//         placeholder="Search by name or member ID"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="
//           w-full mb-4 px-4 py-2
//           rounded-xl bg-black
//           border border-white/20
//           text-white placeholder-white/40
//           focus:outline-none focus:border-orange-500
//         "
//       />

//       {/* 👥 MEMBERS LIST */}
//       <div className="space-y-3">
//         {filtered.map((m) => (
//           <div
//             key={m._id}
//             className="
//               flex items-center justify-between
//               rounded-2xl bg-white/5
//               border border-white/10
//               px-4 py-3
//             "
//           >
//             {/* LEFT */}
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
//                 👤
//               </div>

//               <div>
//                 <p className="font-semibold">{m.name}</p>
//                 <p className="text-xs text-white/60">ID: {m.memberId}</p>
//                 <p className="text-xs text-green-400">
//                   {daysLeft(m.membership?.endDate)}
//                 </p>
//               </div>
//             </div>

//             {/* RIGHT */}
//             <button className="text-white/60 hover:text-white">
//               <MoreVertical size={20} />
//             </button>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import MemberDetailSheet from "./MemberDetailSheet";

export default function TotalMembersClient({ gymId }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);

  /* ---------------- FETCH MEMBERS ---------------- */
  async function fetchMembers() {
    try {
      const res = await fetch(`/api/members/summary?gymId=${gymId}`);
      const data = await res.json();

      // ✅ Latest members on top
      const sorted = (data.members || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

      setMembers(sorted);
    } catch (err) {
      console.error("Failed to load members", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (gymId) fetchMembers();
  }, [gymId]);

  /* ---------------- SEARCH FILTER ---------------- */
  const filteredMembers = members.filter((m) => {
    const q = search.toLowerCase();
    return (
      m.name?.toLowerCase().includes(q) || m.memberId?.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return <p className="text-white/60 p-6">Loading members...</p>;
  }

  return (
    <div className="p-4 space-y-4">
      {/* 🔍 SEARCH */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or member ID"
        className="
          w-full px-4 py-2
          rounded-xl bg-black
          border border-white/20
          text-white placeholder-white/40
          focus:outline-none focus:border-orange-500
        "
      />

      {/* 👥 MEMBERS LIST */}
      <div className="space-y-3">
        {filteredMembers.map((m) => (
          <div
            key={m._id}
            onClick={() => setSelectedMember(m)}
            className="
      flex items-center justify-between
      p-4 rounded-2xl
      bg-zinc-900 border border-white/10
      active:scale-[0.98] transition
      cursor-pointer
    "
          >
            {/* LEFT */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-zinc-700 flex items-center justify-center">
                👤
              </div>

              <div>
                <p className="font-semibold text-white">{m.name}</p>
                <p className="text-xs text-white/60">🎟️ {m.memberId || "—"}</p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              <p className="text-sm font-semibold">
                {m.daysLeft === null ? (
                  <span className="text-white/40">No Plan</span>
                ) : m.daysLeft <= 0 ? (
                  <span className="text-red-400">Expired</span>
                ) : (
                  <span className="text-green-400">{m.daysLeft} days</span>
                )}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMember(m);
                }}
                className="text-white/60 text-xl"
              >
                ⋮
              </button>
            </div>
          </div>
        ))}
        {selectedMember && (
          <MemberDetailSheet
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </div>
    </div>
  );
}
// {filteredMembers.map((m) => (
//           <div
//             key={m._id}
//             className="
//               flex items-center justify-between
//               rounded-2xl
//               bg-zinc-900
//               border border-white/10
//               px-4 py-3
//             "
//           >
//             {/* LEFT */}
//             <div className="flex items-center gap-3">
//               {/* Avatar */}
//               <div className="w-11 h-11 rounded-full bg-gray-700/40  flex items-center justify-center">
//                 <span className="text-white/60">👤</span>
//               </div>

//               {/* Info */}
//               <div>
//                 <p className="text-base font-semibold text-white">{m.name}</p>
//                 <p className="text-sm text-white/60">🆔 {m.memberId || "—"}</p>
//                 <p
//                   className={`text-sm font-medium ${
//                     m.daysLeft > 0
//                       ? "text-green-400"
//                       : m.daysLeft === 0
//                         ? "text-red-400"
//                         : "text-white/40"
//                   }`}
//                 >
//                   {m.daysLeft === null
//                     ? "No Plan"
//                     : m.daysLeft === 0
//                       ? "Expired"
//                       : `${m.daysLeft} days left`}
//                 </p>
//               </div>
//             </div>

//             {/* RIGHT */}
//             <button className="text-white/60 text-xl px-2">⋮</button>
//           </div>
//         ))}
