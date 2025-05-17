import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react"; // Kalau kamu pakai juga
import { SpeedInsights } from "@vercel/speed-insights/next"; // Tambahan ini!

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights /> {/* Tambahkan komponen ini */}
    </>
  );
}
