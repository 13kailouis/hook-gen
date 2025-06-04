import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? "solid" : "transparent"}`}>
        <Link href="/" className="navbar-logo">
          HookFreak
        </Link>
        <div className="navbar-links">
          <Link href="#examples">Contoh Konten</Link>
          <Link href="/builder" className="cta-small">
            Mulai Sekarang
          </Link>
        </div>
        <button
          className="navbar-toggle"
          onClick={() => setOpen(true)}
          aria-label="Buka menu"
        >
          &#9776;
        </button>
      </nav>
      {open && (
        <div className="mobile-menu">
          <button
            className="close"
            aria-label="Tutup menu"
            onClick={() => setOpen(false)}
          >
            &times;
          </button>
          <Link href="/builder" onClick={() => setOpen(false)}>
            Buka Builder
          </Link>
          <Link href="#examples" onClick={() => setOpen(false)}>
            Contoh Konten
          </Link>
          <Link href="#about" onClick={() => setOpen(false)}>
            Tentang Produk
          </Link>
        </div>
      )}
    </>
  );
}
