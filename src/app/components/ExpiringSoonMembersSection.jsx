"use client";

import { useEffect, useState } from "react";

export default function ExpiringSoonMembersSection({ gymId }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchExpiring() {
    setLoading(true);

    const res = await fetch(`/api/memberships/expiring-soon?gymId=${gymId}`, {
      cache: "no-store", // 🔥 THIS IS THE KEY FIX
    });

    const data = await res.json();
    setMembers(data.expiringSoon || []);
    setLoading(false);
  }

  useEffect(() => {
    if (gymId) {
      fetchExpiring();
    }
  }, [gymId]); // 🔥 also important

  if (loading) return <p>Loading expiring members...</p>;

  if (members.length === 0)
    return <p className="text-green-400">No plans expiring soon 🎉</p>;

  return (
    <div className="space-y-4">
      {members.map((m) => {
        const daysLeft = Math.ceil(
          (new Date(m.endDate) - new Date()) / (1000 * 60 * 60 * 24)
        );

        return (
          <div
            key={m._id}
            className="p-4 rounded-xl border border-yellow-500 bg-yellow-500/10"
          >
            <p>
              <b>Name:</b> {m.userId.name}
            </p>
            <p>
              <b>Phone:</b> {m.userId.phone}
            </p>
            <p>
              <b>Plan:</b> {m.planId?.name}
            </p>
            <p>
              <b>Expires On:</b> {new Date(m.endDate).toDateString()}
            </p>

            <p className="text-yellow-400">
              ⏳ Expires in {daysLeft} day{daysLeft > 1 ? "s" : ""}
            </p>

            <button
              onClick={() =>
                window.open(
                  `https://wa.me/91${m.userId.phone}?text=${encodeURIComponent(
                    `Hi ${m.userId.name}, your gym plan will expire in ${daysLeft} day(s). Please renew to continue your fitness journey 💪`
                  )}`,
                  "_blank"
                )
              }
              className="mt-3 px-3 py-1 bg-green-600 text-white rounded"
            >
              💬 Send Reminder
            </button>
          </div>
        );
      })}
    </div>
  );
}
