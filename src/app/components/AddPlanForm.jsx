"use client";

import { useState } from "react";

export default function AddPlanForm({ onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [durationType, setDurationType] = useState("months");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setError("");

    if (!name || !duration || !price) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/plans/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          duration: Number(duration),
          durationType,
          price: Number(price),
          gymId: "1", // manual by design
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create plan");
        return;
      }

      // ✅ SUCCESS
      onSuccess?.(); // refresh plans list
      onClose(); // close modal
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" mb-3 bg-black/40 flex justify-center items-end z-50">
      <div className="w-full rounded-t-3xl bg-black p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Plan</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {error && (
          <p className="mb-3 text-sm text-red-500 text-center">{error}</p>
        )}

        {/* Plan Name */}
        <input
          placeholder="Plan Name (Eg. 6 Months)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full mb-3 p-3 rounded border"
        />

        {/* Duration Type */}
        <div className="flex gap-3 mb-3">
          {["months", "days"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setDurationType(type)}
              className={`flex-1 py-2 rounded ${
                durationType === type ? "bg-black text-white" : "border"
              }`}
            >
              {type === "months" ? "Months" : "Days"}
            </button>
          ))}
        </div>

        {/* Duration */}
        <input
          placeholder={`Duration (${
            durationType === "months" ? "Eg. 6" : "Eg. 30"
          })`}
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="block w-full mb-3 p-3 rounded border"
        />

        {/* Price */}
        <input
          placeholder="Plan Amount (Eg. 5000)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="block w-full mb-4 p-3 rounded border"
        />

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-zinc-800 text-white py-3 rounded-xl disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add Plan"}
        </button>
      </div>
    </div>
  );
}
