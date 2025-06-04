import Head from "next/head";
import { useState } from "react";

export default function Builder() {
  const [niche, setNiche] = useState("");
  const [style, setStyle] = useState("soft-sell");
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!niche) return;
    setLoading(true);
    setResult(null);
    try {
      const r = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche, style, product }),
      });
      const data = await r.json();
      setResult(data.script);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>HookFreak • Content Builder</title>
      </Head>
      <main className="main-wrapper">
        <section className="hero">
          <h1 className="logo-text">
            Hook<span>Freak</span>
          </h1>
          <p className="subtitle">Content Builder</p>
        </section>
        <section className="form-section">
          <form onSubmit={handleGenerate} className="hook-form">
            <label>
              <span className="form-label">Apa yang mau dijual?</span>
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="niche-input"
              />
            </label>
            <label>
              <span className="form-label">Gaya penyampaian</span>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="tone-select"
              >
                <option value="hard-sell">Hard Sell</option>
                <option value="soft-sell">Soft Sell</option>
                <option value="storytelling">Storytelling</option>
                <option value="humor">Humor</option>
                <option value="shock">Shock</option>
              </select>
            </label>
            <label>
              <span className="form-label">Produk (opsional)</span>
              <input
                type="text"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
            </label>
            <button type="submit" disabled={loading} className="generate-button">
              {loading ? "Menghasilkan..." : "Generate Script"}
            </button>
          </form>
          {result && (
            <div className="results" style={{ whiteSpace: "pre-wrap" }}>
              <p><strong>Hook:</strong> {result.hook}</p>
              <p><strong>Problem:</strong> {result.problem}</p>
              <p><strong>Agitation:</strong> {result.agitation}</p>
              <p><strong>Solution:</strong> {result.solution}</p>
              <p><strong>CTA:</strong> {result.cta}</p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
