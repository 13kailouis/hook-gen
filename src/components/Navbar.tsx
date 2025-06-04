import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "solid" : "transparent"}`}>
      <Link href="/" className="navbar-logo">
        HookFreak
      </Link>
      <div className="navbar-links">
        <Link href="#examples">Contoh Konten</Link>
        <Link href="/builder" className="cta-small">
          Mulai
        </Link>
      </div>
    </nav>
  );
}
