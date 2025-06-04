import Link from "next/link";
import { FiMenu, FiX, FiHome, FiVideo, FiPlay } from "react-icons/fi";
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
          <Link href="/" className="menu-item" onClick={() => setOpen(false)}>
            <FiHome /> Home
          </Link>
          <Link
            href="#examples"
            className="menu-item"
            onClick={() => setOpen(false)}
          >
            <FiVideo /> Contoh Konten
          </Link>
          <Link
            href="/builder"
            className="menu-item"
            onClick={() => setOpen(false)}
          >
            <FiPlay /> Mulai
          </Link>
        </div>
      )}
    </nav>
  );
}
