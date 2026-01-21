"use client";

import { openWhatsApp } from "@/lib/whatsapp";

export default function MemberDetailSheet({ member, onClose }) {
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end">
      <div className="w-full rounded-t-3xl bg-zinc-950 p-6 space-y-5">
        {/* DRAG BAR */}
        <div className="w-12 h-1 bg-white/30 rounded mx-auto mb-2" />

        {/* PROFILE */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-20 h-20 rounded-full bg-zinc-700 flex items-center justify-center text-3xl">
            👤
          </div>
          <h2 className="text-xl font-bold">{member.name}</h2>
          <p className="text-white/60">🎟️ {member.memberId}</p>

          {/* ACTION ICONS */}
          <div className="flex gap-4 mt-2">
            <a href={`tel:${member.phone}`} className="icon-btn">
              📞
            </a>
            <button
              onClick={() =>
                openWhatsApp(
                  member.phone,
                  `Hi ${member.name}, this is from our gym 💪`,
                )
              }
              className="icon-btn"
            >
              💬
            </button>
            <button className="icon-btn">✉️</button>
          </div>
        </div>

        <hr className="border-white/10" />

        {/* MEMBERSHIP */}
        <div>
          <p className="text-sm text-white/60 mb-1">Membership Details</p>
          <p className="font-semibold">
            {member.planId || "No Plan"} –{" "}
            {member.daysLeft > 0 ? `${member.daysLeft} days left` : "Expired"}
          </p>

          {member.startDate && (
            <div className="flex gap-2 mt-2">
              <span className="chip">
                {new Date(member.startDate).toDateString()}
              </span>
              <span className="chip">
                {new Date(member.endDate).toDateString()}
              </span>
            </div>
          )}
        </div>

        {/* ACTION LIST */}
        <div className="space-y-3 pt-2">
          <button className="sheet-btn">📩 Send Expiry Reminder</button>
          <button className="sheet-btn">✏️ Edit / Delete Profile</button>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-white/10 text-white font-semibold mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
}
