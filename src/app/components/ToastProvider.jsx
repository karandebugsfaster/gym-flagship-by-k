"use client";

import { createContext, useContext, useState } from "react";

const ToastContext = createContext(null);

export function useToast() {
  return useContext(ToastContext);
}

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function showToast(message, type = "success") {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* TOAST STACK */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 space-y-2 w-[90%] max-w-sm">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`
              px-4 py-3 rounded-2xl text-sm font-semibold
              backdrop-blur-xl border
              shadow-[0_10px_30px_rgba(0,0,0,0.6)]
              ${
                t.type === "success"
                  ? "bg-green-500/20 border-green-500/30 text-green-300"
                  : t.type === "error"
                  ? "bg-red-500/20 border-red-500/30 text-red-300"
                  : "bg-white/10 border-white/20 text-white"
              }
            `}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
