"use client";

export default function AddManagerButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        fixed bottom-6 right-6
        h-14 w-14
        rounded-full
        bg-purple-600
        text-white
        text-2xl
        flex items-center justify-center
        shadow-lg
        hover:bg-purple-700
        transition
      "
      aria-label="Add Manager"
    >
      +
    </button>
  );
}
