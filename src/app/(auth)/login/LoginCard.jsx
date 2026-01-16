"use client";

import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginCard() {
  const router = useRouter();

  // staff = admin / manager
  // member = gym member
  const [mode, setMode] = useState("staff");

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [gymId, setGymId] = useState("");
  const [memberId, setMemberId] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---------------- LOGIN HANDLER ---------------- */
  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError("");
    setLoading(true);

    const payload =
      mode === "staff"
        ? {
            phone,
            password,
            redirect: false,
          }
        : {
            phone,
            gymId,
            memberId,
            redirect: false,
          };

    const res = await signIn("credentials", payload);

    setLoading(false);

    if (res?.error) {
      setError(res.error);
      return;
    }

    // ✅ Successful login
    router.push(mode === "staff" ? "/dashboard" : "/member");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-xl"
    >
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-white text-center">
        Gym Login 🔐
      </h1>
      <p className="text-white/60 text-center mt-2">Authorized access only</p>

      {/* MODE SWITCH */}
      <div className="flex justify-center gap-3 mt-6">
        <ModeButton
          active={mode === "staff"}
          onClick={() => setMode("staff")}
          label="Admin / Manager"
        />
        <ModeButton
          active={mode === "member"}
          onClick={() => setMode("member")}
          label="Member"
        />
      </div>

      {/* FORM */}
      <form onSubmit={handleLogin} className="mt-6 space-y-4">
        <Input label="Phone Number" value={phone} onChange={setPhone} />

        {mode === "staff" && (
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
          />
        )}

        {mode === "member" && (
          <>
            <Input label="Gym ID" value={gymId} onChange={setGymId} />
            <Input label="Member ID" value={memberId} onChange={setMemberId} />
          </>
        )}

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-2xl font-bold text-white transition ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-orange-500 to-red-500"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </motion.div>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */

function ModeButton({ active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-semibold ${
        active ? "bg-orange-500 text-white" : "bg-white/10 text-white/60"
      }`}
    >
      {label}
    </button>
  );
}

function Input({ label, type = "text", value, onChange }) {
  return (
    <div>
      <label className="block text-sm text-white/60 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full rounded-xl px-4 py-3 bg-black/40 border border-white/20 text-white outline-none focus:border-orange-400"
      />
    </div>
  );
}
