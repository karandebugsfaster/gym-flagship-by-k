"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";

export default function ThemeProvider({ children }) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="dark" // 👈 DARK BY DEFAULT
      enableSystem={false} // 👈 important for SaaS consistency
    >
      {children}
    </NextThemeProvider>
  );
}
