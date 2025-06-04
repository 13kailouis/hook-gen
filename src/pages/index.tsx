// src/pages/index.tsx
import Head from "next/head";
import { useState, useRef } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import Link from "next/link";
import { SalesAlternative } from "@/lib/groq"; // Import SalesAlternative

// Helper function to format script for display on landing page
const formatScriptForLandingDisplay = (script: string) => {
  return script.split(" -- ").map((part, index) => {
    let label = "";
    if (index === 0) label = "Hook";
    else if (index === 1) label = "Problem";
    else if (index === 2) label = "Agitation";
    else if (index === 3) label = "Solution";
    else if (index === 4) label = "CTA";
    
    const contentPart = part.trim();
    return (
      <div key={index} style={{ marginBottom: '0.5em' }}>
        {label && <strong style={{ color: 'var(--highlight-color)' }}>{label}: </strong>}
        <span>{contentPart.length > 100 ? contentPart.substring(0, 97) + "..." : contentPart}</span>
      </div>
    );
  });
};


export default function HomePage() {
  const [productInput, setProductInput] = useState("");
  const [styleInput, setStyleInput] = useState("storytelling");
  const [durationInput, setDurationInput] = useState(30);
  const [loading, setLoading] = useState(false); //
  const [firstResult, setFirstResult] = useState<SalesAlternative | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null); //

  async function handleQuickGenerate(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setLoading(true); //
    setFirstResult(null);
    setError(null);
    try {
      const r = await fetch("/api/generate-script", { //
        method: "POST", //
        headers: { "Content-Type": "application/json" }, //
        body: JSON.stringify({ //
          description: productInput,
          audience: "",
          style: styleInput,
          duration: durationInput,
        }),
      });
      if (!r.ok) {
        const errData = await r.json();
        throw new Error(errData.error || `Error ${r.status}`);
      }
      const data = await r.json(); //
      if (data.alternatives && data.alternatives.length > 0) { //
        setFirstResult(data.alternatives[0]); //
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth" }); //
        }, 100);
      } else {
        setError("Gagal mendapatkan hasil. Coba lagi yuk!");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false); //
    }
  }

  const copyQuick = () => {
    if (!firstResult) return;
    navigator.clipboard.writeText(firstResult.script);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const exampleOutputs: SalesAlternative[] = [
    {
      visualHook: "Close-up wajah kaget melihat jerawat baru di cermin, lalu zoom out cepat.",
      textHook: "Baru bangun udah disambut 'kejutan' di muka? Relate banget!",
      script: "Hook: Baru bangun udah disambut 'kejutan' di muka? Relate banget! Udah coba ini-itu tapi si merah nongol lagi, nongol lagi. -- Problem: Padahal besok ada acara penting, mau ketemu doi, atau sekadar pengen selfie cantik tanpa filter. Jerawat satu biji aja bisa bikin mood ancur seharian. -- Agitation: Makin dipikirin makin stres, makin stres jerawat makin menjadi-jadi. Lingkaran setan yang gak ada habisnya kan? Mau sampai kapan ngumpetin muka atau ngandelin filter terus? -- Solution: Stop siklusnya sekarang! Kenalin AcneWarrior Serum, jagoan hempas jerawat dalam semalam. Dengan Salicylic Acid & Centella Asiatica, langsung nenangin dan kempesin jerawat tanpa bikin kulit kering. -- CTA: Muka glowing bebas drama jerawat bukan mimpi lagi! Klik link di bio buat dapetin AcneWarrior Serum-mu sekarang juga! Ada promo spesial buat kamu yang gercep!",
      frames: "Hook: Wajah kaget di cermin (close-up), lalu transisi ke kalender menandai acara penting. Problem: Shot tangan frustasi memegang beberapa produk skincare gagal. Agitation: Scroll konten IG/TikTok orang lain yang flawless, lalu kembali ke wajah sendiri yang insecure. Solution: Unboxing AcneWarrior Serum, tekstur serum di tangan, aplikasi lembut di wajah, senyum puas. CTA: Pegang produk, tunjuk ke arah link di bio, wajah happy.",
      _internalStyle: "Storytelling", _internalAudience: "Remaja & Dewasa Muda", _internalProductDesc: "Serum Anti Jerawat"
    },
    {
      visualHook: "Tumpahan kopi di baju putih bersih, ekspresi panik.",
      textHook: "NOOO! Baju favorit kena noda pas mau ngedate?!",
      script: "Hook: NOOO! Baju favorit kena noda pas mau ngedate?! Jangan panik dulu! -- Problem: Noda bandel emang nyebelin, apalagi di momen penting. Mau cuci biasa, takutnya malah makin nyebar atau warnanya luntur. -- Agitation: Udah coba berbagai sabun tapi nodanya tetap aja nempel kayak kenangan mantan? Bikin bete dan gak pede kan jadinya. -- Solution: Kenalin Spotless Pen! Solusi praktis basmi noda dalam sekejap. Tinggal oles, gosok dikit, noda hilang tanpa bekas! Aman buat semua jenis kain. -- CTA: Jangan biarin noda ngerusak harimu! Sedia Spotless Pen sekarang juga. Klik keranjang kuning buat harga spesial!",
      frames: "Hook: Slow motion tumpahan kopi, close up ekspresi panik. Problem: Shot baju dengan noda membandel, orangnya keliatan bingung. Agitation: Kompilasi usaha gagal membersihkan noda (misal disikat, dikucek), ekspresi makin frustasi. Solution: Demo penggunaan Spotless Pen, noda hilang dengan mudah. Baju kembali bersih. Senyum lega. CTA: Tunjukkan produk Spotless Pen, arahkan ke CTA (misal keranjang kuning), wajah ceria.",
      _internalStyle: "Problem-Solution", _internalAudience: "Siapa saja yang sering berurusan dengan noda", _internalProductDesc: "Pena Penghilang Noda Instan"
    },
    {
        visualHook: "Layar HP menampilkan saldo e-wallet tinggal sedikit, diiringi suara 'kriuk' dompet kosong.",
        textHook: "Tanggal tua gini, pengen jajan enak tapi dompet gak bersahabat?",
        script: "Hook: Tanggal tua gini, pengen jajan enak tapi dompet gak bersahabat? Tenang, ada solusinya! -- Problem: Siapa sih yang gak pengen makan enak tiap hari? Tapi kadang budget terbatas, apalagi di akhir bulan. Masak sendiri ribet, beli di luar mahal. -- Agitation: Akhirnya cuma bisa nelen ludah liatin postingan makanan enak di sosmed. Atau terpaksa makan mie instan lagi, lagi, dan lagi. Sedih banget kan? -- Solution: Nih, cobain 'Resep Hemat Akhir Bulan' dari buku masak digital kita! Isinya puluhan resep enak, gampang dibuat, bahannya murah meriah, tapi rasa bintang lima! -- CTA: Gak perlu lagi sengsara di tanggal tua! Dapetin e-book 'Resep Hemat Akhir Bulan' sekarang juga cuma Rp 20 ribuan! Klik link di bio ya!",
        frames: "Hook: Close up layar HP saldo tipis, lalu gestur tangan menepuk dompet kosong. Problem: Orang scroll gambar makanan enak di HP dengan wajah sedih. Agitation: Scene makan mie instan dengan lesu. Solution: Tampilan cover e-book resep, cuplikan beberapa foto masakan dari e-book. Orang memasak dengan gembira. CTA: Tunjukkan mock-up e-book, teks harga spesial, arahkan ke link di bio.",
        _internalStyle: "Humor", _internalAudience: "Anak kost, karyawan, siapa saja yang butuh ide masak hemat", _internalProductDesc: "E-book Resep Masakan Hemat"
    }
  ];


  return (
    <>
      <Head>
        <title>HookFreak – Video Sales Hook Builder (TikTok, Reels, Shorts)</title>
        <meta name="description" content="Bikin skrip video jualan TikTok, Reels, dan Shorts yang nancep di detik pertama. Hasilkan visual hook, teks pembuka, skrip sesuai durasi, dan saran frame dalam 1 klik!" />
        <meta name="keywords" content="video sales hook, tiktok script generator, reels script, shorts script, content creator tool, marketing video, hook generator" />
        <link rel="preconnect" href="https://fonts.googleapis.com" /> {/* */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /> {/* */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
      </Head>

      {/* Navbar Minimal untuk Landing Page */}
      <nav className="landing-nav">
        <div className="nav-logo">Hook<span>Freak</span></div>
        <div className="nav-actions">
          <Link href="/builder" className="nav-link">Builder Lengkap</Link>
          {/* <a href="#pricing" className="nav-link login-link">Harga & Login</a> */}
        </div>
      </nav>

      <main className="landing-main">
        <section className="hero-new">
          <div className="hero-content-new">
            <h1>Stop Bikin Konten Jualan <span className="highlight">Ngebosenin</span>.</h1>
            <p className="subheadline">HookFreak bantu kamu bikin <strong className="highlight">visual hook, teks pembuka, skrip sesuai durasi, dan ide frame</strong> video TikTok & Reels yang nancep di detik pertama. Sekali klik, tiga alternatif langsung jadi!</p>
            <form onSubmit={handleQuickGenerate} className="hero-form">
              <input
                type="text"
                value={productInput}
                onChange={(e) => setProductInput(e.target.value)}
                placeholder="Apa yang kamu jual? (Mis: Kopi Susu Gula Aren)"
              />
              <select value={styleInput} onChange={(e) => setStyleInput(e.target.value)}>
                <option value="storytelling">Gaya: Storytelling</option>
                <option value="soft-sell">Gaya: Soft Sell</option>
                <option value="hard-sell">Gaya: Hard Sell</option>
                <option value="humor">Gaya: Humor</option>
                <option value="shock">Gaya: Shock</option>
                <option value="fomo">Gaya: FOMO</option>
                <option value="edukatif">Gaya: Edukatif</option>
              </select>
              <select value={durationInput} onChange={(e) => setDurationInput(parseInt(e.target.value))}>
                <option value={15}>Durasi: 15 detik</option>
                <option value={30}>Durasi: 30 detik</option>
                <option value={60}>Durasi: 60 detik</option>
              </select>
              <button type="submit" disabled={loading}>
                {loading ? "Lagi Diracik..." : "🧪 Lihat Hasil Nyata (Gratis!)"}
              </button>
            </form>
            {error && <p className="error-message-hero">{error}</p>}
          </div>
        </section>

        {firstResult && ( //
          <section ref={resultsRef} className="quick-results-display">  {/* */}
            <h2>✨ Ini Satu Ide Segar Buatmu:</h2>
            <div className="alternative-card-landing" style={{position:'relative'}}>
              <button className="copy-button" aria-label="Copy script" onClick={copyQuick} style={{position:'absolute',top:'16px',right:'16px'}}>
                {copied ? <FiCheck size={18}/> : <FiCopy size={18}/>}
              </button>
              <div className="result-section-landing">
                <strong>🎨 Visual Hook Ciamik:</strong>
                <p>{firstResult.visualHook}</p>
              </div>
              <div className="result-section-landing">
                <strong>💬 Teks Hook Nendang:</strong>
                <p>{firstResult.textHook}</p>
              </div>
              <div className="result-section-landing">
                <strong>📝 Skrip Singkat & Padat:</strong>
                <div className="script-display-landing">{formatScriptForLandingDisplay(firstResult.script)}</div>
              </div>
              <div className="result-section-landing">
                <strong>🎬 Ide Frame Anti Ribet:</strong>
                <p style={{whiteSpace: 'pre-line'}}>{firstResult.frames.substring(0,250)}...</p>
              </div>
            </div>
            <div className="more-options">
              <p>Suka? Ada 2 alternatif lain & fitur canggih menantimu di Builder!</p>
              <Link href={`/builder?product=${encodeURIComponent(productInput)}&style=${styleInput}`} className="cta-button-primary">
                🚀 Buka Builder Lengkap (Lihat Semua Hasil & Kustomisasi)
              </Link>
              <button onClick={() => handleQuickGenerate()} disabled={loading} className="cta-button-secondary">
                {loading ? "Tunggu ya..." : "Coba Generate Lagi (Input Beda)"}
              </button>
              {/* <p style={{marginTop: '1rem', fontSize: '0.9em'}}>
                <Link href="/pricing" className="link-subtle">Unlock export & batch builder untuk jadi pro!</Link>
              </p> */}
            </div>
          </section>
        )}

        <section className="persona-cta-section">
          <h2>Kamu Siapa di Dunia Konten?</h2>
          <div className="persona-grid">
            <Link href="/builder?persona=ugc" className="persona-card">
              <h3>Saya UGC Creator</h3>
              <p>Bikin portofolio nendang, dilirik banyak brand.</p>
              <span>Mulai Disini &rarr;</span>
            </Link>
            <Link href="/builder?persona=brand" className="persona-card">
              <h3>Saya Pemilik Brand</h3>
              <p>Tingkatin konversi iklan, engagement, & penjualan.</p>
              <span>Mulai Disini &rarr;</span>
            </Link>
            <Link href="/builder?persona=freelancer" className="persona-card">
              <h3>Saya Freelancer/Agensi</h3>
              <p>Hemat waktu riset, puaskan klien dengan hasil cepat & kreatif.</p>
              <span>Mulai Disini &rarr;</span>
            </Link>
          </div>
        </section>

        <section className="examples-section">
          <h2>Contoh Hasil Nyata dari HookFreak:</h2>
          {exampleOutputs.map((ex, idx) => ( 
            <div key={idx} className="example-output-card">
               <h4>Contoh untuk: "{ex._internalProductDesc}" (Gaya: {ex._internalStyle})</h4>
              <div className="example-part"><strong>Visual Hook:</strong> <p>{ex.visualHook}</p></div>
              <div className="example-part"><strong>Teks Hook:</strong> <p>{ex.textHook}</p></div>
              <div className="example-part"><strong>Skrip (Singkat):</strong> {formatScriptForLandingDisplay(ex.script)}</div>
              <div className="example-part"><strong>Saran Frame (Awal):</strong> <p>{ex.frames.substring(0,150)}...</p></div>
            </div>
          ))}
          <div style={{textAlign: 'center', marginTop: '1.5rem'}}>
            <Link href="/builder" className="cta-button-primary">Penasaran? Coba Sendiri di Builder!</Link>
          </div>
        </section>

        <footer className="landing-footer">
          <p>&copy; {new Date().getFullYear()} HookFreak. Bikin konten jualan nancep itu gampang!</p>
          {/* <a href="/privacy">Kebijakan Privasi</a> | <a href="/terms">Syarat Ketentuan</a> */}
        </footer>
      </main>

      <style jsx>{`
        // General Landing Styles
        .landing-nav { display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; background: #080808; border-bottom: 1px solid #1a1a1a; position: sticky; top: 0; z-index: 100;}
        .nav-logo { font-size: 1.8rem; font-weight: 900; color: var(--highlight-color); }
        .nav-logo span { color: #f0f0f0; }
        .nav-actions .nav-link { color: #f0f0f0; text-decoration: none; margin-left: 1.5rem; font-weight: 500; }
        .nav-actions .nav-link:hover { color: var(--highlight-color); }
        .landing-main { font-family: 'Inter', sans-serif; background-color: #000; color: #f0f0f0; padding-top: 0;}
        .highlight { color: var(--highlight-color); }

        // Hero Section
        .hero-new { text-align: center; padding: 4rem 2rem 3rem; background: linear-gradient(180deg, #080808 0%, #000000 100%); }
        .hero-content-new h1 { font-size: 2.8rem; font-weight: 900; margin-bottom: 1rem; line-height: 1.2; }
        .hero-content-new .subheadline { font-size: 1.1rem; color: #b0b0b0; max-width: 700px; margin: 0 auto 2rem; line-height: 1.7; }
        .hero-form { display: flex; flex-direction: column; gap: 1rem; max-width: 600px; margin: 0 auto; background: #0a0a0a; padding: 2rem; border-radius: 12px; box-shadow: 0 8px 24px rgba(0, 255, 106, 0.1); }
        .hero-form input, .hero-form select { padding: 0.9rem; border-radius: 8px; border: 1px solid #333; background: #111; color: #f0f0f0; font-size: 1rem; }
        .hero-form input:focus, .hero-form select:focus { border-color: var(--highlight-color); outline: none; box-shadow: 0 0 0 2px rgba(57, 255, 20, 0.3); }
        .hero-form button { padding: 1rem; background: var(--highlight-color); color: #000; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: 700; cursor: pointer; transition: background-color 0.2s ease; }
        .hero-form button:hover { background-color: #2ecc71; }
        .hero-form button:disabled { background-color: #555; opacity:0.7; cursor: not-allowed; }
        .error-message-hero { color: #ff4d4d; margin-top: 1rem; }

        // Quick Results Display
        .quick-results-display { padding: 3rem 2rem; text-align: center; background: #050505; }
        .quick-results-display h2 { font-size: 2rem; margin-bottom: 2rem; }
        .alternative-card-landing { background: #111; border: 1px solid #222; border-radius: 12px; padding: 2rem; margin-bottom: 2rem; text-align: left; max-width: 700px; margin-left: auto; margin-right: auto; box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
        .result-section-landing { margin-bottom: 1.5rem; }
        .result-section-landing strong { display: block; margin-bottom: 0.5rem; color: var(--highlight-color); font-size: 1.1rem; }
        .result-section-landing p, .result-section-landing div { color: #ccc; line-height: 1.6; }
        .script-display-landing span { display: block; margin-bottom: 0.3em;}
        .more-options { margin-top: 1.5rem; }
        .more-options p { margin-bottom: 1rem; color: #aaa; }
        .cta-button-primary { display: inline-block; background: var(--highlight-color); color: #000; padding: 0.8rem 1.8rem; border-radius: 8px; text-decoration: none; font-weight: 700; margin-right: 1rem; transition: transform 0.2s, background-color 0.2s; margin-bottom: 0.5rem; }
        .cta-button-primary:hover { transform: translateY(-2px); background-color: #2ecc71; }
        .cta-button-secondary { display: inline-block; background: transparent; border: 2px solid var(--highlight-color); color: var(--highlight-color); padding: 0.8rem 1.8rem; border-radius: 8px; font-weight: 700; cursor: pointer; transition: background-color 0.2s, color 0.2s; margin-bottom: 0.5rem;}
        .cta-button-secondary:hover { background-color: var(--highlight-color); color: #000; }
        .cta-button-secondary:disabled { opacity:0.6; cursor:not-allowed; border-color: #555; color: #555;}
        .link-subtle { color: #777; text-decoration: none; }
        .link-subtle:hover { color: #aaa; text-decoration: underline; }


        // Persona CTA Section
        .persona-cta-section { padding: 4rem 2rem; text-align: center; background: #000; }
        .persona-cta-section h2 { font-size: 2.2rem; margin-bottom: 2.5rem; }
        .persona-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; max-width: 900px; margin: 0 auto; }
        .persona-card { background: #0f0f0f; border: 1px solid #222; padding: 2rem 1.5rem; border-radius: 12px; text-decoration: none; color: #f0f0f0; transition: transform 0.2s ease, box-shadow 0.2s ease; text-align: left;}
        .persona-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(57, 255, 20, 0.15); }
        .persona-card h3 { font-size: 1.5rem; color: var(--highlight-color); margin-top: 0; margin-bottom: 0.5rem; }
        .persona-card p { font-size: 1rem; color: #aaa; margin-bottom: 1rem; line-height:1.6; }
        .persona-card span { font-weight: 700; color: var(--highlight-color); }

        // Examples Section
        .examples-section { padding: 4rem 2rem; background: #080808; }
        .examples-section h2 { text-align: center; font-size: 2.2rem; margin-bottom: 2.5rem; }
        .example-output-card { background: #111; border: 1px solid #222; padding: 2rem; border-radius: 12px; margin-bottom: 2rem; max-width: 700px; margin-left: auto; margin-right: auto; text-align:left; }
        .example-output-card h4 { margin-top: 0; color: #eee; font-size: 1.2rem; margin-bottom: 1.5rem;}
        .example-part { margin-bottom: 1rem; }
        .example-part strong { color: var(--highlight-color); font-size: 1.05rem; display:block; margin-bottom:0.3rem;}
        .example-part p, .example-part div { color: #ccc; line-height: 1.6; margin-top: 0.1rem; }

        // Footer
        .landing-footer { text-align: center; padding: 3rem 2rem; background: #000; border-top: 1px solid #1a1a1a; }
        .landing-footer p { color: #777; margin: 0; }
        .landing-footer a { color: #888; text-decoration: none; margin: 0 0.5rem; }
        .landing-footer a:hover { color: var(--highlight-color); }

        @media (max-width: 768px) {
          .hero-content-new h1 { font-size: 2.2rem; }
          .hero-content-new .subheadline { font-size: 1rem; }
          .hero-form { padding: 1.5rem; }
          .persona-grid { grid-template-columns: 1fr; }
          .nav-actions .nav-link { margin-left: 1rem; font-size: 0.9rem;}
          .nav-logo {font-size: 1.5rem;}
          .cta-button-primary, .cta-button-secondary { width:100%; margin-right:0; margin-left:0; box-sizing:border-box;}
        }
      `}</style>
    </>
  );
}
