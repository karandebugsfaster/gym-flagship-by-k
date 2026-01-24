// "use client";

// import { useEffect, useState } from "react";
// import { openWhatsApp } from "@/lib/whatsapp";
// import AssignPlanModal from "./AssignPlanModal";

// export default function MemberDetailSheet({ member, onClose }) {
//   if (!member) return null;

//   const [membership, setMembership] = useState(null);
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showAssignPlan, setShowAssignPlan] = useState(false);

//   /* ---------------- FETCH MEMBERSHIP (ONLY THIS USER) ---------------- */
//   async function fetchMembership() {
//     try {
//       const res = await fetch(
//         `/api/memberships/by-user?userId=${member._id}`,
//       );
//       const data = await res.json();
//       setMembership(data.membership || null);
//     } catch (err) {
//       console.error("Failed to fetch membership", err);
//     }
//   }

//   /* ---------------- FETCH PLANS ---------------- */
//   async function fetchPlans() {
//     try {
//       const res = await fetch(`/api/plans?gymId=1`);
//       const data = await res.json();
//       setPlans(data.plans || []);
//     } catch (err) {
//       console.error("Failed to fetch plans", err);
//     }
//   }

//   useEffect(() => {
//     fetchMembership();
//     fetchPlans();
//     setLoading(false);
//   }, [member._id]);

//   function getRemainingDays(endDate) {
//     const diff = Math.ceil(
//       (new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24),
//     );
//     return diff > 0 ? diff : 0;
//   }

//   /* ---------------- UI ---------------- */
//   return (
//     <div className="fixed inset-0 z-50 bg-black/60 flex items-end">
//       <div className="w-full rounded-t-3xl bg-zinc-950 p-6 space-y-5">
//         {/* DRAG BAR */}
//         <div className="w-12 h-1 bg-white/30 rounded mx-auto" />

//         {/* PROFILE */}
//         <div className="flex flex-col items-center text-center space-y-2">
//           <div className="w-20 h-20 rounded-full bg-zinc-700 flex items-center justify-center text-3xl">
//             👤
//           </div>

//           <h2 className="text-xl font-bold">{member.name}</h2>
//           <p className="text-white/60">🎟️ {member.memberId}</p>

//           {/* ACTION ICONS */}
//           <div className="flex gap-4 mt-2">
//             <a href={`tel:${member.phone}`} className="icon-btn">
//               📞
//             </a>

//             <button
//               onClick={() =>
//                 openWhatsApp(
//                   member.phone,
//                   `Hi ${member.name}, this is from our gym 💪`,
//                 )
//               }
//               className="icon-btn"
//             >
//               💬
//             </button>
//           </div>
//         </div>

//         <hr className="border-white/10" />

//         {/* MEMBERSHIP DETAILS */}
//         <div className="space-y-2">
//           <p className="text-sm text-white/60">Membership</p>

//           {!membership && (
//             <p className="text-white/40 text-sm">No active plan</p>
//           )}

//           {membership && (
//             <>
//               <p className="font-semibold">
//                 {membership.planId?.name || "Plan"}
//               </p>

//               <p className="text-sm text-green-400">
//                 {getRemainingDays(membership.endDate)} days left
//               </p>

//               <div className="flex items-center justify-between text-xs text-white/60 bg-white/5 rounded-xl px-3 py-2">
//                 <span>
//                   {new Date(membership.startDate).toDateString()}
//                 </span>
//                 <span>→</span>
//                 <span>
//                   {new Date(membership.endDate).toDateString()}
//                 </span>
//               </div>
//             </>
//           )}
//         </div>

//         {/* ACTIONS */}
//         <div className="space-y-3 pt-2">
//           <button
//             onClick={() => setShowAssignPlan(true)}
//             className="sheet-btn bg-orange-500 text-black font-semibold"
//           >
//             {membership ? "🔁 Change Plan" : "➕ Assign Plan"}
//           </button>

//           <button className="sheet-btn">
//             ✏️ Edit / Delete Profile
//           </button>
//         </div>

//         {/* ASSIGN PLAN MODAL */}
//         {showAssignPlan && (
//           <AssignPlanModal
//             member={member}
//             plans={plans}
//             onClose={() => setShowAssignPlan(false)}
//             onSuccess={() => {
//               fetchMembership();
//               setShowAssignPlan(false);
//             }}
//           />
//         )}

//         {/* CLOSE */}
//         <button
//           onClick={onClose}
//           className="w-full py-3 rounded-xl bg-white/10 text-white font-semibold mt-2"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { openWhatsApp } from "@/lib/whatsapp";
import AssignPlanModal from "./AssignPlanModal";

export default function MemberDetailSheet({ member, onClose }) {
  if (!member) return null;

  const [membership, setMembership] = useState(null);
  const [plans, setPlans] = useState([]);
  const [showAssignPlan, setShowAssignPlan] = useState(false);

  async function fetchMembership() {
    try {
      const res = await fetch(`/api/memberships/by-user?userId=${member._id}`);
      const data = await res.json();
      setMembership(data.membership || null);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchPlans() {
    try {
      const res = await fetch(`/api/plans?gymId=1`);
      const data = await res.json();
      setPlans(data.plans || []);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchMembership();
    fetchPlans();
  }, [member._id]);

  function remainingDays(endDate) {
    const d = Math.ceil(
      (new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24),
    );
    return d > 0 ? d : 0;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-end">
      {/* SHEET */}
      <div className="w-full max-h-[92vh] rounded-t-3xl bg-zinc-950 border border-white/10 shadow-[0_-20px_60px_rgba(0,0,0,0.9)] p-6 space-y-6 overflow-y-auto">
        {/* DRAG HANDLE */}
        <div className="w-12 h-1.5 rounded-full bg-white/20 mx-auto" />

        {/* PROFILE */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-3xl shadow-inner">
            👤
          </div>

          <div>
            <h2 className="text-xl font-bold">{member.name}</h2>
            <p className="text-sm text-white/50">ID • {member.memberId}</p>
          </div>

          {/* QUICK ACTIONS */}
          <div className="flex gap-4 pt-1">
            <a
              href={`tel:${member.phone}`}
              className="w-11 h-11 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-lg"
            >
              📞
            </a>

            <button
              onClick={() =>
                openWhatsApp(
                  member.phone,
                  `Hi ${member.name}, this is from our gym 💪`,
                )
              }
              className="w-11 h-11 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center text-lg"
            >
              💬
            </button>
          </div>
        </div>

        {/* MEMBERSHIP CARD */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-3">
          <p className="text-xs uppercase tracking-wide text-white/50">
            Membership
          </p>

          {!membership && (
            <p className="text-sm text-white/40">No active plan</p>
          )}

          {membership && (
            <>
              <div className="flex items-center justify-between">
                <p className="font-semibold">
                  {membership.planId?.name || "Plan"}
                </p>
                <span className="text-xs px-3 py-1 rounded-full bg-green-500/15 text-green-400">
                  {remainingDays(membership.endDate)} days left
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-white/60 bg-black/40 rounded-xl px-3 py-2">
                <span>{new Date(membership.startDate).toDateString()}</span>
                <span>→</span>
                <span>{new Date(membership.endDate).toDateString()}</span>
              </div>
            </>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="space-y-3">
          <button
            onClick={() => setShowAssignPlan(true)}
            className="w-full py-3 rounded-xl bg-orange-500 text-black font-semibold text-lg shadow-[0_10px_30px_rgba(249,115,22,0.35)]"
          >
            {membership ? "🔁 Change Plan" : "➕ Assign Plan"}
          </button>

          <button className="w-full py-3 rounded-xl bg-white/10 border border-white/15 font-semibold">
            ✏️ Edit / Delete Profile
          </button>
        </div>

        {/* ASSIGN PLAN MODAL */}
        {showAssignPlan && (
          <AssignPlanModal
            member={member}
            plans={plans}
            onClose={() => setShowAssignPlan(false)}
            onSuccess={() => {
              fetchMembership();
              setShowAssignPlan(false);
            }}
          />
        )}

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-white/10 text-white font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  );
}
