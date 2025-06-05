import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react"; // Kalau kamu pakai juga
import { SpeedInsights } from "@vercel/speed-insights/next"; // Tambahan ini!
import { AuthProvider } from "@/components/AuthProvider";

export default function App({ Component, pageProps }: AppProps) {
  const highlight = process.env.NEXT_PUBLIC_HIGHLIGHT_COLOR || '#39ff14';
  const gradient = process.env.NEXT_PUBLIC_GRADIENT || 'linear-gradient(90deg,#39ff14,#00ffe6)';
  return (
    <>
      <style jsx global>{`
        :root {
          --highlight-color: ${highlight};
          --highlight-gradient: ${gradient};
        }
      `}</style>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <Analytics />
      <SpeedInsights /> {/* Tambahkan komponen ini */}
    </>
  );
}
