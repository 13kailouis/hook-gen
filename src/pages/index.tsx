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
      </main>
    </>
  );
}
