import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Landing() {
  const [product, setProduct] = useState("");
  const [style, setStyle] = useState("storytelling");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("hf-temp");
    if (saved && !result) {
      try {
        setResult(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const examples = [
    {
      visual: "Tetesin serum ke punggung tangan sambil close-up",
      text: "Kulit kusam? Nih trik biar cerah tanpa ribet!",
      script: "Hook -- Problem -- Solution -- CTA",
    },
    {
      visual: "Tangan pasang holder HP di motor, shot cepat",
      text: "Jalan sambil jualan? Gini cara gampangnya!",
      script: "Hook -- Problem -- Solution -- CTA",
    },
    {
      visual: "Close up snack rendah kalori digigit",
      text: "Cerita gagal diet gara-gara ngemil? Dengerin ini",
      script: "Hook -- Problem -- Solution -- CTA",
    },
  ];

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!product) return;
    setLoading(true);
    setResult(null);
    try {
      const r = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: product, style, audience: "" }),
      });
      const data = await r.json();
      if (data.hooks && data.hooks.length) {
        setResult(data.hooks[0]);
        localStorage.setItem("hf-temp", JSON.stringify(data.hooks[0]));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Buat Skrip Konten Jualan TikTok & Reels dalam 30 Detik – HookFreak</title>
        <meta
          name="description"
          content="HookFreak bantu kamu bikin pembuka video yang nancep & bikin orang beli. Visual + teks + skrip lengkap."
        />
        <meta property="og:image" content="/og-cover.png" />
      </Head>
      <Navbar />
      <main className="landing-wrapper">
        <section className="landing-hero">
          <div className="hero-grid">
            <div className="hero-visual">
              <img src="/og-cover.png" alt="preview" style={{ width: "100%", borderRadius: 12 }} />
            </div>
            <div className="hero-content">
              <h1 className="logo-text">Hook<span>Freak</span></h1>
              <p className="subtitle">Bikin opening video yang langsung jualan</p>
              <form onSubmit={handleGenerate} className="hero-form">
                <input
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder="Produk kamu apa?"
                  className="niche-input"
                />
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="tone-select"
                >
                  <option value="storytelling">Storytelling</option>
                  <option value="edukatif">Edukatif</option>
                  <option value="hard-sell">Hard Sell</option>
                  <option value="soft-sell">Soft Sell</option>
                  <option value="lucu">Lucu</option>
                  <option value="fomo">FOMO</option>
                </select>
                <button type="submit" className="cta-button" disabled={loading}>
                  {loading ? "Sebentar..." : "Bikin Konten Saya"}
                </button>
              </form>
              <div className="result-section">
                {loading && (
                  <div className="result-grid">
                    <div className="result-text skeleton" style={{ height: 120 }} />
                    <div className="result-visual skeleton" style={{ height: 120 }} />
                  </div>
                )}
                {result && !loading && (
                  <div className="result-grid">
                    <div className="result-text">
                      <p><strong>Adegan Pembuka:</strong> {result.visualHook}</p>
                      <button className="regen" onClick={handleGenerate} disabled={loading}>Generate ulang</button>
                      <p><strong>Kalimat Subtitle:</strong> {result.textHook}</p>
                      <button className="regen" onClick={handleGenerate} disabled={loading}>Generate ulang</button>
                      <p><strong>Isi Video:</strong> {result.script}</p>
                      <button className="regen" onClick={handleGenerate} disabled={loading}>Generate ulang</button>
                      <p><strong>Ajakan Tindakan:</strong> {result.frames}</p>
                      <button className="regen" onClick={handleGenerate} disabled={loading}>Generate ulang</button>
                    </div>
                    <div className="result-visual">
                      <div className="visual-mock">{result.visualHook}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="examples">
          {examples.map((ex, idx) => (
            <div key={idx} className="example-item">
              <div className="example-visual">{ex.visual}</div>
              <div className="example-text">
                <p className="hook-text">{ex.text}</p>
                <p className="script-text">{ex.script}</p>
              </div>
            </div>
          ))}
        </section>

        <div style={{ marginTop: 40 }}>
          <Link href="/builder" className="cta-button">
            Coba generator lengkap
          </Link>
        </div>
        <Footer />
      </main>
    </>
  );
}
