import Head from "next/head";
import Link from "next/link";

export default function Landing() {
  return (
    <>
      <Head>
        <title>HookFreak • Viral Hook Generator</title>
        <meta
          name="description"
          content="Bikin hook TikTok viral kurang dari 12 kata. Gratis dan cepat."
        />
        <meta
          name="keywords"
          content="hook generator, TikTok hook, konten viral, kalimat pembuka"
        />
        <meta name="author" content="Stidscom Team" />

        {/* OG tags */}
        <meta property="og:title" content="HookFreak - AI Viral Hook Generator" />
        <meta
          property="og:description"
          content="Auto generate hook TikTok yang bikin orang nggak bisa skip. Cuma 1 klik. Gratis selamanya!"
        />
        <meta property="og:image" content="/og-cover.png" />
        <meta property="og:url" content="https://hook-gen.vercel.app" />
        <meta property="og:type" content="website" />

        {/* Twitter card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HookFreak - AI Viral Hook Generator" />
        <meta
          name="twitter:description"
          content="Bikin hook TikTok &amp; Reels viral dalam 1 klik. Gratis &amp; powerful."
        />
        <meta name="twitter:image" content="/og-cover.png" />

        {/* SEO technical */}
        <link rel="canonical" href="https://hook-gen.vercel.app" />
        <link rel="icon" href="/favicon.ico" />

        {/* Preload font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="landing-wrapper">
        <section className="landing-hero">
          <h1 className="logo-text">
            Hook<span>Freak</span>
          </h1>
          <p className="subtitle">Viral Hook Generator untuk TikTok &amp; Reels</p>
          <Link href="/generator" className="cta-button">
            Coba Sekarang →
          </Link>
        </section>
        <section className="features">
          <div className="feature">
            <h3>⚡ Cepat &amp; Gratis</h3>
            <p>Generate 10 hook kurang dari 12 kata cuma dengan 1 klik.</p>
          </div>
          <div className="feature">
            <h3>🤖 Powered by AI</h3>
            <p>Ditenagai model LLAMA-3-70B via Groq untuk hasil tajam.</p>
          </div>
          <div className="feature">
            <h3>🎯 CTR Tinggi</h3>
            <p>Hook didesain khusus untuk bikin penonton berhenti scroll.</p>
          </div>
        </section>
        <footer className="footer">
          Made with ❤️ by{' '}
          <a
            href="https://instagram.com/stidscom"
            target="_blank"
            rel="noopener noreferrer"
          >
            @Stidscom
          </a>{' '}
          • Powered by Stids AI
        </footer>
      </main>
    </>
  );
}
