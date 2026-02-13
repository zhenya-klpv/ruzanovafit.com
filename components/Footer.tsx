import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-surface-border bg-surface-elevated/40 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-caption text-ink-subtle">
          <strong className="text-ink">Ruzanova Fitness</strong> — Personal training and nutrition coaching in California and online worldwide.
        </p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-6 text-caption uppercase tracking-[0.1em]">
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
      </div>
    </footer>
  );
}
