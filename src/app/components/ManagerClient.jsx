"use client";

import { useState } from "react";
import AddMemberButton from "./AddMemberButton";
import AddMemberForm from "./AddMemberForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ManagerClient() {
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const res = await fetch("/api/members");
        const data = await res.json();
        setMembers(data.members || []);
      } catch (err) {
        console.error("Failed to fetch members", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
  }, []);

  if (loading) return <p>Loading members...</p>;

  {
    members.length === 0 && <p className="text-white/60">No members yet.</p>;
  }

  return (
    <>
      <div>
        <AddMemberButton onClick={() => setShowForm(true)} />
        {showForm && <AddMemberForm onClose={() => setShowForm(false)} />}
      </div>
      <div className="space-y-4">
        {members.map((member) => (
          <div
            key={member._id}
            className="border border-white/20 rounded-xl p-4"
          >
            <p>
              <b>Name:</b> {member.name}
            </p>
            <p>
              <b>Phone:</b> {member.phone}
            </p>
            <p>
              <b>Gender:</b> {member.gender || "—"}
            </p>
            <p>
              <b>Batch:</b> {member.batch || "—"}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
