import { useEffect, useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "ProfitHook";
  const [MAIN, SECOND] = SITE_NAME.split(" ");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <Link href="/" className="nav-logo">
          {MAIN}
          {SECOND && <span>{SECOND}</span>}
        </Link>
        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <div className={`nav-links ${open ? "show" : ""}`}>
          <Link href="#features">Fitur</Link>
          <Link href="/pricing">Harga</Link>
          <a href="#login" className="login-link">
            Login
          </a>
        </div>
      </nav>
      <div
        className={`nav-overlay ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      />
    </>
  );
}
