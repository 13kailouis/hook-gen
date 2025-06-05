// src/pages/builder.tsx
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/router";
import { FiCopy, FiCheck } from "react-icons/fi";

/* ----------  TYPE ---------- */
type SalesAlternative = {
  visualHook: string;
  textHook: string;
  script: string;
  frames: string;
  _internalStyle: string;
  _internalAudience: string;
  _internalProductDesc: string;
};

/* ----------  ENV ---------- */
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "HookFreak";
const [MAIN, SECOND] = SITE_NAME.split(" ");

/* ----------  HELPERS ---------- */
const formatScript = (s: string) =>
  s.split(" -- ").map((part, i) => {
    const L = ["Hook", "Problem", "Agitation", "Solution", "CTA"];
    return (
      <div key={i} className="script-row">
        <strong>{L[i]}:</strong>
        <span>{part.trim()}</span>
      </div>
    );
  });

/* ----------  PAGE ---------- */
export default function Builder() {
  const router = useRouter();
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [style, setStyle] = useState("storytelling");
  const [duration, setDuration] = useState(30);
  const [loading, setLoading] = useState(false);
  const [alts, setAlts] = useState<SalesAlternative[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [copied, setCopied] = useState<number | null>(null);

  /* ---- Prefill from persona query ---- */
  useEffect(() => {
    if (!router.isReady) return;
    const { persona } = router.query;
    if (persona === "ugc") {
      setStyle("storytelling");
    } else if (persona === "brand") {
      setStyle("soft-sell");
    } else if (persona === "freelancer") {
      setStyle("hard-sell");
    }
  }, [router.isReady, router.query]);

  /* ---- API ---- */
  async function handleGenerate(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    setAlts(null);
    try {
      const r = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: product, audience, style, duration }),
      });
      if (!r.ok) throw new Error(`Error ${r.status}`);
      const data = await r.json();
      setAlts(data.alternatives);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  /* ---- Clipboard ---- */
  function copy(text: string, i: number) {
    navigator.clipboard.writeText(text);
    setCopied(i);
    setTimeout(() => setCopied(null), 1200);
  }

  return (
    <>
      <Head>
        <title>Builder – {SITE_NAME}</title>
        <meta name="description" content="Generate visual hook, opening line & full sales script in one click." />
      </Head>

      {/* NAV – sama persis dengan index.tsx */}
      <nav className="nav">
        <div className="logo">
          {MAIN}
          {SECOND && <span>{SECOND}</span>}
        </div>
        <Link href="/" className="btn ghost">
          ⬅︎ Home
        </Link>
      </nav>

      <header className="hero small">
        <h1>
          <span className="hl">{SITE_NAME}</span> Builder
        </h1>
        <p>Buat 3 alternatif skrip video jualan dalam sekali klik.</p>
      </header>

      <main className="builder">
        <form onSubmit={handleGenerate} className="card form">
          <label>
            <span>Deskripsi Produk / Jasa</span>
            <input
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="Serum pencerah Niacinamide 10%"
            />
          </label>

          <label>
            <span>Target Audiens</span>
            <input
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="Wanita 20–35 tahun, kulit kusam"
            />
          </label>

          <label>
            <span>Gaya Konten</span>
            <select value={style} onChange={(e) => setStyle(e.target.value)}>
              <option value="storytelling">Storytelling</option>
              <option value="soft-sell">Soft Sell</option>
              <option value="hard-sell">Hard Sell</option>
              <option value="humor">Humor</option>
              <option value="shock">Shock</option>
              <option value="fomo">FOMO</option>
              <option value="problem-solution">Problem / Solution</option>
              <option value="testimonial">Testimonial</option>
              <option value="unboxing">Unboxing</option>
            </select>
          </label>

          <label>
            <span>Durasi Maksimal</span>
            <select value={duration} onChange={(e) => setDuration(+e.target.value)}>
              <option value={15}>15 detik</option>
              <option value={30}>30 detik</option>
              <option value={60}>60 detik</option>
            </select>
          </label>

          <button className="btn primary" disabled={loading}>
            {loading ? "Generating…" : "✨ Hasilkan 3 Skrip"}
          </button>

          {err && <p className="err">{err}</p>}
        </form>

        {loading && <div className="loader" />}

        {alts && (
          <section className="results">
            <h2>Alternatif Skrip</h2>
            {alts.map((a, i) => (
              <div key={i} className="card result">
                <div className="result-head">
                  <h3>Alternatif {i + 1}</h3>
                  <button onClick={() => copy(a.script, i)} className="copy">
                    {copied === i ? <FiCheck size={18} /> : <FiCopy size={18} />}
                  </button>
                </div>

                <div className="part">
                  <b>🎨 Visual Hook</b>
                  <p>{a.visualHook}</p>
                </div>

                <div className="part">
                  <b>💬 Teks Hook</b>
                  <p>{a.textHook}</p>
                </div>

                <div className="part">
                  <b>📝 Skrip</b>
                  <div className="script">{formatScript(a.script)}</div>
                </div>

                <div className="part">
                  <b>🎬 Frame Idea</b>
                  <p style={{ whiteSpace: "pre-line" }}>{a.frames}</p>
                </div>
              </div>
            ))}
          </section>
        )}
      </main>

      {/* ----------  STYLE ---------- */}
      <style jsx>{`
        /* import global token dari index */
        .builder {
          max-width: 900px;
          margin: 3rem auto 5rem;
          padding: 0 1rem;
        }
        .card {
          background: var(--clr-card);
          border: 1px solid #222;
          border-radius: var(--radius);
          padding: 2rem 1.6rem;
          transition: 0.25s;
        }
        .card:hover {
          border-color: var(--clr-primary);
          transform: translateY(-4px);
        }
        .form {
          display: grid;
          gap: 1.2rem;
          margin-bottom: 2.5rem;
        }
        .form label {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          font-weight: 600;
        }
        .form input,
        .form select {
          background: #0c0c0c;
          border: 1px solid #333;
          border-radius: 6px;
          padding: 0.75rem 1rem;
          color: var(--clr-text);
        }
        .form .err {
          color: #ff7171;
          margin-top: 0.6rem;
        }

        .results h2 {
          text-align: center;
          font-size: 1.8rem;
          margin-bottom: 2rem;
        }
        .result {
          margin-bottom: 2.5rem;
        }
        .result-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          border-bottom: 1px solid #222;
          padding-bottom: 0.8rem;
        }
        .result-head h3 {
          margin: 0;
          font-size: 1.1rem;
          color: var(--clr-primary);
        }
        .copy {
          background: transparent;
          color: var(--clr-text);
        }
        .part {
          margin-top: 1.3rem;
        }
        .part b {
          display: block;
          color: var(--clr-primary);
          margin-bottom: 0.4rem;
        }
        .script {
          border-left: 3px solid var(--clr-primary);
          background: #151515;
          padding-left: 0.8rem;
        }
        .script-row {
          margin-bottom: 1rem;
          line-height: 1.6;
        }
        .script-row strong {
          color: var(--clr-primary);
          display: block;
          margin-bottom: 0.2rem;
        }
        .loader {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-top: 4px solid var(--clr-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 3rem auto;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        /* Reuse nav/hero from index */
        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2rem 1.6rem;
          background: #080808;
          position: sticky;
          top: 0;
          border-bottom: 1px solid #1a1a1a;
          z-index: 50;
        }
        .logo {
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--clr-primary);
        }
        .logo span {
          color: var(--clr-text);
        }
        .hero.small {
          text-align: center;
          padding: 3rem 1.5rem 2rem;
        }
        .hero.small h1 {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 0.8rem;
        }
        .hero.small p {
          color: var(--clr-muted);
          line-height: 1.7;
          max-width: 600px;
          margin: 0 auto;
        }
        .hl {
          color: var(--clr-primary);
        }

        /* buttons (reuse global) */
        .btn {
          display: inline-block;
          padding: 0.9rem 1.8rem;
          border-radius: 6px;
          font-weight: 700;
          transition: 0.2s;
          text-decoration: none;
        }
        .btn.ghost {
          background: rgba(255, 255, 255, 0.06);
        }
        .btn.primary {
          background: var(--clr-primary);
          color: #000;
          box-shadow: 0 4px 15px rgba(57, 255, 20, 0.3);
        }
        .btn.primary:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 480px) {
          .hero.small h1 {
            font-size: 1.6rem;
          }
          .builder {
            margin-top: 2rem;
          }
        }
      `}</style>
    </>
  );
}
