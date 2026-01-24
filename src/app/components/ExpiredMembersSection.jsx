// "use client";

// import { useEffect, useState } from "react";
// import AssignPlanModal from "./AssignPlanModal";
// import { openWhatsApp } from "@/lib/whatsapp";

// export default function ExpiredMembersSection({ gymId, plans }) {
//   const [expired, setExpired] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedMember, setSelectedMember] = useState(null);

//   async function fetchExpired() {
//     const res = await fetch(`/api/memberships/expired?gymId=${gymId}`);
//     const data = await res.json();
//     setExpired(data.expiredMemberships || []);
//     setLoading(false);
//   }

//   useEffect(() => {
//     fetchExpired();
//   }, []);

//   if (loading) return <p>Loading expired members...</p>;

//   if (expired.length === 0)
//     return <p className="text-green-400">No expired members 🎉</p>;

//   return (
//     <div className="space-y-4">
//       {expired.map((m) => {
//         const daysExpired = Math.floor(
//           (new Date() - new Date(m.endDate)) / (1000 * 60 * 60 * 24)
//         );

//         return (
//           <div
//             key={m._id}
//             className="p-4 rounded-xl border border-red-500 bg-red-500/10"
//           >
//             <p>
//               <b>Name:</b> {m.userId.name}
//             </p>
//             <p>
//               <b>Phone:</b> {m.userId.phone}
//             </p>
//             <p>
//               <b>Last Plan:</b> {m.planId?.name}
//             </p>
//             <p>
//               <b>Expired On:</b> {new Date(m.endDate).toDateString()}
//             </p>
//             <p className="text-red-400">Expired {daysExpired} days ago</p>

//             <button
//               onClick={() => setSelectedMember(m.userId)}
//               className="mt-3 px-3 py-1 bg-orange-500 text-white rounded"
//             >
//               Renew Plan
//             </button>
//             <button
//               onClick={() =>
//                 window.open(
//                   `https://wa.me/91${m.userId.phone}?text=${encodeURIComponent(
//                     `Hi ${m.userId.name}, your gym plan expired on ${new Date(
//                       m.endDate
//                     ).toDateString()}. Please renew to continue training 💪`
//                   )}`,
//                   "_blank"
//                 )
//               }
//               className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
//             >
//               💬 Send Expiry Message
//             </button>
//           </div>
//         );
//       })}

//       {selectedMember && (
//         <AssignPlanModal
//           member={selectedMember}
//           plans={plans}
//           onClose={() => setSelectedMember(null)}
//           onSuccess={() => {
//             setSelectedMember(null);
//             fetchExpired(); // 🔥 auto refresh
//           }}
//         />
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import AssignPlanModal from "./AssignPlanModal";

export default function ExpiredMembersSection({ gymId, plans }) {
  const [expired, setExpired] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExpiredMembership, setSelectedExpiredMembership] =
    useState(null);

  // 🔍 SEARCH STATE (NEW)
  const [search, setSearch] = useState("");

  // 🗑️ DELETE STATE
  const [deleting, setDeleting] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // 🗑️ DELETE MEMBER FUNCTION
  async function handleDeleteMember(memberId, membershipId) {
    try {
      setDeleting(memberId);
      const res = await fetch(
        `/api/members/delete?userId=${memberId}&membershipId=${membershipId}`,
        { method: "DELETE" },
      );

      if (!res.ok) {
        const errorData = await res.json();
        alert(`❌ Failed to delete: ${errorData.error}`);
        setDeleting(null);
        return;
      }

      // Remove from state
      setExpired((prev) => prev.filter((item) => item._id !== membershipId));
      setDeleteConfirm(null);
      alert("✅ Member deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Error deleting member");
      setDeleting(null);
    }
  }

  async function fetchExpired() {
    const res = await fetch(`/api/memberships/expired?gymId=${gymId}`);
    const data = await res.json();
    setExpired(data.expiredMemberships || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchExpired();
  }, []);

  if (loading) return <p className="text-white/60">Loading expired members…</p>;

  /* ---------------- SEARCH FILTER (IMPORTANT) ---------------- */

  const filteredExpired = expired.filter((m) => {
    // Skip if userId is null (deleted user)
    if (!m.userId) return false;
    return (
      m.userId.name.toLowerCase().includes(search.toLowerCase()) ||
      m.userId.phone.includes(search)
    );
  });

  if (filteredExpired.length === 0)
    return (
      <>
        {/* 🔍 SEARCH BAR */}
        <input
          type="text"
          placeholder="Search by name or phone…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full mb-4 px-4 py-2
            rounded-xl bg-black
            border border-white/20
            text-white placeholder-white/40
            focus:outline-none focus:border-orange-500
          "
        />

        <div className="rounded-2xl bg-green-500/10 border border-green-500/30 p-4 text-green-400">
          🎉 No expired members match your search
        </div>
      </>
    );

  return (
    <>
      {/* 🔍 SEARCH BAR */}
      <input
        type="text"
        placeholder="Search by name or phone…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full mb-4 px-4 py-2
          rounded-xl bg-black
          border border-white/20
          text-white placeholder-white/40
          focus:outline-none focus:border-orange-500
        "
      />

      {/* ❌ EXPIRED MEMBERS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredExpired.map((m) => {
          // Skip if userId is null (deleted user)
          if (!m.userId) return null;

          const daysExpired = Math.floor(
            (new Date() - new Date(m.endDate)) / (1000 * 60 * 60 * 24),
          );

          return (
            <div
              key={m._id}
              className="
                rounded-2xl
                border border-red-500/40
                bg-red-500/10
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
                  <b>Last Plan:</b> {m.planId?.name || "—"}
                </p>
                <p>
                  <b>Expired On:</b> {new Date(m.endDate).toDateString()}
                </p>
                <p className="text-red-400 font-semibold">
                  ❌ Expired {daysExpired} days ago
                </p>
              </div>

              {/* ACTIONS */}
              <div className="grid grid-cols-1 gap-2 pt-2">
                <button
                  onClick={() => setSelectedExpiredMembership(m)}
                  className="w-full py-2 rounded-xl bg-orange-500 text-white font-bold hover:bg-orange-600 transition"
                >
                  Renew Plan
                </button>

                <button
                  onClick={() =>
                    window.open(
                      `https://wa.me/91${
                        m.userId.phone
                      }?text=${encodeURIComponent(
                        `Hi ${
                          m.userId.name
                        }, your gym plan expired on ${new Date(
                          m.endDate,
                        ).toDateString()}. Please renew to continue training 💪`,
                      )}`,
                      "_blank",
                    )
                  }
                  className="w-full py-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                >
                  💬 Send WhatsApp Reminder
                </button>

                {/* DELETE BUTTON */}
                {deleteConfirm === m._id ? (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleDeleteMember(m.userId._id, m._id)}
                      disabled={deleting === m.userId._id}
                      className="py-2 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition disabled:opacity-50"
                    >
                      {deleting === m.userId._id ? "Deleting..." : "Confirm"}
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="py-2 rounded-xl bg-gray-700 text-white font-semibold hover:bg-gray-800 transition"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(m._id)}
                    className="w-full py-2 rounded-xl bg-red-500/20 border border-red-500 text-red-400 font-semibold hover:bg-red-500/30 transition"
                  >
                    🗑️ Delete Member
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 🔁 ASSIGN PLAN MODAL */}
      {selectedExpiredMembership && (
        <AssignPlanModal
          member={selectedExpiredMembership.userId}
          plans={plans}
          onClose={() => setSelectedExpiredMembership(null)}
          onSuccess={() => {
            setExpired((prev) =>
              prev.filter((item) => item._id !== selectedExpiredMembership._id),
            );
            setSelectedExpiredMembership(null);
          }}
        />
      )}
    </>
  );
}
