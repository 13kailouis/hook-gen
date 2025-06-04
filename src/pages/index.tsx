import Head from "next/head";
import Navbar from "@/components/Navbar";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [niche, setNiche] = useState("");
  const [tone, setTone] = useState("fear");
  const [loading, setLoading] = useState(false);
  const [hooks, setHooks] = useState<string[]>([]);
  const generatorRef = useRef<HTMLDivElement>(null);

  const scrollToGenerator = () => {
    generatorRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!niche) return;
    setLoading(true);
    setHooks([]);
    try {
      const r = await fetch("/api/generate-hooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche, tone, product: "" }),
      });
      const data = await r.json();
      setHooks(data.hooks || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );
    const cards = document.querySelectorAll(".hook-card");
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, [hooks]);

  return (
    <>
      <Head>
        <title>HookFreak</title>
        <meta
          name="description"
          content="Bikin video jualan nancep di detik pertama."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />

      <section className="hero-section">
        <div className="hero-inner">
          <div className="hero-visual">
            <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8" alt="Laptop 3D" loading="lazy" />
          </div>
          <div className="hero-copy">
            <h1>
              Bikin opening video <span className="hl">TikTok & Reels</span> yang
              viral dalam 1 klik
            </h1>
            <button className="cta-primary" onClick={scrollToGenerator}>
              Mulai Gratis Sekarang
            </button>
          </div>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="feature">
          <div className="icon">⚡</div>
          <p>Pembuatan hook instan</p>
        </div>
        <div className="feature">
          <div className="icon">🧠</div>
          <p>Varian psikologi viral</p>
        </div>
        <div className="feature">
          <div className="icon">🤖</div>
          <p>Integrasi AI</p>
        </div>
      </section>

      <section id="generator" ref={generatorRef} className="generator-section">
        <form onSubmit={handleGenerate} className="generator-form">
          <input
            type="text"
            placeholder="Contoh: jualan skincare glowing"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
          />
          <select value={tone} onChange={(e) => setTone(e.target.value)}>
            <option value="fear">Fear / Shock</option>
            <option value="curiosity">Curiosity</option>
            <option value="confession">Confession</option>
            <option value="humor">Humor</option>
            <option value="affiliate">Affiliate Produk</option>
          </select>
          <button type="submit" disabled={loading}>
            {loading ? "Menghasilkan..." : "Generate"}
          </button>
        </form>

        {hooks.length > 0 && (
          <div className="results-grid">
            {hooks.map((h, i) => (
              <div key={i} className="hook-card">
                <h3 className="hook-title">Hook {i + 1}</h3>
                <p className="hook-desc">{h}</p>
              </div>
            ))}
          </div>
        )}

        <Link href="/builder" className="cta-secondary">
          Coba Generator Lengkap
        </Link>
      </section>

      <footer className="site-footer">
        <a href="/privacy">Kebijakan Privasi</a>
        <a href="/terms">Syarat</a>
        <a href="mailto:hello@hookfreak.com">Kontak</a>
      </footer>
    </>
  );
}
