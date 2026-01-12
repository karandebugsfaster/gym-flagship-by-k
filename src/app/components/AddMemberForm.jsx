"use client";

import { useState } from "react";

export default function AddMemberForm({ onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("male");
  const [batch, setBatch] = useState("morning");

  const handleSave = async () => {
    const res = await fetch("/api/members/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        gender,
        batch,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      onSuccess(data.user._id); // 👈 important
    }
  };

  return (
    <div className="mt-6 p-4 rounded-xl bg-white/10">
      <h2 className="text-xl font-bold mb-4">Add Member</h2>

      {/* Name */}
      <input
        placeholder="Member Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="block w-full mb-3 p-2 rounded text-black"
      />

      {/* Phone */}
      <input
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="block w-full mb-3 p-2 rounded text-black"
      />

      {/* Gender */}
      <div className="mb-3">
        <p className="mb-1">Gender</p>
        <div className="flex gap-3">
          {["male", "female"].map((g) => (
            <button
              key={g}
              onClick={() => setGender(g)}
              className={`px-4 py-2 rounded ${
                gender === g ? "bg-orange-500 text-black" : "bg-white/20"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Batch */}
      <div className="mb-4">
        <p className="mb-1">Batch</p>
        <div className="flex gap-3 flex-wrap">
          {["morning", "noon", "evening", "night"].map((b) => (
            <button
              key={b}
              onClick={() => setBatch(b)}
              className={`px-4 py-2 rounded ${
                batch === b ? "bg-orange-500 text-black" : "bg-white/20"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-500 text-black rounded"
        >
          Proceed
        </button>

        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-400 text-black rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
