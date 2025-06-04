import Head from "next/head";
import Link from "next/link";

export default function Landing() {
  const examples = [
    {
      visual: "Close-up wajah kaget, tiba-tiba munculkan botol serum",
      text: "Jerawat datang lagi? Bentar, coba ini dulu!",
      script:
        "Hook -- Problem -- Agitation -- Solution -- CTA",
      frame:
        "Hook: close-up wajah, Problem: tunjuk jerawat, Agitation: ekspresi frustasi, Solution: tampilkan produk, CTA: ajak cek link bio",
    },
    {
      visual: "Before-after meja berantakan lalu rapi dalam satu swipe",
      text: "Gini caranya meja kerja keliatan premium!",
      script:
        "Hook -- Problem -- Agitation -- Solution -- CTA",
      frame:
        "Hook: sapu kamera ke meja, Problem: tunjuk kekacauan, Agitation: geleng kepala, Solution: pasang organizer, CTA: kode diskon di caption",
    },
    {
      visual: "Gerakan tangan cepat pasang casing HP warna neon",
      text: "Pengen hp keliatan mahal tanpa beli baru?",
      script:
        "Hook -- Problem -- Agitation -- Solution -- CTA",
      frame:
        "Hook: tangan masang casing, Problem: hp polos bikin bosan, Agitation: jari mengetuk kesal, Solution: tunjuk casing warna neon, CTA: swipe up untuk beli",
    },
  ];

  const features = [
    {
      title: "Hasil dalam 5 Detik",
      desc:
        "Masukkan produkmu lalu dapatkan tiga script yang siap dipakai.",
    },
    {
      title: "Naikin CTR",
      desc:
        "Hook tajam bikin penonton berhenti scroll dan klik link jualanmu.",
    },
    {
      title: "Tanpa Tim Produksi",
      desc:
        "Frame suggestion dirancang untuk kreator solo yang serba cepat.",
    },
  ];

  return (
    <>
      <Head>
        <title>HookFreak • Video Sales Hook Builder</title>
        <meta
          name="description"
          content="Bangun hook video jualan yang nancep dalam hitungan detik."
        />
      </Head>
      <main className="landing-wrapper">
        <section className="landing-hero">
          <h1 className="logo-text">
            Hook<span>Freak</span>
          </h1>
          <p className="subtitle">Video Sales Hook Builder</p>
          <p style={{ marginTop: 8 }}>Ubah konten biasa jadi video jualan yang langsung nancep.</p>
          <form action="/builder" className="hero-form">
            <input
              name="description"
              placeholder="Apa yang kamu jual?"
              className="niche-input"
            />
            <select name="style" className="tone-select">
              <option value="storytelling">Storytelling</option>
              <option value="hard-sell">Hard Sell</option>
              <option value="soft-sell">Soft Sell</option>
              <option value="humor">Humor</option>
              <option value="shock">Shock</option>
            </select>
            <button type="submit" className="cta-button">
              Lihat Hasil Cepat
            </button>
          </form>
          <div className="persona-buttons">
            <Link href="/builder?persona=ugc" className="cta-outline">
              Saya UGC Creator
            </Link>
            <Link href="/builder?persona=brand" className="cta-outline">
              Saya Pemilik Brand
            </Link>
            <Link href="/builder?persona=freelancer" className="cta-outline">
              Saya Freelancer Marketing
            </Link>
          </div>
        </section>
        <section className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </section>
        <h2 style={{ marginTop: 48, marginBottom: 24 }}>Contoh Output</h2>
        {examples.map((ex, idx) => (
          <section key={idx} className="example-card">
            <h3>Contoh #{idx + 1}</h3>
            <p><strong>Adegan Pembuka:</strong> {ex.visual}</p>
            <p><strong>Teks Hook:</strong> {ex.text}</p>
            <p><strong>Script:</strong> {ex.script}</p>
            <p><strong>Frame:</strong> {ex.frame}</p>
          </section>
        ))}
      </main>
    </>
  );
}
