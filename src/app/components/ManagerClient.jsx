"use client";

import { useState, useEffect } from "react";
import AddMemberButton from "./AddMemberButton";
import AddMemberForm from "./AddMemberForm";
import AssignPlanModal from "./AssignPlanModal";

export default function ManagerClient() {
  const [showForm, setShowForm] = useState(false);
  const [plans, setPlans] = useState([]);
  const [memberships, setMemberships] = useState({});
  const [showAssignPlan, setShowAssignPlan] = useState(false);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);

  /* ---------------- FETCH MEMBERSHIPS ---------------- */

  const fetchMembershipForUser = async (userId) => {
    const res = await fetch(`/api/memberships/by-user?userId=${userId}`);
    const data = await res.json();
    return data.membership || null;
  };

  /* ---------------- FETCH MEMBERS ---------------- */

  const fetchMembers = async () => {
    try {
      const res = await fetch("/api/members");
      const data = await res.json();
      const membersList = data.members || [];

      setMembers(membersList);
      const promises = membersList.map(async (member) => {
        const membership = await fetchMembershipForUser(member._id);
        return { userId: member._id, membership };
      });

      const results = await Promise.all(promises);

      const membershipMap = {};
      results.forEach(({ userId, membership }) => {
        if (membership) membershipMap[userId] = membership;
      });

      setMemberships(membershipMap);
    } catch (err) {
      console.error("Failed to fetch members", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- FETCH PLANS ---------------- */

  const fetchPlans = async () => {
    const res = await fetch("/api/plans?gymId=1");
    const data = await res.json();
    setPlans(data.plans || []);
  };

  useEffect(() => {
    fetchMembers();
    fetchPlans();
  }, []);

  /* ---------------- SEARCH FILTER ---------------- */

  const filteredMembers = members.filter((member) => {
    const query = search.toLowerCase();

    return (
      member.name?.toLowerCase().includes(query) ||
      member.memberId?.toLowerCase().includes(query) ||
      member.phone?.toLowerCase().includes(query)
    );
  });

  /* ---------------- HELPERS ---------------- */

  function getRemainingDays(endDate) {
    const diff = Math.ceil(
      (new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24),
    );
    return diff > 0 ? diff : 0;
  }

  if (loading) return <p className="text-white/60">Loading members...</p>;

  return (
    <>
      {/* ➕ ADD MEMBER */}
      <div className="mb-6">
        <AddMemberButton onClick={() => setShowForm(true)} />
        {showForm && <AddMemberForm onClose={() => setShowForm(false)} />}
      </div>

      {/* 🔍 SEARCH BAR */}
      <input
        type="text"
        placeholder="Search by name or member ID or Phone..."
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

      {/* 👥 MEMBERS LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredMembers.map((member) => {
          const membership = memberships[member._id];

          return (
            <div
              key={member._id}
              className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-2"
            >
              <div>
                <p className="text-lg font-semibold">{member.name}</p>
                <p className="text-sm text-white/60">{member.phone}</p>
                <p className="text-xs text-white/40">
                  Member ID: {member.memberId || "—"}
                </p>
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
                    className="mt-2 w-full py-2 rounded-xl bg-orange-500 text-white font-semibold"
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
