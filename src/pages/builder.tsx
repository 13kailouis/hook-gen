// src/pages/builder.tsx
import Head            from "next/head";
import Link            from "next/link";
import { useRouter }   from "next/router";
import { useState,useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { FiCopy,FiCheck } from "react-icons/fi";

/* -------------------------------------------------- */
/* ❶  DESIGN TOKEN—semua bisa di-override via .env    */
/* -------------------------------------------------- */
const TOKENS = {
  BRAND          : process.env.NEXT_PUBLIC_SITE_NAME   || "HookFreak",
  COLOR_PRIMARY  : process.env.NEXT_PUBLIC_PRIMARY     || "#39ff14",
  COLOR_BG       : process.env.NEXT_PUBLIC_BG          || "#000",
  COLOR_CARD     : process.env.NEXT_PUBLIC_CARD        || "#131313",
  COLOR_TEXT     : process.env.NEXT_PUBLIC_TEXT        || "#f0f0f0",
  COLOR_MUTED    : process.env.NEXT_PUBLIC_MUTED       || "#a0a0a0",
  RADIUS         : Number(process.env.NEXT_PUBLIC_RADIUS) || 12,
  SHADOW_ELEVATE : process.env.NEXT_PUBLIC_SHADOW      || "0 4px 15px rgba(57,255,20,.35)",
  MAX_WIDTH      : Number(process.env.NEXT_PUBLIC_MAXW)   || 820,   // konten max-width
};

/* -------------------------------------------------- */
/* ❷  TIPE DATA                                       */
/* -------------------------------------------------- */
type SalesAlternative = {
  visualHook : string;
  textHook   : string;
  script     : string;
  frames     : string;
};

/* -------------------------------------------------- */
/* ❸  HELPER                                          */
/* -------------------------------------------------- */
const LABEL = ["Hook", "Problem", "Agitation", "Solution", "CTA"];

const fmt = (s: string) =>
  s.split(" -- ").map((p, i) => {
    const text = p.replace(new RegExp(`^${LABEL[i]}\\s*:`, "i"), "").trim();
    return (
      <div key={i} className="sr">
        <strong>{LABEL[i]}:</strong>
        <p>{text}</p>
      </div>
    );
  });

const fmtFrame = (s: string) =>
  LABEL.map((lab, i) => {
    const reg = new RegExp(`${lab}\\s*:(.*?)($|\\n)`, "i");
    const match = s.match(reg);
    if (!match) return null;
    return (
      <li key={i} className="sr">
        <strong>{lab}:</strong>
        <p>{match[1].trim()}</p>
      </li>
    );
  });

/* -------------------------------------------------- */
/* ❹  COMPONENT                                       */
/* -------------------------------------------------- */
export default function Builder(){
  const router = useRouter();
  const { query, isReady } = router;
  const { user, loading:authLoading, logout } = useAuth();

  useEffect(()=>{
    if(!authLoading && !user){
      window.location.href = `/login?next=/builder`;
    }
  },[authLoading,user]);

  if(authLoading || !user) return null;

  /* form state */
  const [product ,setProd ]=useState("");
  const [aud     ,setAud  ]=useState("");
  const [style   ,setStyle]=useState("storytelling");
  const [dur     ,setDur  ]=useState(30);
  /* ui state */
  const [loading ,setLoad ]=useState(false);
  const [error   ,setErr  ]=useState<string|null>(null);
  const [alts    ,setAlts ]=useState<SalesAlternative[]|null>(null);
  const [copied  ,setCopy ]=useState<number|null>(null);

  /* Prefill */
  useEffect(()=>{
    if(!isReady) return;
    const p=query.persona as string|undefined;
    if(p==="ugc")        setStyle("storytelling");
    else if(p==="brand") setStyle("soft-sell");
    else if(p==="freelancer") setStyle("hard-sell");
  },[isReady,query]);

  /* Generate */
  async function generate(e:React.FormEvent){
    e.preventDefault();
    setLoad(true); setErr(null); setAlts(null);
    try{
      const r=await fetch("/api/generate-script",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({description:product,audience:aud,style,duration:dur})
      });
      if(!r.ok) throw new Error((await r.json()).error||`Error ${r.status}`);
      const d=await r.json();
      setAlts(d.alternatives||[]);
    }catch(err:any){setErr(err.message);}
    finally{setLoad(false);}
  }

  /* Copy */
  const toClipboard=(t:string,i:number)=>{
    navigator.clipboard.writeText(t);
    setCopy(i); setTimeout(()=>setCopy(null),1400);
  };

  const doLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout failed', err);
    } finally {
      router.replace('/login?next=/builder');
    }
  };

  /* -------------------------------------------------- */
  return(
    <>
      <Head>
        <title>Builder – {TOKENS.BRAND}</title>
        <meta name="description" content="Generate hook, script & frame ideas in seconds."/>
        <meta name="viewport"   content="width=device-width, initial-scale=1"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet"/>
      </Head>

      {/* ---------- NAV ---------- */}
      <nav className="nav">
        <div className="logo">{TOKENS.BRAND}</div>
        <div>
          <Link href="/" className="btn ghost" aria-label="Back to home" style={{marginRight:'0.5rem'}}>← Home</Link>
          <button onClick={doLogout} className="btn ghost">Logout</button>
        </div>
      </nav>

      <main className="wrap" style={{maxWidth:TOKENS.MAX_WIDTH}}>
        {/* ---------- HERO ---------- */}
        <header className="hero">
          <h1>Bikin Skrip Jualan <span className="hl">Sekilat</span></h1>
          <p>Isi form → dapat <strong>3</strong> skrip siap pakai.</p>
        </header>

        {/* ---------- FORM ---------- */}
        <form onSubmit={generate} className="form card" aria-label="Hook generator form">
          <label htmlFor="prod">Deskripsi Produk/Jasa</label>
          <input id="prod" value={product} onChange={e=>setProd(e.target.value)}
                 placeholder="Serum pencerah Niacinamide 10%" />

          <label htmlFor="aud">Target Audiens</label>
          <input id="aud" value={aud}    onChange={e=>setAud(e.target.value)}
                 placeholder="Wanita 20-35 th, kulit kusam" />

          <label htmlFor="sty">Gaya Konten</label>
          <select id="sty" value={style} onChange={e=>setStyle(e.target.value)}>
            {["storytelling","soft-sell","hard-sell","humor","shock","fomo","edukatif","problem-solution","testimonial","unboxing"]
              .map(v=><option key={v} value={v}>{v.replace("-"," ").toUpperCase()}</option>)}
          </select>

          <label htmlFor="dur">Durasi Maksimum</label>
          <select id="dur" value={dur} onChange={e=>setDur(+e.target.value)}>
            {[15,30,60].map(v => (
              <option key={v} value={v}>{v} detik</option>
            ))}
          </select>

          <button className="btn primary" disabled={loading} aria-busy={loading}>
            {loading?"⏳ Generating…":"🚀 Buat Skrip"}
          </button>

          {error && <p role="alert" className="err">{error}</p>}
        </form>

        {/* ---------- RESULT ---------- */}
        {alts && (
          <section className="results" aria-live="polite">
            <h2>3 Skrip Siap Pakai</h2>
            {alts.map((a,i)=>(
              <article key={i} className="card alt">
                <header>
                  <h3>Alternatif {i+1}</h3>
                  <button onClick={()=>toClipboard(a.script,i)} className="copy"
                          aria-label={copied===i?"Copied":"Copy script"}>
                    {copied===i ? <FiCheck size={18}/> : <FiCopy size={18}/> }
                  </button>
                </header>

                <div className="part"><b>🎨 Visual Hook</b><p>{a.visualHook}</p></div>
                <div className="part"><b>💬 Teks Hook</b><p>{a.textHook}</p></div>
                <div className="part"><b>📝 Skrip</b><div className="script">{fmt(a.script)}</div></div>
                <div className="part"><b>🎬 Frame</b><ul className="script-list">{fmtFrame(a.frames)}</ul></div>
              </article>
            ))}
          </section>
        )}
      </main>

      {/* ---------- STYLE (token based) ---------- */}
      <style jsx global>{`
        :root{
          --clr-primary:${TOKENS.COLOR_PRIMARY};
          --clr-bg:${TOKENS.COLOR_BG};
          --clr-card:${TOKENS.COLOR_CARD};
          --clr-text:${TOKENS.COLOR_TEXT};
          --clr-muted:${TOKENS.COLOR_MUTED};
          --radius:${TOKENS.RADIUS}px;
          --shadow:${TOKENS.SHADOW_ELEVATE};
        }
        *{box-sizing:border-box}
        body{margin:0;font-family:Inter,system-ui;background:var(--clr-bg);color:var(--clr-text)}
        a{text-decoration:none;color:inherit}
        .hl{color:var(--clr-primary)}
        .btn{display:inline-block;padding:.85rem 1.6rem;border-radius:6px;font-weight:700;transition:.2s}
        .btn.primary{background:var(--clr-primary);color:#000;box-shadow:var(--shadow)}
        .btn.ghost{background:rgba(255,255,255,.07)}
        .btn.primary:disabled{opacity:.6;cursor:not-allowed}

        .nav{display:flex;justify-content:space-between;align-items:center;
             padding:1.15rem 1.4rem;background:#080808;position:sticky;top:0;
             border-bottom:1px solid #1a1a1a;z-index:60}
        .logo{font-weight:900;font-size:1.4rem;color:var(--clr-primary)}

        .wrap{margin:0 auto;padding:4rem 1rem}
        .hero{text-align:center;margin-bottom:3rem}
        .hero h1{font-size:2rem;font-weight:900;margin:.4rem 0}
        .hero p{color:var(--clr-muted)}

        .card{background:var(--clr-card);border:1px solid #242424;border-radius:var(--radius);
              padding:2rem 1.6rem;transition:.25s}
        .card:hover{border-color:var(--clr-primary)}

        .form{display:flex;flex-direction:column;gap:1.2rem}
        .form input,.form select{
          width:100%;padding:.82rem;border-radius:6px;border:1px solid #333;
          background:#0b0b0b;color:var(--clr-text)
        }
        .err{color:#ff6b6b;margin-top:1rem;text-align:center}

        .results h2{text-align:center;margin:4rem 0 2rem;font-size:1.5rem}
        .alt header{display:flex;justify-content:space-between;align-items:center;margin-bottom:.9rem}
        .copy{background:none;border:none;color:var(--clr-text);cursor:pointer}

        .part{margin-top:1.35rem}
        .part b{display:block;color:var(--clr-primary);margin-bottom:.35rem}
        .script{border-left:3px solid var(--clr-primary);padding-left:.9rem;background:#151515}
        .script-list{list-style:none;margin:0;border-left:3px solid var(--clr-primary);padding-left:.9rem;background:#151515}
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
