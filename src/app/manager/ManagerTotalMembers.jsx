"use client";

import { useState } from "react";
import ManagerClient from "../components/ManagerClient";
import ModalBox from "../components/ModalBox";

export default function ManagerWorkspace() {
  const [showMembers, setShowMembers] = useState(false);

  return (
    <div className="space-y-6">
      
      {/* Button */}
      <button
        onClick={() => setShowMembers(true)}
        className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
      >
        Total Members
      </button>

      {/* Modal */}
      {showMembers && (
        <ModalBox
          title="All Members"
          onClose={() => setShowMembers(false)}
        >
          <ManagerClient />
        </ModalBox>
      )}
    </div>
  );
}
