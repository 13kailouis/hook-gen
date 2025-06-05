// src/pages/index.tsx
import Head from "next/head";
import Link from "next/link";
import { useMemo } from "react";

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

/* ----------  GLOBAL VAR ---------- */
const SITE_NAME       = process.env.NEXT_PUBLIC_SITE_NAME || "HookFreak";
const SITE_TAGLINE    = "Video Sales Hook Builder";
const SITE_DESC       = "Generate visual hooks, opening lines, full scripts & frame ideas for TikTok/Reels in seconds.";
const PRIMARY_COLOR   = process.env.NEXT_PUBLIC_PRIMARY   || "#39ff14";
const [MAIN, SECOND]  = SITE_NAME.split(" ");

/* ----------  STATIC DATA ---------- */
const FEATURES = [
  { icon:"💡", title:"3 Alternatif Sekali Klik", desc:"Setiap generate memberi tiga skrip berbeda siap pakai." },
  { icon:"🎬", title:"Ide Visual & Frame",        desc:"Tidak cuma teks, dapatkan saran visual hook & alur frame." },
  { icon:"⏱️", title:"Durasi Fleksibel",          desc:"Atur panjang skrip 15-60 detik sesuai kebutuhan konten." },
];

const EXAMPLES: SalesAlternative[] = [
  /* --- contoh singkat; isi asli Anda di sini --- */
  {
    visualHook:"Close-up wajah kaget…",
    textHook:"Baru bangun udah…",
    script:"Hook: … -- Problem: … -- Agitation: … -- Solution: … -- CTA: …",
    frames:"Hook: …",
    _internalStyle:"Storytelling",
    _internalAudience:"Remaja & Dewasa Muda",
    _internalProductDesc:"Serum Anti Jerawat",
  }
];

/* ----------  HELPERS ---------- */
const LABEL = ["Hook", "Problem", "Agitation", "Solution", "CTA"];

const formatScript = (s: string) =>
  s.split(" -- ").map((part, i) => {
    const text = part.replace(new RegExp(`^${LABEL[i]}\\s*:`, "i"), "").trim();
    return (
      <div key={i} className="script-row">
        <strong>{LABEL[i]}:</strong>
        <span>{text}</span>
      </div>
    );
  });

const formatFrames = (s: string) =>
  LABEL.map((lab, i) => {
    const reg = new RegExp(`${lab}\\s*:(.*?)($|\\n)`, "i");
    const match = s.match(reg);
    if (!match) return null;
    return (
      <div key={i} className="script-row">
        <strong>{lab}:</strong>
        <span>{match[1].trim()}</span>
      </div>
    );
  });

/* ----------  PAGE ---------- */
export default function HomePage() {
  const year = useMemo(()=>new Date().getFullYear(),[]);
  return (
    <>
      <Head>
        <title>{SITE_NAME} – {SITE_TAGLINE}</title>
        <meta name="description" content={SITE_DESC}/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet"/>
      </Head>

      {/* ------------ NAV ------------- */}
      <nav className="nav">
        <div className="logo">{MAIN}{SECOND && <span>{SECOND}</span>}</div>
        <Link href="/builder" className="btn ghost">Builder</Link>
      </nav>

      {/* ------------ HERO ------------- */}
      <header className="hero">
        <h1>Stop Bikin Konten Jualan <span className="hl">Ngebosenin</span>.</h1>
        <p>{SITE_NAME} bantu kamu bikin <span className="hl">visual hook, teks pembuka, skrip & ide frame</span> yang nancep di detik pertama.</p>
        <Link href="/builder" className="btn primary">🚀 Mulai Buat Skrip</Link>
      </header>

      {/* ------------ FEATURES ------------- */}
      <section className="section">
        <h2>Kenapa {SITE_NAME}?</h2>
        <div className="grid g3">
          {FEATURES.map((f,i)=>(
            <div key={i} className="card feature">
              <span className="icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------ PERSONA ------------- */}
      <section className="section dark">
        <h2>Kamu Siapa di Dunia Konten?</h2>
        <div className="grid g3">
          <Link href="/builder?persona=ugc" className="card persona">
            <h3><span className="icon">🎭</span>UGC Creator</h3>
            <p>Portofolio nendang, dilirik brand.</p>
            <span className="cta">Mulai →</span>
          </Link>
          <Link href="/builder?persona=brand" className="card persona">
            <h3><span className="icon">🏢</span>Pemilik Brand</h3>
            <p>Naikkan konversi & penjualan.</p>
            <span className="cta">Mulai →</span>
          </Link>
          <Link href="/builder?persona=freelancer" className="card persona">
            <h3><span className="icon">💼</span>Freelancer/Agensi</h3>
            <p>Hemat riset, hasil cepat.</p>
            <span className="cta">Mulai →</span>
          </Link>
        </div>
      </section>

      {/* ------------ EXAMPLES ------------- */}
      <section className="section">
        <h2>Contoh Hasil {SITE_NAME}</h2>
        {EXAMPLES.map((ex,i)=>(
          <div key={i} className="card example">
            <header>
              <h4>"{ex._internalProductDesc}"</h4>
              <span className="tag">{ex._internalStyle}</span>
            </header>
            <div className="part"><b>Visual Hook</b><p>{ex.visualHook}</p></div>
            <div className="part"><b>Teks Hook</b><p>{ex.textHook}</p></div>
            <div className="part"><b>Skrip</b><div className="script">{formatScript(ex.script)}</div></div>
            <div className="part"><b>Saran Frame</b><div className="script">{formatFrames(ex.frames)}</div></div>
          </div>
        ))}
        <Link href="/builder" className="btn primary center">Coba Sendiri →</Link>
      </section>

      {/* ------------ FOOTER ------------- */}
      <footer className="footer">
        © {year} {SITE_NAME}. Bikin konten jualan nancep itu gampang!
      </footer>

      {/* ------------ STYLE ------------- */}
      <style jsx global>{`
        :root{
          --clr-primary:${PRIMARY_COLOR};
          --clr-bg:#000;
          --clr-card:#131313;
          --clr-text:#f0f0f0;
          --clr-muted:#b0b0b0;
          --radius:12px;
        }
        *,*::before,*::after{box-sizing:border-box;}
        body{margin:0;font-family:Inter,system-ui;background:var(--clr-bg);color:var(--clr-text)}
        a{text-decoration:none;color:inherit}

        /* buttons */
        .btn{display:inline-block;padding:.9rem 1.8rem;border-radius:6px;font-weight:700;transition:.2s}
        .btn.primary{background:var(--clr-primary);color:#000;box-shadow:0 4px 15px rgba(57,255,20,.3)}
        .btn.primary:hover{transform:translateY(-2px)}
        .btn.ghost{background:rgba(255,255,255,.06)}
        .btn.center{margin:3rem auto 0;display:block;width:max-content}

        /* nav */
        .nav{display:flex;justify-content:space-between;align-items:center;padding:1.2rem 1.6rem;background:#080808;position:sticky;top:0;z-index:50;border-bottom:1px solid #1a1a1a}
        .logo{font-size:1.5rem;font-weight:900;color:var(--clr-primary)}
        .logo span{color:var(--clr-text)}
        
        /* hero */
        .hero{text-align:center;padding:4rem 1.5rem;position:relative}
        .hero::before{content:"";position:absolute;inset:0;background:radial-gradient(circle,var(--clr-primary)12%,transparent 60%);opacity:.05;pointer-events:none}
        .hero h1{font-size:2.2rem;font-weight:900;margin-bottom:1.2rem}
        .hero p{max-width:640px;margin:0 auto 2rem;line-height:1.7;color:var(--clr-muted)}
        .hl{color:var(--clr-primary)}

        /* sections */
        .section{padding:4rem 1.5rem}
        .section.dark{background:#000}
        .section h2{text-align:center;font-size:2rem;margin-bottom:2.5rem}

        /* grid */
        .grid{display:grid;gap:1.5rem}
        .g3{grid-template-columns:1fr}
        @media(min-width:768px){.g3{grid-template-columns:repeat(3,1fr)}}

        /* cards */
        .card{background:var(--clr-card);border:1px solid #222;border-radius:var(--radius);padding:2rem 1.5rem;transition:.25s}
        .card:hover{transform:translateY(-4px);border-color:var(--clr-primary)}
        .feature .icon{font-size:2.4rem;margin-bottom:1.2rem}
        .feature h3{font-size:1.25rem;margin-bottom:.7rem}
        .feature p{color:var(--clr-muted);line-height:1.6}

        .persona{color:var(--clr-text);display:flex;flex-direction:column;height:100%}
        .persona h3{font-size:1.25rem;margin-bottom:1rem}
        .persona .icon{margin-right:.4rem}
        .persona p{color:var(--clr-muted);flex-grow:1;line-height:1.6;margin-bottom:1rem}
        .persona .cta{color:var(--clr-primary);font-weight:700}

        /* example */
        .example header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;border-bottom:1px solid #222;padding-bottom:.8rem}
        .example h4{font-size:1.1rem;margin:0}
        .tag{background:rgba(57,255,20,.12);color:var(--clr-primary);padding:.25rem .6rem;border-radius:16px;font-size:.8rem}
        .part{margin-top:1.2rem}
        .part b{display:block;color:var(--clr-primary);margin-bottom:.4rem}
        .script{border-left:3px solid var(--clr-primary);padding-left:.8rem;background:#151515}
        .script-row{margin-bottom:1rem;line-height:1.6}
        .script-row strong{color:var(--clr-primary);display:block;margin-bottom:.2rem}

        /* footer */
        .footer{text-align:center;padding:3rem 1.5rem;border-top:1px solid #1a1a1a;color:var(--clr-muted)}

        /* responsive tweaks */
        @media(max-width:480px){
          .hero h1{font-size:1.6rem}
          .section{padding:3rem 1rem}
        }
      `}</style>
    </>
  );
}
