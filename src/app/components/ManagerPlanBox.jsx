"use client";

import { useState } from "react";
import ManagerPlanSection from "./ManagerPlanSection";
import ModalBox from "../components/ModalBox";

export default function ManagerWorkspace() {
  const [showPlans, setShowPlans] = useState(false);

  return (
    <div className="space-y-6">
      {/* Button */}
      <button
        onClick={() => setShowPlans(true)}
        className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
      >
        Membership Plans
      </button>

      {/* Modal */}
      {showPlans && (
        <ModalBox title="All Members" onClose={() => setShowPlans(false)}>
          <ManagerPlanSection />
        </ModalBox>
      )}
    </div>
  );
}
