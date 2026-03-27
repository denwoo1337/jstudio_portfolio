import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#050508] border-t border-[rgba(120,60,220,0.15)] py-10 px-6 md:px-12 lg:px-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-baseline gap-0">
          <span className="font-display font-normal text-foreground text-base tracking-tight">
            J.&nbsp;
          </span>
          <span className="font-display font-extrabold text-base tracking-tight gradient-text">
            Studio
          </span>
        </div>

        {/* Copyright */}
        <p className="font-body text-xs text-muted text-center">
          &copy; {year} J. Studio. Alle Rechte vorbehalten.
        </p>

        {/* Legal links */}
        <nav className="flex items-center gap-6" aria-label="Legal">
          <Link
            href="/impressum"
            className="font-body text-xs text-muted hover:text-foreground transition-colors duration-200"
          >
            Impressum
          </Link>
          <Link
            href="/datenschutz"
            className="font-body text-xs text-muted hover:text-foreground transition-colors duration-200"
          >
            Datenschutz
          </Link>
        </nav>
      </div>
    </footer>
  );
}
