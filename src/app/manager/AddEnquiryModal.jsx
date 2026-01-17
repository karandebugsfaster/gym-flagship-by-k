// "use client";
// import AddEnquiryForm from "./AddEnquiryForm";

// export default function AddEnquiryModal({ gymId, onClose, onSuccess }) {
//   return (
//     <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
//       <div className="w-full max-w-md rounded-2xl bg-zinc-900 border border-white/10 p-6">
//         <h2 className="text-xl font-bold mb-4">New Enquiry 📞</h2>

//         <AddEnquiryForm
//           gymId={gymId}
//           onSuccess={onSuccess}
//           onCancel={onClose}
//         />
//       </div>
//     </div>
//   );
// }
"use client";
import AddEnquiryForm from "./AddEnquiryForm";

export default function AddEnquiryModal({ gymId, onClose, onSuccess }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center">
      {/* SHEET / CARD */}
      <div
        className="
          w-full sm:max-w-md
          rounded-t-3xl sm:rounded-3xl
          bg-zinc-900
          border border-white/10
          p-6
          safe-bottom
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">📞 New Enquiry</h2>

          <button onClick={onClose} className="text-white/50 text-xl">
            ✕
          </button>
        </div>

        {/* FORM */}
        <AddEnquiryForm
          gymId={gymId}
          onSuccess={onSuccess}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}
