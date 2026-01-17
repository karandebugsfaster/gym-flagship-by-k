"use client";
import { useState } from "react";
import AddEnquiryModal from "./AddEnquiryModal";

export default function AddEnquiryButton({ gymId, onAdded }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-xl bg-green-600 text-white font-semibold mb-4"
      >
        ➕ Add Enquiry
      </button>

      {open && (
        <AddEnquiryModal
          gymId={gymId}
          onClose={() => setOpen(false)}
          onSuccess={() => {
            setOpen(false);
            onAdded(); // 🔥 refresh enquiry list
          }}
        />
      )}
    </>
  );
}
