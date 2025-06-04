import Head from "next/head";
import { useState } from "react";
import NavBar from "@/components/NavBar";
import ScriptModal from "@/components/ScriptModal";

export default function Landing() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");

  async function handleClick() {
    const res = await fetch("/sample-script.txt");
    const text = await res.text();
    setContent(text);
    setOpen(true);
    const link = document.createElement("a");
    link.href = "/sample-script.txt";
    link.download = "script.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <Head>
        <title>HookFreak</title>
        <meta name="description" content="Langsung dapatkan skrip video jualan" />
      </Head>
      <NavBar />
      <main className="landing-wrapper fade-in" style={{ textAlign: "center" }}>
        <h1 className="logo-text" style={{ marginTop: 80 }}>
          Hook<span>Freak</span>
        </h1>
        <p className="subtitle" style={{ marginTop: 8 }}>
          Skrip singkat buat jualan lebih cepat
        </p>
        <button className="cta-button main-button" onClick={handleClick} style={{ marginTop: 40 }}>
          Dapatkan Skrip Sekarang
        </button>
        <p style={{ marginTop: 16, color: "#a1a1a1" }}>
          Langsung dapatkan contoh skrip pertama tanpa ribet
        </p>
        <footer className="footer" style={{ marginTop: 80 }}>
          <p style={{ marginBottom: 8 }}>&copy; {new Date().getFullYear()} HookFreak</p>
          <div>
            <a href="/privacy" style={{ marginRight: 12, color: "#fff" }}>Kebijakan Privasi</a>
            <a href="/contact" style={{ color: "#fff" }}>Kontak</a>
          </div>
        </footer>
      </main>
      <ScriptModal open={open} onClose={() => setOpen(false)} content={content} />
    </>
  );
}
