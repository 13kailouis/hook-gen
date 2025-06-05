import Head from "next/head";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/router";

export default function Batch() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login?next=/batch');
    }
  }, [authLoading, user, router]);

  if (authLoading || !user) return null;
  const [brand, setBrand] = useState("");
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [count, setCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!brand || !product) return;
    setLoading(true);
    setItems([]);
    try {
      const r = await fetch("/api/generate-batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand, product, audience, count }),
      });
      const data = await r.json();
      setItems(data.batch || []);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>HookFreak • Batch Pack</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="main-wrapper">
        <section className="hero">
          <h1 className="logo-text">
            Hook<span>Freak</span>
          </h1>
          <p className="subtitle">Batch Pack Generator</p>
        </section>
        <section className="form-section">
          <form onSubmit={handleGenerate} className="hook-form">
            <label>
              <span className="form-label">Nama Brand</span>
              <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="niche-input" />
            </label>
            <label>
              <span className="form-label">Produk</span>
              <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} className="niche-input" />
            </label>
            <label>
              <span className="form-label">Audiens</span>
              <input type="text" value={audience} onChange={(e) => setAudience(e.target.value)} className="niche-input" />
            </label>
            <label>
              <span className="form-label">Jumlah Konten</span>
              <input type="number" value={count} min={1} max={30} onChange={(e) => setCount(Number(e.target.value))} className="niche-input" />
            </label>
            <button type="submit" disabled={loading} className="generate-button">
              {loading ? "Menghasilkan..." : "Generate Batch"}
            </button>
          </form>
          {items.length > 0 && (
            <div className="results" style={{ whiteSpace: "pre-wrap" }}>
              {items.map((it, idx) => (
                <div key={idx} style={{ marginBottom: 24 }}>
                  <p><strong>{it.title}</strong></p>
                  <p>Visual: {it.visual}</p>
                  <p>Text Hook: {it.text}</p>
                  <p>Hook: {it.hook}</p>
                  <p>Problem: {it.problem}</p>
                  <p>Solution: {it.solution}</p>
                  <p>CTA: {it.cta}</p>
                  <p>Thumbnail: {it.thumbnail}</p>
                  <p>VO: {it.vo}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
