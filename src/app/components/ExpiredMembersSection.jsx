"use client";

import { useEffect, useState } from "react";
import AssignPlanModal from "./AssignPlanModal";
import { openWhatsApp } from "@/lib/whatsapp";

export default function ExpiredMembersSection({ gymId, plans }) {
  const [expired, setExpired] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);

  async function fetchExpired() {
    const res = await fetch(`/api/memberships/expired?gymId=${gymId}`);
    const data = await res.json();
    setExpired(data.expiredMemberships || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchExpired();
  }, []);

  if (loading) return <p>Loading expired members...</p>;

  if (expired.length === 0)
    return <p className="text-green-400">No expired members 🎉</p>;

  return (
    <div className="space-y-4">
      {expired.map((m) => {
        const daysExpired = Math.floor(
          (new Date() - new Date(m.endDate)) / (1000 * 60 * 60 * 24)
        );

        return (
          <div
            key={m._id}
            className="p-4 rounded-xl border border-red-500 bg-red-500/10"
          >
            <p>
              <b>Name:</b> {m.userId.name}
            </p>
            <p>
              <b>Phone:</b> {m.userId.phone}
            </p>
            <p>
              <b>Last Plan:</b> {m.planId?.name}
            </p>
            <p>
              <b>Expired On:</b> {new Date(m.endDate).toDateString()}
            </p>
            <p className="text-red-400">Expired {daysExpired} days ago</p>

            <button
              onClick={() => setSelectedMember(m.userId)}
              className="mt-3 px-3 py-1 bg-orange-500 text-white rounded"
            >
              Renew Plan
            </button>
            <button
              onClick={() =>
                window.open(
                  `https://wa.me/91${m.userId.phone}?text=${encodeURIComponent(
                    `Hi ${m.userId.name}, your gym plan expired on ${new Date(
                      m.endDate
                    ).toDateString()}. Please renew to continue training 💪`
                  )}`,
                  "_blank"
                )
              }
              className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
            >
              💬 Send Expiry Message
            </button>
          </div>
        );
      })}

      {selectedMember && (
        <AssignPlanModal
          member={selectedMember}
          plans={plans}
          onClose={() => setSelectedMember(null)}
          onSuccess={() => {
            setSelectedMember(null);
            fetchExpired(); // 🔥 auto refresh
          }}
        />
      )}
    </div>
  );
}
