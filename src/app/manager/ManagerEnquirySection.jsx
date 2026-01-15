"use client";

import { useEffect, useState } from "react";
import { openWhatsApp } from "@/lib/whatsapp";

const STATUS_OPTIONS = [
  "new",
  "no_answer",
  "not_interested",
  "interested",
  "will_visit",
  "converted",
];

export default function ManagerEnquirySection() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  async function fetchEnquiries() {
    const res = await fetch("/api/enquiries?gymId=1");
    const data = await res.json();
    setEnquiries(data.enquiries || []);
    setLoading(false);
  }

  async function updateStatus(enquiryId, status) {
    await fetch("/api/enquiries/status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enquiryId, status }),
    });

    fetchEnquiries(); // refresh list
  }

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayTouchedCount = enquiries.filter(
    (e) => new Date(e.updatedAt) >= today
  ).length;

  if (loading) return <p>Loading enquiries...</p>;

  return (
    <>
      <div className="mb-5 p-4 rounded-xl bg-green-500/10 border border-green-500">
        <p className="text-lg font-semibold text-green-400">
          📞 Enquiries handled today: {todayTouchedCount}
        </p>
      </div>

      <div className="flex gap-3 mb-4">
        {[
          "all",
          "new",
          "no_answer",
          "interested",
          "will_visit",
          "not_interested",
          "converted",
        ].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1 rounded ${
              filter === s ? "bg-orange-500 text-black" : "bg-white/10"
            }`}
          >
            {s.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {enquiries
          .filter((e) => filter === "all" || e.status === filter)
          .map((e) => (
            <div
              key={e._id}
              className="flex justify-between items-center p-4 rounded-xl border border-white/20 bg-black"
            >
              {/* LEFT */}
              <div>
                <p className="font-semibold">{e.name}</p>
                <p className="text-sm text-gray-400">{e.phone}</p>
                {e.note && (
                  <p className="text-sm text-white/60 mt-1">{e.note}</p>
                )}
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-3">
                <select
                  value={e.status}
                  onChange={(ev) => updateStatus(e._id, ev.target.value)}
                  className="bg-black border border-white/20 rounded px-2 py-1"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s.replace("_", " ")}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(e.phone);
                    alert("Phone copied!");
                  }}
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  📋
                </button>
                <button
                  onClick={() =>
                    openWhatsApp(
                      e.phone,
                      `Hi ${e.name}, this is from our gym. You enquired recently. Let me know if you are interested 💪`
                    )
                  }
                  className="px-2 py-1 bg-green-600 text-white rounded"
                >
                  💬 WhatsApp
                </button>

                {/* ✅ CONVERT BUTTON (NOW CORRECT) */}
                {e.status !== "converted" && (
                  <button
                    onClick={async () => {
                      const res = await fetch("/api/enquiries/convert", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          enquiryId: e._id,
                          gymId: "1",
                        }),
                      });

                      if (res.ok) {
                        fetchEnquiries();
                      }
                    }}
                    className="px-2 py-1 bg-green-500 text-black rounded"
                  >
                    Convert
                  </button>
                )}

                <button
                  onClick={async () => {
                    if (!confirm("Delete this enquiry?")) return;

                    await fetch(`/api/enquiries/delete?id=${e._id}`, {
                      method: "DELETE",
                    });

                    fetchEnquiries();
                  }}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
