import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";
import ToastProvider from "./components/ToastProvider";
// import ThemeProvider from "./components/ThemeProvider";

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Regular.woff",
      weight: "400",
    },
    {
      path: "../../public/fonts/Satoshi-Medium.woff",
      weight: "500",
    },
    {
      path: "../../public/fonts/Satoshi-Bold.woff",
      weight: "700",
    },
    {
      path: "../../public/fonts/Satoshi-Black.woff",
      weight: "900",
    },
  ],
  variable: "--font-satoshi",
});

export const metadata = {
  title: "Gym Flagship by K",
  description: "Created by K using Next.js",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} antialiased`}
      >
        {/* <ThemeProvider> */}
          <Providers>
            <ToastProvider>{children}</ToastProvider>
          </Providers>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
