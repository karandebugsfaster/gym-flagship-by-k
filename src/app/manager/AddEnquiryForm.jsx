// "use client";
// import { useState } from "react";

// export default function AddEnquiryForm({ gymId, onSuccess, onCancel }) {
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     note: "",
//   });

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (loading) return;

//     setLoading(true);

//     const res = await fetch("/api/enquiry/create", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         gymId,
//         ...form,
//       }),
//     });

//     setLoading(false);

//     if (!res.ok) {
//       alert("Failed to add enquiry");
//       return;
//     }

//     onSuccess();
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <input
//         name="name"
//         placeholder="Name"
//         required
//         onChange={handleChange}
//         className="w-full px-3 py-2 rounded bg-black border border-white/20"
//       />

//       <input
//         name="phone"
//         placeholder="Phone"
//         required
//         onChange={handleChange}
//         className="w-full px-3 py-2 rounded bg-black border border-white/20"
//       />

//       <input
//         name="address"
//         placeholder="Address (optional)"
//         onChange={handleChange}
//         className="w-full px-3 py-2 rounded bg-black border border-white/20"
//       />

//       <textarea
//         name="note"
//         placeholder="Note (e.g. asked about 3-month plan)"
//         onChange={handleChange}
//         className="w-full px-3 py-2 rounded bg-black border border-white/20"
//       />

//       <div className="flex gap-3 pt-2">
//         <button
//           type="submit"
//           disabled={loading}
//           className="flex-1 py-2 rounded bg-green-500 text-black font-semibold"
//         >
//           {loading ? "Saving..." : "Add Enquiry"}
//         </button>

//         <button
//           type="button"
//           onClick={onCancel}
//           className="flex-1 py-2 rounded bg-white/10"
//         >
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// }
"use client";
import { useState } from "react";

export default function AddEnquiryForm({ gymId, onSuccess, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const res = await fetch("/api/enquiries/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gymId, ...form }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Failed to add enquiry");
      return;
    }

    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* NAME */}
      <input
        name="name"
        placeholder="Full name"
        required
        onChange={handleChange}
        className="
          w-full
          px-4 py-3
          rounded-xl
          bg-black/40
          border border-white/10
          text-white
          placeholder:text-white/40
        "
      />

      {/* PHONE */}
      <input
        name="phone"
        placeholder="Phone number"
        required
        inputMode="numeric"
        onChange={handleChange}
        className="
          w-full
          px-4 py-3
          rounded-xl
          bg-black/40
          border border-white/10
          text-white
          placeholder:text-white/40
        "
      />

      {/* ADDRESS */}
      <input
        name="address"
        placeholder="Address (optional)"
        onChange={handleChange}
        className="
          w-full
          px-4 py-3
          rounded-xl
          bg-black/40
          border border-white/10
          text-white
          placeholder:text-white/40
        "
      />

      {/* NOTE */}
      <textarea
        name="note"
        placeholder="Note (e.g. asked about 3-month plan)"
        rows={3}
        onChange={handleChange}
        className="
          w-full
          px-4 py-3
          rounded-xl
          bg-black/40
          border border-white/10
          text-white
          placeholder:text-white/40
          resize-none
        "
      />

      {/* ACTIONS */}
      <div className="flex gap-3 p-2 mb-5">
        <button
          type="submit"
          disabled={loading}
          className="
            flex-1
            py-3
            rounded-xl
            bg-green-500
            text-white
            font-bold
            disabled:opacity-50
          "
        >
          {loading ? "Saving…" : "Add Enquiry"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="
            flex-1
            py-3
            rounded-xl
            bg-white/10
            text-white/70
          "
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
