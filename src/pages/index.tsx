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
  const [copied, setCopied] = useState<string | null>(null);

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

  function copy(text: string, section: string) {
    navigator.clipboard.writeText(text);
    setCopied(section);
    setTimeout(() => setCopied(null), 1200);
  }

  function exportAll() {
    if (!result) return;
    const data = `Visual Hook: ${result.visualHook}\nText Hook: ${result.textHook}\nScript:\n${result.script}\nFrames: ${result.frames}`;
    const blob = new Blob([data], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "hookfreak.txt";
    link.click();
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
            <div className="hero-content">
              <h1 className="hero-headline">
                Bikin konten TikTok jualan yang langsung nancep di detik pertama — tanpa mikir skrip
              </h1>
              <form onSubmit={handleGenerate} className="hero-form">
                <label className="form-label">
                  Produk kamu jual apa?
                  <input
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    placeholder="Contoh: Serum anti jerawat, Sepatu lari, Kursus trading"
                    className="niche-input"
                  />
                  <span className="form-note">
                    Tulis produkmu. Kami bantu bikin kontennya dalam format video jualan 30 detik.
                  </span>
                </label>
                <label className="form-label">
                  Gaya konten kamu?
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="tone-select"
                  >
                    <option value="storytelling">storytelling</option>
                    <option value="edukatif">edukatif</option>
                    <option value="shock">shock</option>
                    <option value="lucu">lucu</option>
                    <option value="hard-sell">hard-sell</option>
                  </select>
                </label>
                <button type="submit" className="cta-button" disabled={loading}>
                  {loading ? "Sebentar..." : "🎬 Generate Konten Saya Sekarang"}
                </button>
              </form>
              <p className="microcopy">Tidak perlu login. Kamu bisa coba gratis.</p>
            </div>
            <div className="hero-visual">
              <div className="result-preview">
                <h4>Contoh hasil konten kamu nanti</h4>
                <p>🎥 Visual Hook: Close-up wajah penuh jerawat + teks "Udah coba segalanya tapi tetep breakout?"</p>
                <p>📢 Teks Hook: "Jerawatmu bukan karena makanan. Tapi karena ini."</p>
                <p>✍️ Skrip: [cuplikan 2 baris dari script]</p>
                <button className="regen">Lihat contoh lengkap</button>
              </div>
            </div>
            <div className="result-section">
                {loading && (
                  <div className="result-cards">
                    <div className="card visual-card skeleton" style={{ height: 140 }} />
                    <div className="card text-card skeleton" style={{ height: 100 }} />
                    <div className="card script-card skeleton" style={{ height: 160 }} />
                    <div className="card frame-card skeleton" style={{ height: 80 }} />
                  </div>
                )}
                {result && !loading && (
                  <>
                    <div className="result-cards">
                      <div className="card visual-card">
                        <div className="card-header">
                          <span>🎥 Visual Opening</span>
                          <div>
                            <button
                              className={`copy-btn ${copied === "visual" ? "copied" : ""}`}
                              onClick={() => copy(result.visualHook, "visual")}
                            >
                              {copied === "visual" ? "✅ Copied" : "Copy"}
                            </button>
                            <button
                              className="regen-btn"
                              onClick={handleGenerate}
                              disabled={loading}
                            >
                              🔁
                            </button>
                          </div>
                        </div>
                        <p>{result.visualHook}</p>
                        <p className="hook-tip">
                          Pastikan kamu rekam adegan ini sebagai 1 detik pertama video kamu.
                        </p>
                      </div>

                      <div className="card text-card">
                        <div className="card-header">
                          <span>📢 Teks Hook</span>
                          <div>
                            <button
                              className={`copy-btn ${copied === "text" ? "copied" : ""}`}
                              onClick={() => copy(result.textHook, "text")}
                            >
                              {copied === "text" ? "✅ Copied" : "Copy"}
                            </button>
                            <button
                              className="regen-btn"
                              onClick={handleGenerate}
                              disabled={loading}
                            >
                              🔁
                            </button>
                          </div>
                        </div>
                        <p className="hook-text-large">{result.textHook}</p>
                      </div>

                      <div className="card script-card">
                        <div className="card-header">
                          <span>📝 Script Konten</span>
                          <div>
                            <button
                              className={`copy-btn ${copied === "script" ? "copied" : ""}`}
                              onClick={() => copy(result.script, "script")}
                            >
                              {copied === "script" ? "✅ Copied" : "Copy"}
                            </button>
                            <button
                              className="regen-btn"
                              onClick={handleGenerate}
                              disabled={loading}
                            >
                              🔁
                            </button>
                          </div>
                        </div>
                        {result.script.split("\n").map((line: string, idx: number) => (
                          <p key={idx} className="script-line">
                            {line}
                          </p>
                        ))}
                      </div>

                      <div className="card frame-card">
                        <div className="card-header">
                          <span>🎬 Frame Suggestions</span>
                          <div>
                            <button
                              className={`copy-btn ${copied === "frames" ? "copied" : ""}`}
                              onClick={() => copy(result.frames, "frames")}
                            >
                              {copied === "frames" ? "✅ Copied" : "Copy"}
                            </button>
                            <button
                              className="regen-btn"
                              onClick={handleGenerate}
                              disabled={loading}
                            >
                              🔁
                            </button>
                          </div>
                        </div>
                        <div className="frame-list">{result.frames}</div>
                      </div>
                    </div>
                    <button onClick={exportAll} className="export-button">
                      Export Semua
                    </button>
                  </>
                )}
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
