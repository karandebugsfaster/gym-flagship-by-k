"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import AddManagerButton from "./AddManagerButton";
import AddManagerForm from "./AddManagerForm";

export default function AdminManagerClient() {
  const { data: session, status } = useSession();
  const [showForm, setShowForm] = useState(false);

  // 1️⃣ Wait for session to load
  if (status === "loading") {
    return null;
  }

  // 2️⃣ HARD GUARD — only admin can see this component
  if (!session || session.user.role !== "admin") {
    return null;
  }

  return (
    <>
      <AddManagerButton onClick={() => setShowForm(true)} />

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#111] p-6 rounded-xl w-full max-w-md">
            <AddManagerForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </>
  );
}
