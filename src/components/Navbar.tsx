import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="navbar">
      <Link href="/" className="nav-logo">Hook<span>Freak</span></Link>
      <button
        className="nav-toggle"
        aria-label="Toggle navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
      <div className={`nav-links ${open ? "show" : ""}`}>
        <Link href="/generator">Generator</Link>
        <a href="#login">Login</a>
        <a href="#signup" className="signup-btn">Daftar</a>
      </div>
    </nav>
  );
}
