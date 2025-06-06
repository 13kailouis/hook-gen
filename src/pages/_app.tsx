import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react"; // Kalau kamu pakai juga
import { SpeedInsights } from "@vercel/speed-insights/next"; // Tambahan ini!
import { AuthProvider } from "@/components/AuthProvider";

export default function App({ Component, pageProps }: AppProps) {
  const tokens = {
    highlight: process.env.NEXT_PUBLIC_PRIMARY || '#0d6efd',
    gradient: process.env.NEXT_PUBLIC_GRADIENT || 'linear-gradient(90deg,#0d6efd,#6610f2)',
    bg: process.env.NEXT_PUBLIC_BG || '#0b0f19',
    card: process.env.NEXT_PUBLIC_CARD || '#151a23',
    text: process.env.NEXT_PUBLIC_TEXT || '#f8f9fa',
    muted: process.env.NEXT_PUBLIC_MUTED || '#9ca3af',
    radius: Number(process.env.NEXT_PUBLIC_RADIUS) || 12,
    shadow: process.env.NEXT_PUBLIC_SHADOW || '0 4px 15px rgba(0,0,0,0.4)',
  };

  return (
    <>
      <style jsx global>{`
        :root {
          --highlight-color: ${tokens.highlight};
          --highlight-gradient: ${tokens.gradient};
          --bg-color: ${tokens.bg};
          --card-color: ${tokens.card};
          --text-color: ${tokens.text};
          --muted-color: ${tokens.muted};
          --radius: ${tokens.radius}px;
          --shadow: ${tokens.shadow};
        }
      `}</style>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
