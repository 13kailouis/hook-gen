import Head from "next/head";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState } from "react";

const samples = [
  {
    visual: "Close up wajah kaget saat lihat bekas jerawat memudar di kaca",
    text: "Gila, baru seminggu pakai udah kinclong begini!",
    script:
      "Wajah kusam bikin minder --- Jerawat bandel susah hilang --- Tiap ngaca rasanya pengen nutup muka --- Serum ini nembusin pori-pori dan redain kemerahan --- Cek link bio biar kamu buktiin sendiri",
    frame:
      "1. Close up before-after di kaca\n2. Zoom ke bekas jerawat\n3. Ekspresi frustasi\n4. Teteskan serum dan usap\n5. Ajak klik link di bio",
  },
  {
    visual: "Tumpahan kopi di meja sebelum mengganti tumbler anti tumpah",
    text: "Pernah kesel gara-gara kopi tumpah di mobil?",
    script:
      "Niatnya ngopi malah nyiprat kemana-mana --- Meja kerja jadi kotor dan ngerusak mood --- Setiap hari jadi was-was bawa minuman --- Pake tumbler kunci putar ini, dijamin ga bleber --- Buruan order sebelum stoknya abis",
    frame:
      "1. Rekam kopi tumpah\n2. Wajah kesal\n3. Shot close up noda di meja\n4. Tunjukkan tumbler anti tumpah\n5. Shot produk dan info beli",
  },
  {
    visual: "Before-after pakaian kusut lalu halus sekejap pakai steamer",
    text: "Listrik mati? Ga perlu setrika, ada solusi cepat!",
    script:
      "Baju kusut bikin tampilan berantakan --- Setrika butuh waktu lama dan listrik nyala --- Kalau buru-buru malah jadi stress sendiri --- Cukup gantung baju dan nyalakan steamer genggam ini --- Klik tombol beli dan siap tampil rapi",
    frame:
      "1. Tunjukkan baju kusut\n2. Ekspresi cemas karena mati listrik\n3. Ambil steamer genggam\n4. Baju langsung rapi\n5. Ajak order sekarang",
  },
];

export default function Home() {
  const [description, setDescription] = useState("");
  const [style, setStyle] = useState("storytelling");
  const [result, setResult] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!description) return;
    setLoading(true);
    setResult(null);
    try {
      const r = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, audience: "", style }),
      });
      const data = await r.json();
      setResult(data.hooks || []);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>HookFreak • Video Sales Hook Builder</title>
        <meta
          name="description"
          content="Ubah video jualanmu jadi lebih nendang dalam 5 detik"
        />
      </Head>
      <Navbar />
      <main className="main-wrapper">
        <section className="hero">
          <h1 className="logo-text">
            Hook<span>Freak</span>
          </h1>
          <p className="subtitle">Video Sales Hook Builder</p>
          <form onSubmit={handleGenerate} className="hook-form" style={{marginTop:24}}>
            <label>
              <span className="form-label">Apa yang kamu jual?</span>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="niche-input"
              />
            </label>
            <label>
              <span className="form-label">Gaya kontenmu apa?</span>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="tone-select"
              >
                <option value="storytelling">Storytelling</option>
                <option value="hard-sell">Hard Sell</option>
                <option value="soft-sell">Soft Sell</option>
                <option value="humor">Humor</option>
                <option value="shock">Shock</option>
                <option value="fomo">FOMO</option>
                <option value="edukatif">Edukatif</option>
              </select>
            </label>
            <button type="submit" disabled={loading} className="generate-button">
              {loading ? "Menghasilkan..." : "Generate"}
            </button>
          </form>
          {result && (
            <div className="results" style={{ whiteSpace: "pre-wrap", marginTop:24 }}>
              {result.map((r, idx) => (
                <div key={idx} style={{ marginBottom: 24 }}>
                  <p><strong>Visual Hook:</strong> {r.visualHook}</p>
                  <p><strong>Teks Hook:</strong> {r.textHook}</p>
                  <p><strong>Script:</strong> {r.script}</p>
                  <p><strong>Frame:</strong> {r.frames}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section style={{marginTop:60}}>
          <h2 style={{textAlign:'center'}}>Contoh Output</h2>
          <div className="results" style={{ whiteSpace: "pre-wrap" }}>
            {samples.map((s, i) => (
              <div key={i} style={{ marginBottom: 24 }}>
                <p><strong>Visual Hook:</strong> {s.visual}</p>
                <p><strong>Teks Hook:</strong> {s.text}</p>
                <p><strong>Script:</strong> {s.script}</p>
                <p><strong>Frame:</strong> {s.frame}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{marginTop:60, textAlign:'center'}}>
          <h2>Pilih Jalur Onboarding</h2>
          <div style={{display:'flex',flexDirection:'column',gap:16,maxWidth:400,margin:'0 auto'}}>
            <Link href="/builder?style=storytelling" className="generate-button">Saya UGC Creator</Link>
            <Link href="/builder?style=hard-sell" className="generate-button">Saya Pemilik Brand</Link>
            <Link href="/builder?style=soft-sell" className="generate-button">Saya Freelancer Marketing</Link>
          </div>
        </section>
      </main>
    </>
  );
}

