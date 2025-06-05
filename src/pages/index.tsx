// src/pages/index.tsx
import Head from "next/head";
import Link from "next/link";
import { SalesAlternative } from "@/lib/groq";

// Helper to format script parts for examples
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
      <div key={index} className="script-part">
        {label && (
          <strong className="script-label">{label}: </strong>
        )}
        <span className="script-content">
          {contentPart}
        </span>
      </div>
    );
  });
};

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "HookFreak";
const [MAIN_NAME, SECOND_NAME] = SITE_NAME.split(" ");

const features = [
  {
    title: "3 Alternatif Sekali Klik",
    desc: "Setiap generate memberi tiga skrip berbeda siap pakai.",
    icon: "💡"
  },
  {
    title: "Ide Visual & Frame",
    desc: "Tidak cuma teks, dapatkan saran visual hook dan alur frame.",
    icon: "🎬"
  },
  {
    title: "Durasi Fleksibel",
    desc: "Atur panjang skrip 15-60 detik sesuai kebutuhan kontenmu.",
    icon: "⏱️"
  },
];

const exampleOutputs: SalesAlternative[] = [
  {
    visualHook: "Close-up wajah kaget melihat jerawat baru di cermin, lalu zoom out cepat.",
    textHook: "Baru bangun udah disambut 'kejutan' di muka? Relate banget!",
    script:
      "Hook: Baru bangun udah disambut 'kejutan' di muka? Relate banget! Udah coba ini-itu tapi si merah nongol lagi, nongol lagi. -- Problem: Padahal besok ada acara penting, mau ketemu doi, atau sekadar pengen selfie cantik tanpa filter. Jerawat satu biji aja bisa bikin mood ancur seharian. -- Agitation: Makin dipikirin makin stres, makin stres jerawat makin menjadi-jadi. Lingkaran setan yang gak ada habisnya kan? Mau sampai kapan ngumpetin muka atau ngandelin filter terus? -- Solution: Stop siklusnya sekarang! Kenalin AcneWarrior Serum, jagoan hempas jerawat dalam semalam. Dengan Salicylic Acid & Centella Asiatica, langsung nenangin dan kempesin jerawat tanpa bikin kulit kering. -- CTA: Muka glowing bebas drama jerawat bukan mimpi lagi! Klik link di bio buat dapetin AcneWarrior Serum-mu sekarang juga! Ada promo spesial buat kamu yang gercep!",
    frames:
      "Hook: Wajah kaget di cermin (close-up), lalu transisi ke kalender menandai acara penting. Problem: Shot tangan frustasi memegang beberapa produk skincare gagal. Agitation: Scroll konten IG/TikTok orang lain yang flawless, lalu kembali ke wajah sendiri yang insecure. Solution: Unboxing AcneWarrior Serum, tekstur serum di tangan, aplikasi lembut di wajah, senyum puas. CTA: Pegang produk, tunjuk ke arah link di bio, wajah happy.",
    _internalStyle: "Storytelling",
    _internalAudience: "Remaja & Dewasa Muda",
    _internalProductDesc: "Serum Anti Jerawat",
  },
  {
    visualHook: "Tumpahan kopi di baju putih bersih, ekspresi panik.",
    textHook: "NOOO! Baju favorit kena noda pas mau ngedate?!",
    script:
      "Hook: NOOO! Baju favorit kena noda pas mau ngedate?! Jangan panik dulu! -- Problem: Noda bandel emang nyebelin, apalagi di momen penting. Mau cuci biasa, takutnya malah makin nyebar atau warnanya luntur. -- Agitation: Udah coba berbagai sabun tapi nodanya tetap aja nempel kayak kenangan mantan? Bikin bete dan gak pede kan jadinya. -- Solution: Kenalin Spotless Pen! Solusi praktis basmi noda dalam sekejap. Tinggal oles, gosok dikit, noda hilang tanpa bekas! Aman buat semua jenis kain. -- CTA: Jangan biarin noda ngerusak harimu! Sedia Spotless Pen sekarang juga. Klik keranjang kuning buat harga spesial!",
    frames:
      "Hook: Slow motion tumpahan kopi, close up ekspresi panik. Problem: Shot baju dengan noda membandel, orangnya keliatan bingung. Agitation: Kompilasi usaha gagal membersihkan noda (misal disikat, dikucek), ekspresi makin frustasi. Solution: Demo penggunaan Spotless Pen, noda hilang dengan mudah. Baju kembali bersih. Senyum lega. CTA: Tunjukkan produk Spotless Pen, arahkan ke CTA (misal keranjang kuning), wajah ceria.",
    _internalStyle: "Problem-Solution",
    _internalAudience: "Siapa saja yang sering berurusan dengan noda",
    _internalProductDesc: "Pena Penghilang Noda Instan",
  },
  {
    visualHook: "Layar HP menampilkan saldo e-wallet tinggal sedikit, diiringi suara 'kriuk' dompet kosong.",
    textHook: "Tanggal tua gini, pengen jajan enak tapi dompet gak bersahabat?",
    script:
      "Hook: Tanggal tua gini, pengen jajan enak tapi dompet gak bersahabat? Tenang, ada solusinya! -- Problem: Siapa sih yang gak pengen makan enak tiap hari? Tapi kadang budget terbatas, apalagi di akhir bulan. Masak sendiri ribet, beli di luar mahal. -- Agitation: Akhirnya cuma bisa nelen ludah liatin postingan makanan enak di sosmed. Atau terpaksa makan mie instan lagi, lagi, dan lagi. Sedih banget kan? -- Solution: Nih, cobain 'Resep Hemat Akhir Bulan' dari buku masak digital kita! Isinya puluhan resep enak, gampang dibuat, bahannya murah meriah, tapi rasa bintang lima! -- CTA: Gak perlu lagi sengsara di tanggal tua! Dapetin e-book 'Resep Hemat Akhir Bulan' sekarang juga cuma Rp 20 ribuan! Klik link di bio ya!",
    frames:
      "Hook: Close up layar HP saldo tipis, lalu gestur tangan menepuk dompet kosong. Problem: Orang scroll gambar makanan enak di HP dengan wajah sedih. Agitation: Scene makan mie instan dengan lesu. Solution: Tampilan cover e-book resep, cuplikan beberapa foto masakan dari e-book. Orang memasak dengan gembira. CTA: Tunjukkan mock-up e-book, teks harga spesial, arahkan ke link di bio.",
    _internalStyle: "Humor",
    _internalAudience: "Anak kost, karyawan, siapa saja yang butuh ide masak hemat",
    _internalProductDesc: "E-book Resep Masakan Hemat",
  },
];

export default function HomePage() {
  return (
    <>
      <Head>
        <title>{SITE_NAME} – Video Sales Hook Builder (TikTok, Reels, Shorts)</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        {/* ... (meta lainnya tetap sama) */}
      </Head>

      <nav className="landing-nav">
        <div className="nav-logo">
          {MAIN_NAME}
          {SECOND_NAME && <span>{SECOND_NAME}</span>}
        </div>
        <div className="nav-actions">
          <Link href="/builder" className="nav-link">
            Builder Lengkap
          </Link>
        </div>
      </nav>

      <main className="landing-main">
        <section className="hero-new">
          <div className="hero-content-new">
            <h1>
              Stop Bikin Konten Jualan <span className="highlight">Ngebosenin</span>.
            </h1>
            <p className="subheadline">
              {SITE_NAME} bantu kamu bikin <strong className="highlight">visual hook, teks pembuka, skrip sesuai durasi, dan ide frame</strong> video TikTok & Reels yang nancep di detik pertama.
            </p>
            <Link href="/builder" className="cta-button-primary">
              🚀 Mulai Buat Skrip Sekarang
            </Link>
          </div>
        </section>

        <section className="features-section">
          <h2>Kenapa {SITE_NAME}?</h2>
          <div className="features-grid">
            {features.map((f, idx) => (
              <div key={idx} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="persona-cta-section">
          <h2>Kamu Siapa di Dunia Konten?</h2>
          <div className="persona-grid">
            <Link href="/builder?persona=ugc" className="persona-card">
              <h3><span className="persona-icon">🎭</span> Saya UGC Creator</h3>
              <p>Bikin portofolio nendang, dilirik banyak brand.</p>
              <span className="persona-link">Mulai Disini &rarr;</span>
            </Link>
            <Link href="/builder?persona=brand" className="persona-card">
              <h3><span className="persona-icon">🏢</span> Saya Pemilik Brand</h3>
              <p>Tingkatin konversi iklan, engagement, & penjualan.</p>
              <span className="persona-link">Mulai Disini &rarr;</span>
            </Link>
            <Link href="/builder?persona=freelancer" className="persona-card">
              <h3><span className="persona-icon">💼</span> Saya Freelancer/Agensi</h3>
              <p>Hemat waktu riset, puaskan klien dengan hasil cepat & kreatif.</p>
              <span className="persona-link">Mulai Disini &rarr;</span>
            </Link>
          </div>
        </section>

        <section className="examples-section">
          <h2>Contoh Hasil Nyata dari {SITE_NAME}:</h2>
          <div className="examples-container">
            {exampleOutputs.map((ex, idx) => (
              <div key={idx} className="example-output-card">
                <div className="example-header">
                  <h4>
                    "{ex._internalProductDesc}" 
                    <span className="example-style">Gaya: {ex._internalStyle}</span>
                  </h4>
                </div>
                
                <div className="example-part">
                  <div className="example-label">
                    <span className="highlight-badge">Visual Hook</span>
                  </div>
                  <div className="example-content">{ex.visualHook}</div>
                </div>
                
                <div className="example-part">
                  <div className="example-label">
                    <span className="highlight-badge">Teks Hook</span>
                  </div>
                  <div className="example-content">{ex.textHook}</div>
                </div>
                
                <div className="example-part">
                  <div className="example-label">
                    <span className="highlight-badge">Skrip Lengkap</span>
                  </div>
                  <div className="script-container">
                    {formatScriptForLandingDisplay(ex.script)}
                  </div>
                </div>
                
                <div className="example-part">
                  <div className="example-label">
                    <span className="highlight-badge">Saran Frame</span>
                  </div>
                  <div className="example-content">{ex.frames}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cta-container">
            <Link href="/builder" className="cta-button-primary">
              Penasaran? Coba Sendiri di Builder!
            </Link>
          </div>
        </section>

        <footer className="landing-footer">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. Bikin konten jualan nancep itu gampang!</p>
        </footer>
      </main>

      <style jsx>{`
        :root {
          --highlight-color: #39ff14;
          --card-bg: #0f0f0f;
          --text-primary: #f0f0f0;
          --text-secondary: #b0b0b0;
          --border-color: #222;
          --section-bg: #080808;
        }
        
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          background-color: #000;
          color: var(--text-primary);
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        
        .highlight {
          color: var(--highlight-color);
        }
        
        h1, h2, h3, h4 {
          margin-top: 0;
          font-weight: 700;
          line-height: 1.3;
        }
        
        /* Navigation */
        .landing-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          background: #080808;
          border-bottom: 1px solid var(--border-color);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        .nav-logo {
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--highlight-color);
        }
        
        .nav-logo span {
          color: var(--text-primary);
        }
        
        .nav-actions .nav-link {
          color: var(--text-primary);
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          background: rgba(57, 255, 20, 0.1);
          transition: all 0.2s ease;
        }
        
        .nav-actions .nav-link:hover {
          background: rgba(57, 255, 20, 0.2);
        }
        
        /* Hero Section */
        .hero-new {
          text-align: center;
          padding: 3rem 1.5rem;
          background: linear-gradient(180deg, #080808 0%, #000000 100%);
          position: relative;
          overflow: hidden;
        }
        
        .hero-new::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(57, 255, 20, 0.05) 0%, rgba(0,0,0,0) 70%);
          z-index: 0;
        }
        
        .hero-content-new {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .hero-content-new h1 {
          font-size: 2.2rem;
          font-weight: 900;
          margin-bottom: 1.2rem;
        }
        
        .hero-content-new .subheadline {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin: 0 auto 2rem;
          line-height: 1.7;
          max-width: 600px;
        }
        
        /* Buttons */
        .cta-button-primary {
          display: inline-block;
          background: var(--highlight-color);
          color: #000;
          padding: 1rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 700;
          font-size: 1.1rem;
          transition: transform 0.2s, background-color 0.2s;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(57, 255, 20, 0.3);
        }
        
        .cta-button-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(57, 255, 20, 0.4);
        }
        
        /* Features Section */
        .features-section {
          padding: 4rem 1.5rem;
          background: var(--section-bg);
          text-align: center;
        }
        
        .features-section h2 {
          font-size: 2rem;
          margin-bottom: 3rem;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          max-width: 900px;
          margin: 0 auto;
        }
        
        @media (min-width: 768px) {
          .features-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        .feature-card {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          padding: 2rem 1.5rem;
          border-radius: 12px;
          transition: transform 0.3s ease;
        }
        
        .feature-card:hover {
          transform: translateY(-5px);
          border-color: rgba(57, 255, 20, 0.3);
        }
        
        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
        }
        
        .feature-card h3 {
          font-size: 1.4rem;
          margin-bottom: 1rem;
        }
        
        .feature-card p {
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }
        
        /* Persona Section */
        .persona-cta-section {
          padding: 4rem 1.5rem;
          text-align: center;
          background: #000;
        }
        
        .persona-cta-section h2 {
          font-size: 2rem;
          margin-bottom: 3rem;
        }
        
        .persona-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          max-width: 900px;
          margin: 0 auto;
        }
        
        @media (min-width: 768px) {
          .persona-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        .persona-card {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          padding: 1.8rem;
          border-radius: 12px;
          text-decoration: none;
          color: var(--text-primary);
          transition: all 0.3s ease;
          text-align: left;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .persona-card:hover {
          transform: translateY(-5px);
          border-color: rgba(57, 255, 20, 0.5);
          box-shadow: 0 10px 25px rgba(57, 255, 20, 0.15);
        }
        
        .persona-icon {
          display: inline-block;
          margin-right: 0.5rem;
          font-size: 1.2em;
          vertical-align: middle;
        }
        
        .persona-card h3 {
          font-size: 1.3rem;
          margin-top: 0;
          margin-bottom: 1rem;
        }
        
        .persona-card p {
          color: var(--text-secondary);
          line-height: 1.6;
          flex-grow: 1;
          margin-bottom: 1.5rem;
        }
        
        .persona-link {
          font-weight: 700;
          color: var(--highlight-color);
          display: inline-block;
          margin-top: auto;
        }
        
        /* Examples Section */
        .examples-section {
          padding: 4rem 1.5rem;
          background: var(--section-bg);
        }
        
        .examples-section h2 {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 3rem;
        }
        
        .examples-container {
          max-width: 900px;
          margin: 0 auto;
        }
        
        .example-output-card {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          padding: 1.8rem;
          border-radius: 12px;
          margin-bottom: 2.5rem;
          transition: all 0.3s ease;
        }
        
        .example-output-card:hover {
          border-color: rgba(57, 255, 20, 0.3);
        }
        
        .example-header {
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }
        
        .example-header h4 {
          font-size: 1.3rem;
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .example-style {
          font-size: 0.9rem;
          background: rgba(57, 255, 20, 0.15);
          color: var(--highlight-color);
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          align-self: center;
        }
        
        .example-part {
          margin-bottom: 1.8rem;
        }
        
        .example-label {
          margin-bottom: 0.8rem;
        }
        
        .highlight-badge {
          display: inline-block;
          background: rgba(57, 255, 20, 0.1);
          color: var(--highlight-color);
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 600;
        }
        
        .example-content {
          color: var(--text-primary);
          line-height: 1.7;
          padding-left: 0.5rem;
        }
        
        .script-container {
          background: rgba(15, 15, 15, 0.5);
          border-left: 3px solid var(--highlight-color);
          padding: 1rem;
          border-radius: 0 8px 8px 0;
          margin-top: 0.5rem;
        }
        
        .script-part {
          margin-bottom: 1.2rem;
          line-height: 1.6;
        }
        
        .script-label {
          color: var(--highlight-color);
          font-weight: 700;
          display: block;
          margin-bottom: 0.3rem;
        }
        
        .script-content {
          color: #ddd;
          display: block;
        }
        
        .cta-container {
          text-align: center;
          margin-top: 2rem;
        }
        
        /* Footer */
        .landing-footer {
          text-align: center;
          padding: 3rem 1.5rem;
          background: #000;
          border-top: 1px solid var(--border-color);
        }
        
        .landing-footer p {
          color: var(--text-secondary);
          margin: 0;
          font-size: 0.9rem;
        }
        
        /* Mobile Optimization */
        @media (max-width: 768px) {
          .landing-nav {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
          }
          
          .hero-content-new h1 {
            font-size: 1.8rem;
          }
          
          .hero-content-new .subheadline {
            font-size: 1rem;
          }
          
          .feature-card {
            padding: 1.5rem;
          }
          
          .persona-card {
            padding: 1.5rem;
          }
          
          .example-output-card {
            padding: 1.3rem;
          }
          
          .cta-button-primary {
            width: 100%;
            max-width: 300px;
            padding: 0.9rem;
            font-size: 1rem;
          }
          
          .script-container {
            padding: 0.8rem;
            font-size: 0.95rem;
          }
        }
        
        @media (max-width: 480px) {
          .hero-new {
            padding: 2rem 1rem;
          }
          
          .hero-content-new h1 {
            font-size: 1.6rem;
          }
          
          .features-section, 
          .persona-cta-section,
          .examples-section {
            padding: 3rem 1rem;
          }
          
          .feature-card h3 {
            font-size: 1.2rem;
          }
          
          .persona-card h3 {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </>
  );
}
