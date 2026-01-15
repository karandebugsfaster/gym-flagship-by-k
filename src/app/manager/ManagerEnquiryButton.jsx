"use client";
import { useState } from "react";
import ManagerExpiredSection from "../components/ManagerExpiredSection";
import ModalBox from "../components/ModalBox";

export default function ManagerWorkspace() {
  const [showExpiredMember, setShowExpiredMember] = useState(false);

  return (
    <div className="space-y-6">
      {/* Button */}
      <button
        onClick={() => setShowExpiredMember(true)}
        className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold"
      >
        Expired Members
      </button>

      {/* Modal */}
      {showExpiredMember && (
        <ModalBox title="All Expired Members" onClose={() => setShowExpiredMember(false)}>
          <ManagerExpiredSection />
        </ModalBox>
      )}
    </div>
  );
}
