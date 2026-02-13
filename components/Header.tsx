import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-surface-border/60 bg-surface/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        <Link
          href="/"
          className="text-title font-semibold text-ink tracking-[0.04em] hover:text-trust transition-colors"
        >
          Ruzanova Fitness
        </Link>
        <nav aria-label="Main" className="ml-auto">
          <ul className="flex items-center gap-6 text-caption uppercase tracking-[0.11em]">
            <li>
              <Link href="#about" className="text-ink-muted hover:text-ink transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="#services" className="text-ink-muted hover:text-ink transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link href="#contact" className="text-ink-muted hover:text-ink transition-colors">
                Book
              </Link>
            </li>
            <li>
              <Link href="/security/" className="text-ink-muted hover:text-ink transition-colors">
                FAQ
              </Link>
            </li>
          </ul>
        </nav>
        <Link href="#contact" className="hidden md:inline-flex ds-btn-primary !px-4 !py-2 !text-[11px]">
          Book
        </Link>
      </div>
    </header>
  );
}
