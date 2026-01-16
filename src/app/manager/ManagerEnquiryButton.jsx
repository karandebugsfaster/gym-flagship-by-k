"use client";
import { useState } from "react";
import ManagerEnquirySection from "./ManagerEnquirySection";
import ModalBox from "../components/ModalBox";

export default function ManagerWorkspace() {
  const [showEnquirySection, setShowEnquirySection] = useState(false);

  return (
    <div className="space-y-6">
      {/* Button */}
      <button
        onClick={() => setShowEnquirySection(true)}
        className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
      >
        Enquiry Section
      </button>

      {/* Modal */}
      {showEnquirySection && (
        <ModalBox title="All Enquiry Members" onClose={() => setShowEnquirySection(false)}>
          <ManagerEnquirySection />
        </ModalBox>
      )}
    </div>
  );
}
