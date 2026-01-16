// "use client";

// import { useState, useEffect } from "react";
// import AddMemberButton from "./AddMemberButton";
// import AddMemberForm from "./AddMemberForm";
// import AssignPlanModal from "./AssignPlanModal";

// export default function ManagerClient() {
//   const [showForm, setShowForm] = useState(false);
//   const [members, setMembers] = useState([]);
//   const [plans, setPlans] = useState([]);
//   const [memberships, setMemberships] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [showAssignPlan, setShowAssignPlan] = useState(false);
//   const [selectedMember, setSelectedMember] = useState(null);
//   const [stats, setStats] = useState(null);

//   /* ----------------------------------
//      FETCH STATS
//   ---------------------------------- */
//   const fetchStats = async () => {
//     const res = await fetch("/api/manager/stats?gymId=1");
//     const data = await res.json();
//     setStats(data);
//   };

//   /* ----------------------------------
//      FETCH MEMBERSHIP FOR ONE USER
//   ---------------------------------- */
//   const fetchMembershipForUser = async (userId) => {
//     const res = await fetch(`/api/memberships/by-user?userId=${userId}`);
//     const data = await res.json();
//     return data.membership || null;
//   };

//   /* ----------------------------------
//      FETCH MEMBERS + THEIR MEMBERSHIPS
//   ---------------------------------- */
//   const fetchMembers = async () => {
//     try {
//       const res = await fetch("/api/members");
//       const data = await res.json();
//       const membersList = data.members || [];

//       setMembers(membersList);

//       // Build membership map
//       const membershipMap = {};
//       for (const member of membersList) {
//         const membership = await fetchMembershipForUser(member._id);
//         if (membership) {
//           membershipMap[member._id] = membership;
//         }
//       }

//       setMemberships(membershipMap);
//     } catch (err) {
//       console.error("Failed to fetch members", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ----------------------------------
//      FETCH PLANS (ONCE)
//   ---------------------------------- */
//   const fetchPlans = async () => {
//     const res = await fetch("/api/plans?gymId=1");
//     const data = await res.json();
//     setPlans(data.plans || []);
//   };

//   /* ----------------------------------
//      INITIAL LOAD
//   ---------------------------------- */
//   useEffect(() => {
//     fetchMembers();
//     fetchPlans();
//     fetchStats();
//   }, []);

//   if (loading) return <p>Loading members...</p>;

//   function getRemainingDays(endDate) {
//     const end = new Date(endDate);
//     const today = new Date();

//     const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));

//     return diff > 0 ? diff : 0;
//   }

//   return (
//     <>
//       {stats && (
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div className="p-4 rounded-xl bg-white/10">
//             <p className="text-sm text-gray-400">Total Members</p>
//             <p className="text-2xl font-bold">{stats.totalMembers}</p>
//           </div>

//           <div className="p-4 rounded-xl bg-white/10">
//             <p className="text-sm text-gray-400">Total Plans</p>
//             <p className="text-2xl font-bold">{stats.totalPlans}</p>
//           </div>

//           <div className="p-4 rounded-xl bg-white/10">
//             <p className="text-sm text-gray-400">Members Added Today</p>
//             <p className="text-xl font-semibold">{stats.membersToday}</p>
//           </div>

//           <div className="p-4 rounded-xl bg-white/10">
//             <p className="text-sm text-gray-400">This Month</p>
//             <p className="text-xl font-semibold">{stats.membersThisMonth}</p>
//           </div>

//           <div className="p-4 rounded-xl bg-white/10 col-span-2">
//             <p className="text-sm text-gray-400">This Year</p>
//             <p className="text-xl font-semibold">{stats.membersThisYear}</p>
//           </div>
//         </div>
//       )}
//       {/* ADD MEMBER */}
//       <div className="mb-6">
//         <AddMemberButton onClick={() => setShowForm(true)} />
//         {showForm && <AddMemberForm onClose={() => setShowForm(false)} />}
//       </div>
//       {/* MEMBERS LIST */}
//       <div className="space-y-4">
//         {members.map((member) => {
//           const membership = memberships[member._id];

//           let remainingDays = null;
//           if (membership) {
//             const today = new Date();
//             const end = new Date(membership.endDate);
//             remainingDays = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
//           }

//           return (
//             <div
//               key={member._id}
//               className="border border-white/20 rounded-xl p-4"
//             >
//               <p>
//                 <b>Name:</b> {member.name}
//               </p>
//               <p>
//                 <b>Phone:</b> {member.phone}
//               </p>
//               <p>
//                 <b>Gender:</b> {member.gender || "—"}
//               </p>
//               <p>
//                 <b>Batch:</b> {member.batch || "—"}
//               </p>
//               {/* CONDITIONAL UI */}
//               {membership ? (
//                 <div className="mt-2 p-3 rounded-lg bg-white/5 border border-white/10">
//                   <p>
//                     <b>Plan:</b> {membership.planId?.name}
//                   </p>
//                   <p>
//                     <b>Started:</b>{" "}
//                     {new Date(membership.startDate).toLocaleDateString()}
//                   </p>
//                   <p>
//                     <b>Expires:</b>{" "}
//                     {new Date(membership.endDate).toLocaleDateString()}
//                   </p>
//                   <p className="text-green-400">
//                     {getRemainingDays(membership.endDate)} days remaining
//                   </p>

//                   <button
//                     onClick={() => {
//                       setSelectedMember(member);
//                       setShowAssignPlan(true);
//                     }}
//                     className="mt-2 px-3 py-1 bg-orange-500 text-black rounded"
//                   >
//                     Change Plan
//                   </button>
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => {
//                     setSelectedMember(member);
//                     setShowAssignPlan(true);
//                   }}
//                   className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
//                 >
//                   Assign Plan
//                 </button>
//               )}
//             </div>
//           );
//         })}
//       </div>
//       {/* ASSIGN PLAN MODAL (OUTSIDE MAP — VERY IMPORTANT) */}
//       {showAssignPlan && selectedMember && (
//         <AssignPlanModal
//           member={selectedMember}
//           plans={plans}
//           onClose={() => {
//             setShowAssignPlan(false);
//             setSelectedMember(null);
//           }}
//           onSuccess={async () => {
//             const membership = await fetchMembershipForUser(selectedMember._id);

//             setMemberships((prev) => ({
//               ...prev,
//               [selectedMember._id]: membership,
//             }));

//             setShowAssignPlan(false);
//             setSelectedMember(null);
//           }}
//         />
//       )}
//     </>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import AddMemberButton from "./AddMemberButton";
import AddMemberForm from "./AddMemberForm";
import AssignPlanModal from "./AssignPlanModal";

export default function ManagerClient() {
  const [showForm, setShowForm] = useState(false);
  const [members, setMembers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [memberships, setMemberships] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAssignPlan, setShowAssignPlan] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [stats, setStats] = useState(null);

  // const fetchStats = async () => {
  //   const res = await fetch("/api/manager/stats?gymId=1");
  //   const data = await res.json();
  //   setStats(data);
  // };

  const fetchMembershipForUser = async (userId) => {
    const res = await fetch(`/api/memberships/by-user?userId=${userId}`);
    const data = await res.json();
    return data.membership || null;
  };

  const fetchMembers = async () => {
    try {
      const res = await fetch("/api/members");
      const data = await res.json();
      const membersList = data.members || [];

      setMembers(membersList);

      const membershipMap = {};
      for (const member of membersList) {
        const membership = await fetchMembershipForUser(member._id);
        if (membership) membershipMap[member._id] = membership;
      }

      setMemberships(membershipMap);
    } catch (err) {
      console.error("Failed to fetch members", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlans = async () => {
    const res = await fetch("/api/plans?gymId=1");
    const data = await res.json();
    setPlans(data.plans || []);
  };

  useEffect(() => {
    fetchMembers();
    fetchPlans();
    // fetchStats();
  }, []);

  if (loading) return <p className="text-white/60">Loading members...</p>;

  function getRemainingDays(endDate) {
    const diff =
      Math.ceil((new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24)) || 0;
    return diff > 0 ? diff : 0;
  }

  return (
    <>
      {/* 📊 STATS */}
      {/* {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[
            ["Total Members", stats.totalMembers],
            ["Total Plans", stats.totalPlans],
            ["Members Today", stats.membersToday],
            ["This Month", stats.membersThisMonth],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl bg-white/5 border border-white/10 p-4"
            >
              <p className="text-xs text-white/60">{label}</p>
              <p className="text-2xl font-bold mt-1">{value}</p>
            </div>
          ))}

          <div className="rounded-2xl bg-white/5 border border-white/10 p-4 sm:col-span-2">
            <p className="text-xs text-white/60">This Year</p>
            <p className="text-2xl font-bold mt-1">{stats.membersThisYear}</p>
          </div>
        </div>
      )} */}

      {/* ➕ ADD MEMBER */}
      <div className="mb-6">
        <AddMemberButton onClick={() => setShowForm(true)} />
        {showForm && <AddMemberForm onClose={() => setShowForm(false)} />}
      </div>

      {/* 👥 MEMBERS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {members.map((member) => {
          const membership = memberships[member._id];

          return (
            <div
              key={member._id}
              className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-2"
            >
              <div>
                <p className="text-lg font-semibold">{member.name}</p>
                <p className="text-sm text-white/60">{member.phone}</p>
              </div>

              <div className="text-sm text-white/70 flex flex-wrap gap-x-4">
                <span>Gender: {member.gender || "—"}</span>
                <span>Batch: {member.batch || "—"}</span>
              </div>

              {membership ? (
                <div className="mt-3 rounded-xl bg-black/30 border border-white/10 p-3 space-y-1">
                  <p className="text-sm">
                    <b>Plan:</b> {membership.planId?.name}
                  </p>
                  <p className="text-xs text-white/60">
                    {new Date(membership.startDate).toLocaleDateString()} →{" "}
                    {new Date(membership.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-green-400 text-sm">
                    {getRemainingDays(membership.endDate)} days left
                  </p>

                  <button
                    className="mt-2 w-full py-2 rounded-xl bg-orange-500 text-black font-semibold"
                    onClick={() => {
                      setSelectedMember(member);
                      setShowAssignPlan(true);
                    }}
                  >
                    Change Plan
                  </button>
                </div>
              ) : (
                <button
                  className="mt-3 w-full py-2 rounded-xl bg-blue-500 text-white font-semibold"
                  onClick={() => {
                    setSelectedMember(member);
                    setShowAssignPlan(true);
                  }}
                >
                  Assign Plan
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* 📌 ASSIGN PLAN MODAL */}
      {showAssignPlan && selectedMember && (
        <AssignPlanModal
          member={selectedMember}
          plans={plans}
          onClose={() => {
            setShowAssignPlan(false);
            setSelectedMember(null);
          }}
          onSuccess={async () => {
            const membership = await fetchMembershipForUser(selectedMember._id);
            setMemberships((prev) => ({
              ...prev,
              [selectedMember._id]: membership,
            }));
            setShowAssignPlan(false);
            setSelectedMember(null);
          }}
        />
      )}
    </>
  );
}
