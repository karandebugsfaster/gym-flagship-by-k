"use client";
import { useState } from "react";

export default function AddManagerForm({ onClose }) {
  

  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      alert("Manager created successfully");
      setForm({ name: "", phone: "", password: "" });
    }

    setLoading(false);
  }
  
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 rounded bg-black/20"
        />
        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full p-2 rounded bg-black/20"
        />
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-2 rounded bg-black/20"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          disabled={loading}
          className="bg-purple-600 px-4 py-2 rounded text-white"
        >
          {loading ? "Creating..." : "Create Manager"}
        </button>
      </form>
      <button
        type="button"
        onClick={onClose}
        className="text-sm text-gray-400 hover:text-white"
      >
        Cancel
      </button>
      
    </>
  );
}
