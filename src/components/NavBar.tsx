import Link from "next/link";
import { FiMenu, FiX, FiInfo, FiMail, FiShield } from "react-icons/fi";
import { useState } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="navbar">
      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
      {open && (
        <div className="menu-panel">
          <Link href="/about" className="menu-item" onClick={() => setOpen(false)}>
            <FiInfo /> Tentang
          </Link>
          <Link href="/contact" className="menu-item" onClick={() => setOpen(false)}>
            <FiMail /> Kontak
          </Link>
          <Link href="/privacy" className="menu-item" onClick={() => setOpen(false)}>
            <FiShield /> Kebijakan Privasi
          </Link>
        </div>
      )}
    </nav>
  );
}
