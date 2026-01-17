"use client";

import { X } from "lucide-react";

export default function ModalBox({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center mt-[230px]">
      <div className="relative w-full max-w-3xl bg-zinc-900 rounded-2xl p-6 border border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
