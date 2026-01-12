"use client";

export default function AddMemberButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="mt-6 mb-10 px-6 py-3 rounded-xl bg-orange-500 text-black font-bold"
    >
      + Add Member
    </button>
  );
}
