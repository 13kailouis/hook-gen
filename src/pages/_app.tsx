import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react"; // Kalau kamu pakai juga
import { SpeedInsights } from "@vercel/speed-insights/next"; // Tambahan ini!

export default function App({ Component, pageProps }: AppProps) {
  const highlight = process.env.NEXT_PUBLIC_HIGHLIGHT_COLOR || '#39ff14';
  return (
    <>
      <style jsx global>{`
        :root { --highlight-color: ${highlight}; }
      `}</style>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights /> {/* Tambahkan komponen ini */}
    </>
  );
}
