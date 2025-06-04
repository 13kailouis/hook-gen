import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="foot-links">
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="mailto:hello@hookfreak.com">Kontak</Link>
      </div>
      <p className="foot-small">
        Built with love for content creators • HookFreak v2.0 © 2025
      </p>
    </footer>
  );
}
