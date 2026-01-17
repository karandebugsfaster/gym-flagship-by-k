"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`
        relative inline-flex h-8 w-14 items-center rounded-full
        transition-colors duration-300
        ${isDark ? "bg-orange-500" : "bg-gray-300"}
      `}
    >
      {/* Switch Knob */}
      <span
        className={`
          inline-block h-6 w-6 transform rounded-full bg-white
          transition-transform duration-300
          ${isDark ? "translate-x-7" : "translate-x-1"}
        `}
      />

      {/* Icons */}
      <span className="absolute left-1 text-xs">🌙</span>
      <span className="absolute right-1 text-xs">☀️</span>
    </button>
  );
}
