"use client";
import { useState } from "react";
import ExpiringSoonMembersSection from "../components/ExpiringSoonMembersSection";
import ModalBox from "../components/ModalBox";

export default function ManagerWorkspace() {
  const [showExpiredMemberSoon, setShowExpiredMemberSoon] = useState(false);

  return (
    <div className="space-y-6">
      {/* Button */}
      <button
        onClick={() => setShowExpiredMemberSoon(true)}
        className="px-5 py-2 rounded-xl bg-yellow-600 hover:bg-yellow-700 transition font-semibold"
      >
        Expiring Soon Members
      </button>

      {/* Modal */}
      {showExpiredMemberSoon && (
        <ModalBox
          title="All Expiring Soon Members"
          onClose={() => setShowExpiredMemberSoon(false)}
        >
          <ExpiringSoonMembersSection gymId="1" />
        </ModalBox>
      )}
    </div>
  );
}
