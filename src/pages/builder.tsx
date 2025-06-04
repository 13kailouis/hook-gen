// src/pages/builder.tsx
import Head from "next/head";
import Navbar from "@/components/Navbar"; // Asumsi Navbar sudah ada dan sesuai
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FiCopy, FiCheck } from "react-icons/fi";
import { SalesAlternative } from "@/lib/groq"; // Import SalesAlternative

// Helper function to format script
const formatScriptForDisplay = (script: string) => {
  return script.split(" -- ").map((part, index, arr) => {
    let label = "";
    if (index === 0) label = "Hook:";
    else if (index === 1) label = "Problem:";
    else if (index === 2) label = "Agitation:";
    else if (index === 3) label = "Solution:";
    else if (index === 4) label = "CTA:";
    
    // Untuk menjaga format paragraf asli dari AI
    const contentParts = part.split('\n').map(p => p.trim()).filter(Boolean);

    return (
      <div key={index} className="script-part">
        {label && <strong>{label}</strong>}
        {contentParts.map((p, i) => <p key={i} style={{ margin: '0.5em 0' }}>{p}</p>)}
      </div>
    );
  });
};


export default function Builder() {
  const router = useRouter();
  const [productDesc, setProductDesc] = useState(""); //
  const [targetAudience, setTargetAudience] = useState(""); //
  const [contentStyle, setContentStyle] = useState("storytelling"); // Default style
  const [duration, setDuration] = useState(30);
  const [loading, setLoading] = useState(false); //
  const [results, setResults] = useState<SalesAlternative[] | null>(null); //
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Pre-fill form based on query parameters from persona CTAs
  useEffect(() => {
    if (router.isReady) {
      const { persona, product, audience, style } = router.query;
      if (product) setProductDesc(product as string);
      if (audience) setTargetAudience(audience as string);
      if (style) setContentStyle(style as string);
      
      if (persona === "ugc") {
        setProductDesc(productDesc || "Produk review dari brand XYZ (kosmetik/fashion/gadget)");
        setTargetAudience(targetAudience || "Anak muda Gen Z yang suka konten otentik dan review jujur");
        setContentStyle((style as string) || "storytelling");
      } else if (persona === "brand") {
        setProductDesc(productDesc || "Produk unggulan brand kami [Nama Brand]");
        setTargetAudience(targetAudience || "Target market spesifik brand kami [Misal: Ibu muda pekerja]");
        setContentStyle((style as string) || "soft-sell");
      } else if (persona === "freelancer") {
        setProductDesc(productDesc || "Produk klien [Nama Klien/Jenis Industri]");
        setTargetAudience(targetAudience || "Target audiens klien");
        setContentStyle((style as string) || "hard-sell");
      }
    }
  }, [router.isReady, router.query, productDesc, targetAudience, contentStyle]); // Added dependencies

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    // Tidak perlu error jika kosong, karena bisa pakai default
    // if (!productDesc && !targetAudience && !contentStyle) {
    //   setError("Mohon isi minimal salah satu field atau biarkan kosong untuk coba default.");
    //   // return; 
    // }
    setLoading(true); //
    setResults(null); //
    setError(null);
    try {
      const r = await fetch("/api/generate-script", { //
        method: "POST", //
        headers: { "Content-Type": "application/json" }, //
        body: JSON.stringify({ //
          description: productDesc,
          audience: targetAudience,
          style: contentStyle,
          duration,
        }),
      });
      if (!r.ok) {
        const errData = await r.json();
        throw new Error(errData.error || `Error ${r.status}`);
      }
      const data = await r.json(); //
      setResults(data.alternatives || []); //
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false); //
    }
  }

  const copyScript = (script: string, index: number) => {
    navigator.clipboard.writeText(script);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1200);
  };

  return (
    <>
      <Head>
        <title>Video Sales Hook Builder – HookFreak</title>
        <meta
          name="description"
          content="Bangun skrip video jualan TikTok, Reels, dan Shorts yang menjual dalam sekali klik."
        />
      </Head>
      <Navbar /> {/* Pastikan Navbar sudah diupdate atau sesuai */} {/* */}
      <main className="main-wrapper builder-page"> {/* Tambahkan class untuk styling spesifik jika perlu */} {/* */}
        <section className="hero"> {/* */}
          <h1 className="logo-text"> {/* */}
            Hook<span>Freak</span> {/* */}
          </h1>
          <p className="subtitle">Video Sales Hook Builder Lengkap</p> {/* */}
        </section>
        <section className="form-section"> {/* */}
          <form onSubmit={handleGenerate} className="hook-form"> {/* */}
            <label>
              <span className="form-label">Deskripsi Produk/Jasa Kamu</span> {/* */}
              <input
                type="text"
                placeholder="Mis: Serum pencerah wajah dengan Niacinamide 10%"
                value={productDesc} //
                onChange={(e) => setProductDesc(e.target.value)} //
                className="niche-input" //
              />
            </label>
            <label>
              <span className="form-label">Siapa Target Audiensmu?</span> {/* */}
              <input
                type="text"
                placeholder="Mis: Wanita 20-35 th, kulit kusam, aktif di TikTok"
                value={targetAudience} //
                onChange={(e) => setTargetAudience(e.target.value)} //
                className="niche-input" //
              />
            </label>
            <label>
              <span className="form-label">Pilih Gaya Konten Jualan</span> {/* */}
              <select
                value={contentStyle} //
                onChange={(e) => setContentStyle(e.target.value)} //
                className="tone-select" //
              >
                <option value="storytelling">Storytelling (Cerita)</option> {/* */}
                <option value="soft-sell">Soft Sell (Jualan Halus)</option> {/* */}
                <option value="hard-sell">Hard Sell (Jualan Langsung)</option> {/* */}
                <option value="humor">Humor (Kocak)</option> {/* */}
                <option value="shock">Shock (Mengejutkan)</option> {/* */}
                <option value="fomo">FOMO (Bikin Takut Ketinggalan)</option>
                <option value="edukatif">Edukatif (Memberi Informasi)</option>
                 <option value="problem-solution">Problem/Solution (Masalah & Solusi)</option>
                <option value="testimonial">Testimonial (Review Jujur)</option>
                <option value="unboxing">Unboxing Keren</option>
              </select>
            </label>
            <label>
              <span className="form-label">Durasi Maksimal Skrip</span>
              <select value={duration} onChange={(e) => setDuration(parseInt(e.target.value))} className="tone-select">
                <option value={15}>15 detik</option>
                <option value={30}>30 detik</option>
                <option value={60}>60 detik</option>
              </select>
            </label>
            <button type="submit" disabled={loading} className="generate-button"> {/* */}
              {loading ? "Lagi Mikir Keras..." : "✨ Hasilkan 3 Alternatif Skrip!"} {/* */}
            </button>
          </form>

          {error && <p className="error-message" style={{color: 'red', marginTop: '1rem'}}>{error}</p>}

          {loading && <div className="loader" style={{margin: '2rem auto'}} />} {/* */}

          {results && results.length > 0 && ( //
            <div className="results-container" style={{marginTop: '2rem'}}>
              <h2 style={{textAlign: 'center', marginBottom: '1.5rem'}}>Ini 3 Alternatif Skrip Buatmu:</h2>
              {results.map((alt, idx) => ( //
                <div key={idx} className="alternative-card" style={{ background: '#1a1a1a', border:'1px solid #333', borderRadius: '8px', padding: '20px', marginBottom: '24px', position: 'relative' }}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <h3>Alternatif {idx + 1}</h3>
                    <button className="copy-button" aria-label="Copy script" onClick={() => copyScript(alt.script, idx)}>
                      {copiedIndex === idx ? <FiCheck size={18}/> : <FiCopy size={18}/>}
                    </button>
                  </div>
                  <div className="result-section">
                    <strong>🎨 Visual Hook Prompt:</strong>
                    <p>{alt.visualHook}</p> {/* */}
                  </div>
                  <div className="result-section">
                    <strong>💬 Teks Hook (Subtitle/VO):</strong>
                    <p>{alt.textHook}</p> {/* */}
                  </div>
                  <div className="result-section">
                    <strong>📝 Struktur Skrip Video:</strong>
                    <div className="script-display">{formatScriptForDisplay(alt.script)}</div> {/* */}
                  </div>
                  <div className="result-section">
                    <strong>🎬 Saran Frame per Bagian:</strong>
                    <p style={{whiteSpace: 'pre-line'}}>{alt.frames}</p> {/* */}
                  </div>
                   {/* <p style={{fontSize: '0.8em', color: '#777', marginTop: '1em'}}>
                    Style: {alt._internalStyle}, Audience: {alt._internalAudience}, Product: {alt._internalProductDesc}
                  </p> */}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <style jsx>{`
        .builder-page .form-section { max-width: 700px; }
        .alternative-card h3 { color: var(--highlight-color); margin-top: 0; }
        .result-section { margin-bottom: 1.5em; }
        .result-section strong { display: block; margin-bottom: 0.5em; color: #eee; }
        .result-section p { margin: 0.2em 0; line-height: 1.6; color: #ccc; }
        .script-display .script-part { margin-bottom: 1em; }
        .script-display .script-part strong { color: var(--highlight-color); }
        .script-display .script-part p { margin: 0.3em 0; color: #ccc; }
      `}</style>
    </>
  );
}
