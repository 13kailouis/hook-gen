import { useState } from "react";
import HookList from "./HookList";
import { FiCopy, FiCheck } from "react-icons/fi";

export default function HookForm() {
  const [niche, setNiche] = useState("");
  const [tone, setTone] = useState("fear");
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [hooks, setHooks] = useState<string[]>([]);
  const [copiedAll, setCopiedAll] = useState(false);

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

  return (
    <div className="container">
      <div className="branding">
        HookFreak <span style={{ fontSize: 16, color: "#888" }}>by STIDS</span>
      </div>

      <form onSubmit={handleGenerate}>
        <input
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

        {tone === "affiliate" && (
          <>
            <input
              placeholder="Jenis produk (opsional, contoh: sabun muka, baju tidur...)"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
            <p className="note">
              🎯 Hook akan dibuat untuk jualan produk: sugestif, FOMO, sindiran, micro-pain.
            </p>
          </>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Menghasilkan..." : "Generate 10 Hook Viral"}
        </button>
      </form>

      {loading && <div className="loader">Loading...</div>}

      {hooks.length > 0 && (
        <>
          <button
            onClick={copyAll}
            style={{
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {copiedAll ? (
              <FiCheck size={18} color="#22c55e" />
            ) : (
              <FiCopy size={18} />
            )}
            Salin Semua Hook
          </button>

          <HookList hooks={hooks} />
        </>
      )}

      <footer style={{ marginTop: 40, fontSize: 12, color: "#666", textAlign: "center" }}>
        © {new Date().getFullYear()} HookFreak by STIDS
      </footer>
    </div>
  );
}
