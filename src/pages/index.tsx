// 📁 pages/index.tsx
import Head from "next/head";
import { useEffect, useState } from "react";
import HookList from "@/components/HookList";
import { FiCopy, FiCheck } from "react-icons/fi";

export default function Home() {
  const [niche, setNiche] = useState("");
  const [tone, setTone] = useState("fear");
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [hooks, setHooks] = useState<string[]>([]);
  const [copiedAll, setCopiedAll] = useState(false);
  const [placeholder, setPlaceholder] = useState("Contoh: jualan skincare glowing");
  const [tipsIndex, setTipsIndex] = useState(0);

  const tips = [
    "Hook dengan kalimat larangan punya CTR 2x lebih tinggi.",
    "Kata 'lu' dan 'gue' bisa membangun koneksi lebih kuat.",
    "Pertanyaan kontras bikin otak berhenti scroll.",
    "Kalimat yang malu-malu tapi jujur memicu rasa penasaran.",
    "Kalau tanpa visual, kalimatmu harus bisa divisualisasikan oleh otak."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTipsIndex((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const options = [
      "jualan skincare glowing",
      "dropship baju tidur",
      "jualan alat dapur unik",
      "jualan lampu aesthetic",
      "affiliate produk pelangsing",
      "jualan serum pemutih",
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % options.length;
      setPlaceholder("Contoh: " + options[i]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!niche) return;
    setLoading(true);
    setHooks([]);
    try {
      const r = await fetch("/api/generate-hooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche, tone, product }),
      });
      const data = await r.json();
      setHooks(data.hooks || []);
    } finally {
      setLoading(false);
    }
  }

  function copyAll() {
    navigator.clipboard.writeText(hooks.join("\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1500);
  }

  function exportToTxt() {
    const blob = new Blob([hooks.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hookfreak-result.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <Head>
        <title>HookFreak • Viral Hook Generator</title>
        <meta name="description" content="Bikin hook TikTok dan IG viral dengan 1 klik. Powered by STIDS." />
        <meta property="og:image" content="/og-cover.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <main className="main-wrapper">
        <section className="hero">
          <h1 className="logo-text">
            Hook<span>Freak</span>
          </h1>
          <p className="subtitle">Generate hook TikTok viral tanpa ribet</p>
        </section>

        <section className="form-section">
          <form onSubmit={handleGenerate} className="hook-form">
            <label>
              <span className="form-label">Niche Konten</span>
              <input
                type="text"
                placeholder={placeholder}
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="niche-input"
              />
            </label>

            <label>
              <span className="form-label">Pilih Gaya Hook</span>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="tone-select"
              >
                <option value="affiliate">🛍️ Affiliate Produk</option>
                <option value="fear">😱 Fear / Shock</option>
                <option value="curiosity">🧠 Curiosity</option>
                <option value="confession">🤐 Confession</option>
                <option value="humor">😂 Humor</option>
              </select>
            </label>

            {tone === "affiliate" && (
              <label>
                <span className="form-label">Jenis Produk (Opsional)</span>
                <input
                  type="text"
                  placeholder="Contoh: sabun muka, baju tidur, dll"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                />
                <p className="form-note">
                  🎯 Hook akan disesuaikan untuk jualan produk: sugestif, FOMO, sindiran, micro-pain.
                </p>
              </label>
            )}

            <button type="submit" disabled={loading} className="generate-button">
              {loading ? "Menghasilkan..." : "🎯 Generate Hook Viral"}
            </button>

            <p className="hook-tip">💡 {tips[tipsIndex]}</p>
          </form>

          {loading && <div className="loader" />}

          {hooks.length > 0 && (
            <div className="results">
              <button className="copy-all" onClick={copyAll}>
                {copiedAll ? <FiCheck size={18} color="#22c55e" /> : <FiCopy size={18} />} Salin Semua
              </button>

              <button className="export-button" onClick={exportToTxt}>
                ⬇️ Export .TXT
              </button>

              <HookList hooks={hooks} />

              <div style={{ marginTop: 32, textAlign: "center" }}>
                <a
                  href="https://t.me/hookfreak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="community-cta"
                >
                  📢 Gabung Komunitas Telegram HookFreak →
                </a>
              </div>
            </div>
          )}
        </section>

        <footer className="footer">Made with ❤️ by @Stidscom • Powered by Stids AI</footer>
      </main>
    </>
  );
}
