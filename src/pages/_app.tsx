import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react"; // Kalau kamu pakai juga
import { SpeedInsights } from "@vercel/speed-insights/next"; // Tambahan ini!
import { AuthProvider } from "@/components/AuthProvider";

export default function App({ Component, pageProps }: AppProps) {
  const tokens = {
    highlight: process.env.NEXT_PUBLIC_HIGHLIGHT_COLOR || '#FFD700',
    gradient: process.env.NEXT_PUBLIC_GRADIENT || 'linear-gradient(90deg,#FFD700,#FFA500)',
    bg: process.env.NEXT_PUBLIC_BG || '#000',
    card: process.env.NEXT_PUBLIC_CARD || '#131313',
    text: process.env.NEXT_PUBLIC_TEXT || '#f0f0f0',
    muted: process.env.NEXT_PUBLIC_MUTED || '#b0b0b0',
    radius: Number(process.env.NEXT_PUBLIC_RADIUS) || 12,
    shadow: process.env.NEXT_PUBLIC_SHADOW || '0 4px 15px rgba(255,215,0,0.35)',
  };

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
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
