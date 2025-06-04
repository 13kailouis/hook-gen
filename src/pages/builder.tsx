import Head from "next/head";
import { useState } from "react";

export default function Builder() {
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState("");
  const [style, setStyle] = useState("soft-sell");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any[] | null>(null);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!description) return;
    setLoading(true);
    setResult(null);
    try {
      const r = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, audience, style }),
      });
      const data = await r.json();
      setResult(data.hooks || []);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>HookFreak • Video Sales Hook Builder</title>
      </Head>
      <main className="main-wrapper">
        <section className="hero">
          <h1 className="logo-text">
            Hook<span>Freak</span>
          </h1>
          <p className="subtitle">Video Sales Hook Builder</p>
        </section>
        <section className="form-section">
          <form onSubmit={handleGenerate} className="hook-form">
            <label>
              <span className="form-label">Deskripsi Produk</span>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="niche-input"
              />
            </label>
            <label>
              <span className="form-label">Target Audiens</span>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="niche-input"
              />
            </label>
            <label>
              <span className="form-label">Gaya Konten</span>
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
            <button type="submit" disabled={loading} className="generate-button">
              {loading ? "Menghasilkan..." : "Generate Script"}
            </button>
          </form>
          {result && (
            <div className="results" style={{ whiteSpace: "pre-wrap" }}>
              {result.map((r, idx) => (
                <div key={idx} style={{ marginBottom: 24 }}>
                  <p><strong>Visual Hook:</strong> {r.visualHook}</p>
                  <p><strong>Teks Hook:</strong> {r.textHook}</p>
                  <p><strong>Script:</strong> {r.script}</p>
                  <p><strong>Frame:</strong> {r.frames}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
