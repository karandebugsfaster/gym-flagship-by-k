// "use client";

// import { useEffect, useState } from "react";

// export default function ExpiringSoonMembersSection({ gymId }) {
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   async function fetchExpiring() {
//     setLoading(true);

//     const res = await fetch(`/api/memberships/expiring-soon?gymId=${gymId}`, {
//       cache: "no-store", // 🔥 THIS IS THE KEY FIX
//     });

//     const data = await res.json();
//     setMembers(data.expiringSoon || []);
//     setLoading(false);
//   }

//   useEffect(() => {
//     if (gymId) {
//       fetchExpiring();
//     }
//   }, [gymId]); // 🔥 also important

//   if (loading) return <p>Loading expiring members...</p>;

//   if (members.length === 0)
//     return <p className="text-green-400">No plans expiring soon 🎉</p>;

//   return (
//     <div className="space-y-4">
//       {members.map((m) => {
//         const daysLeft = Math.ceil(
//           (new Date(m.endDate) - new Date()) / (1000 * 60 * 60 * 24)
//         );

//         return (
//           <div
//             key={m._id}
//             className="p-4 rounded-xl border border-yellow-500 bg-yellow-500/10"
//           >
//             <p>
//               <b>Name:</b> {m.userId.name}
//             </p>
//             <p>
//               <b>Phone:</b> {m.userId.phone}
//             </p>
//             <p>
//               <b>Plan:</b> {m.planId?.name}
//             </p>
//             <p>
//               <b>Expires On:</b> {new Date(m.endDate).toDateString()}
//             </p>

//             <p className="text-yellow-400">
//               ⏳ Expires in {daysLeft} day{daysLeft > 1 ? "s" : ""}
//             </p>

//             <button
//               onClick={() =>
//                 window.open(
//                   `https://wa.me/91${m.userId.phone}?text=${encodeURIComponent(
//                     `Hi ${m.userId.name}, your gym plan will expire in ${daysLeft} day(s). Please renew to continue your fitness journey 💪`
//                   )}`,
//                   "_blank"
//                 )
//               }
//               className="mt-3 px-3 py-1 bg-green-600 text-white rounded"
//             >
//               💬 Send Reminder
//             </button>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";

export default function ExpiringSoonMembersSection({ gymId }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchExpiring() {
    setLoading(true);

    const res = await fetch(`/api/memberships/expiring-soon?gymId=${gymId}`, {
      cache: "no-store",
    });

    const data = await res.json();
    setMembers(data.expiringSoon || []);
    setLoading(false);
  }

  useEffect(() => {
    if (gymId) fetchExpiring();
  }, [gymId]);

  if (loading)
    return <p className="text-white/60">Loading expiring members…</p>;

  if (members.length === 0)
    return (
      <div className="rounded-2xl bg-green-500/10 border border-green-500/30 p-4 text-green-400">
        🎉 No memberships expiring soon
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {members.map((m) => {
        const daysLeft = Math.ceil(
          (new Date(m.endDate) - new Date()) / (1000 * 60 * 60 * 24)
        );

        return (
          <div
            key={m._id}
            className="
              rounded-2xl
              border border-yellow-500/40
              bg-yellow-500/10
              p-4
              space-y-3
            "
          >
            {/* HEADER */}
            <div>
              <p className="text-lg font-bold">{m.userId.name}</p>
              <p className="text-sm text-white/70">📞 {m.userId.phone}</p>
            </div>

            {/* PLAN INFO */}
            <div className="text-sm text-white/80 space-y-1">
              <p>
                <b>Plan:</b> {m.planId?.name || "—"}
              </p>
              <p>
                <b>Expires On:</b> {new Date(m.endDate).toDateString()}
              </p>
              <p className="text-yellow-400 font-semibold">
                ⏳ {daysLeft} day{daysLeft > 1 ? "s" : ""} left
              </p>
            </div>

            {/* ACTION */}
            <button
              onClick={() =>
                window.open(
                  `https://wa.me/91${m.userId.phone}?text=${encodeURIComponent(
                    `Hi ${m.userId.name}, your gym plan will expire in ${daysLeft} day(s). Please renew to continue your fitness journey 💪`
                  )}`,
                  "_blank"
                )
              }
              className="w-full py-2 rounded-xl bg-green-600 text-white font-semibold"
            >
              💬 Send WhatsApp Reminder
            </button>
          </div>
        );
      })}
    </div>
  );
}
