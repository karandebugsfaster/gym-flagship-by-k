// "use client";
// import { useState } from "react";

// export default function AddManagerForm({ onClose }) {

//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     const res = await fetch("/api/managers/create", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       setError(data.error || "Something went wrong");
//     } else {
//       alert("Manager created successfully");
//       setForm({ name: "", phone: "", password: "" });
//     }

//     setLoading(false);
//   }

//   return (
//     <>
//       <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
//         <input
//           placeholder="Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           className="w-full p-2 rounded bg-black/20"
//         />
//         <input
//           placeholder="Phone"
//           value={form.phone}
//           onChange={(e) => setForm({ ...form, phone: e.target.value })}
//           className="w-full p-2 rounded bg-black/20"
//         />
//         <input
//           placeholder="Password"
//           type="password"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//           className="w-full p-2 rounded bg-black/20"
//         />

//         {error && <p className="text-red-500">{error}</p>}

//         <button
//           disabled={loading}
//           className="bg-purple-600 px-4 py-2 rounded text-white"
//         >
//           {loading ? "Creating..." : "Create Manager"}
//         </button>
//       </form>
//       <button
//         type="button"
//         onClick={onClose}
//         className="text-sm text-gray-400 hover:text-white"
//       >
//         Cancel
//       </button>

//     </>
//   );
// }
"use client";
import { useState } from "react";
import { useToast } from "./ToastProvider";

export default function AddManagerForm({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/managers/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
    } else {
      showToast("Manager created successfully");
      setForm({ name: "", phone: "", password: "" });
      onClose?.();
    }

    setLoading(false);
  }

  return (
    <div
      className="
        w-full max-w-md
        rounded-3xl
        bg-white/5 backdrop-blur-xl
        border border-white/10
        shadow-[0_0_40px_rgba(0,0,0,0.5)]
        p-6
        space-y-5
      "
    >
      {/* HEADER */}
      <div>
        <h2 className="text-xl font-bold tracking-tight">➕ Add Manager</h2>
        <p className="text-sm text-white/60">
          Create a new gym manager account
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl p-2">
          {error}
        </p>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="
            w-full
            p-3
            rounded-xl
            bg-black/40
            border border-white/10
            text-white
            placeholder:text-white/40
          "
        />

        <input
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="
            w-full
            p-3
            rounded-xl
            bg-black/40
            border border-white/10
            text-white
            placeholder:text-white/40
          "
        />

        <input
          placeholder="Temporary Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="
            w-full
            p-3
            rounded-xl
            bg-black/40
            border border-white/10
            text-white
            placeholder:text-white/40
          "
        />

        {/* ACTIONS */}
        <div className="flex flex-col gap-3 pt-2">
          <button
            disabled={loading}
            className="
              w-full
              py-3
              rounded-xl
              bg-purple-600
              text-white
              font-bold
              hover:bg-purple-500
              transition
              disabled:opacity-50
            "
          >
            {loading ? "Creating Manager…" : "Create Manager"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="text-sm text-white/50 hover:text-white transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
