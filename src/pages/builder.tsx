// src/pages/builder.tsx
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FiCopy, FiCheck } from "react-icons/fi";

/* ----------  TYPE  ---------- */
type SalesAlternative = {
  visualHook: string;
  textHook: string;
  script: string;
  frames: string;
  _internalStyle: string;
  _internalAudience: string;
  _internalProductDesc: string;
};

/* ----------  HELPERS ---------- */
const LABEL = ["Hook", "Problem", "Agitation", "Solution", "CTA"];
const fmtScript = (s: string) =>
  s.split(" -- ").map((part, i) => (
    <div key={i} className="sr">
      <strong>{LABEL[i]}:</strong>
      <p>{part.trim()}</p>
    </div>
  ));

/* ----------  PAGE  ---------- */
export default function Builder() {
  const router            = useRouter();
  const [product, setP]   = useState("");
  const [audience, setA]  = useState("");
  const [style, setS]     = useState("storytelling");
  const [duration, setD]  = useState(30);
  const [loading, setL]   = useState(false);
  const [err, setErr]     = useState<string|null>(null);
  const [alts, setAlts]   = useState<SalesAlternative[]|null>(null);
  const [copied, setCop]  = useState<number|null>(null);

  /* Prefill dari persona query */
  useEffect(() => {
    if (!router.isReady) return;
    const { persona } = router.query;
    if (persona === "ugc")        setS("storytelling");
    else if (persona === "brand") setS("soft-sell");
    else if (persona === "freelancer") setS("hard-sell");
  }, [router.isReady, router.query]);

  /* Generate */
  async function generate(e: React.FormEvent) {
    e.preventDefault();
    setL(true); setErr(null); setAlts(null);
    try{
      const r = await fetch("/api/generate-script",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({description:product,audience,style,duration})
      });
      if(!r.ok) throw new Error((await r.json()).error||`Error ${r.status}`);
      const d = await r.json();
      setAlts(d.alternatives||[]);
    }catch(e:any){setErr(e.message);}
    finally{setL(false);}
  }

  /* Copy */
  const doCopy = (txt:string,i:number)=>{
    navigator.clipboard.writeText(txt);
    setCop(i); setTimeout(()=>setCop(null),1200);
  };

  return(
    <>
      <Head>
        <title>Builder – HookFreak</title>
        <meta name="description" content="Generate hook, script & frame ideas in one click."/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>

      {/* ---------- NAV (reuse style dari landing) ---------- */}
      <nav className="nav">
        <div className="logo">Hook<span>Freak</span></div>
        <Link href="/" className="btn ghost">← Home</Link>
      </nav>

      <main className="wrap">
        {/* ---------- HERO ---------- */}
        <header className="hero">
          <h1>Bikin Skrip Jualan <span className="hl">Kilat</span></h1>
          <p>Isi form singkat → dapat 3 alternatif siap pakai.</p>
        </header>

        {/* ---------- FORM ---------- */}
        <form onSubmit={generate} className="form card">
          <label>Deskripsi Produk / Jasa
            <input value={product} onChange={e=>setP(e.target.value)} placeholder="Serum pencerah Niacinamide 10%"/>
          </label>

          <label>Target Audiens
            <input value={audience} onChange={e=>setA(e.target.value)} placeholder="Wanita 20-35 th, kulit kusam"/>
          </label>

          <label>Gaya Konten
            <select value={style} onChange={e=>setS(e.target.value)}>
              <option value="storytelling">Storytelling</option>
              <option value="soft-sell">Soft Sell</option>
              <option value="hard-sell">Hard Sell</option>
              <option value="humor">Humor</option>
              <option value="shock">Shock</option>
              <option value="fomo">FOMO</option>
              <option value="edukatif">Edukatif</option>
              <option value="problem-solution">Problem / Solution</option>
              <option value="testimonial">Testimonial</option>
              <option value="unboxing">Unboxing</option>
            </select>
          </label>

          <label>Durasi Maksimum
            <select value={duration} onChange={e=>setD(+e.target.value)}>
              <option value={15}>15 detik</option>
              <option value={30}>30 detik</option>
              <option value={60}>60 detik</option>
            </select>
          </label>

          <button className="btn primary" disabled={loading}>
            {loading? "⏳ Membuat..." : "✨ Hasilkan 3 Skrip"}
          </button>

          {err && <p className="err">{err}</p>}
        </form>

        {/* ---------- RESULTS ---------- */}
        {alts && alts.length>0 && (
          <section className="results">
            <h2>3 Alternatif Skrip</h2>
            {alts.map((a,i)=>(
              <div key={i} className="card alt">
                <header>
                  <h3>Alternatif {i+1}</h3>
                  <button onClick={()=>doCopy(a.script,i)} className="copy" aria-label="Copy">
                    {copied===i? <FiCheck size={18}/> : <FiCopy size={18}/> }
                  </button>
                </header>

                <div className="part"><b>🎨 Visual Hook</b><p>{a.visualHook}</p></div>
                <div className="part"><b>💬 Teks Hook</b><p>{a.textHook}</p></div>
                <div className="part"><b>📝 Skrip</b><div className="script">{fmtScript(a.script)}</div></div>
                <div className="part"><b>🎬 Frame</b><p style={{whiteSpace:"pre-line"}}>{a.frames}</p></div>
              </div>
            ))}
          </section>
        )}
      </main>

      {/* ---------- STYLE ---------- */}
      <style jsx>{`
        .wrap{max-width:820px;margin:0 auto;padding:4rem 1.5rem}
        .hero{text-align:center;margin-bottom:3rem}
        .hero h1{font-size:2rem;font-weight:900;margin-bottom:.8rem}
        .hero p{color:var(--clr-muted)}

        /* form */
        .form label{display:block;margin-bottom:1.2rem;font-weight:600}
        .form input,.form select{
          width:100%;padding:.8rem;border-radius:6px;border:1px solid #333;
          background:#0b0b0b;color:var(--clr-text);margin-top:.4rem
        }
        .form .btn{margin-top:1rem;width:100%}
        .err{color:#ff6b6b;margin-top:1rem;text-align:center}

        /* cards */
        .card{
          background:var(--clr-card);border:1px solid #222;border-radius:var(--radius);
          padding:2rem 1.5rem;transition:.25s
        }
        .card:hover{border-color:var(--clr-primary)}

        /* results */
        .results h2{text-align:center;margin:4rem 0 2rem;font-size:1.6rem}
        .alt header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem}
        .alt header h3{margin:0;color:var(--clr-primary)}
        .copy{background:none;border:none;color:var(--clr-text);cursor:pointer}

        .part{margin-top:1.4rem}
        .part b{display:block;color:var(--clr-primary);margin-bottom:.4rem}
        .script{border-left:3px solid var(--clr-primary);padding-left:.8rem;background:#151515}
        .sr{margin-bottom:.8rem}
        .sr strong{color:var(--clr-primary);display:block;margin-bottom:.2rem}

        @media(max-width:480px){
          .hero h1{font-size:1.55rem}
          .wrap{padding:3rem 1rem}
        }
      `}</style>
    </>
  );
}
