"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-surface-border/60 bg-surface/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        <Link
          href="/"
          className="text-title font-semibold text-ink tracking-[0.04em] hover:text-trust transition-colors"
          onClick={closeMenu}
        >
          Ruzanova Fitness
        </Link>
        <nav aria-label="Main" className="ml-auto hidden md:block">
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
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-lg border border-surface-border bg-white/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          Menu
        </button>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-ink/35 backdrop-blur-sm md:hidden"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeMenu();
          }}
        >
          <div className="absolute top-16 left-0 right-0 mx-3 rounded-xl border border-surface-border/70 bg-surface/95 p-4 shadow-xl">
            <ul className="space-y-2 text-caption uppercase tracking-[0.12em]">
              <li>
                <Link href="#about" onClick={closeMenu} className="block rounded-lg px-3 py-3 text-ink-muted hover:text-ink hover:bg-white/60 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#services" onClick={closeMenu} className="block rounded-lg px-3 py-3 text-ink-muted hover:text-ink hover:bg-white/60 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#contact" onClick={closeMenu} className="block rounded-lg px-3 py-3 text-ink-muted hover:text-ink hover:bg-white/60 transition-colors">
                  Book
                </Link>
              </li>
              <li>
                <Link href="/security/" onClick={closeMenu} className="block rounded-lg px-3 py-3 text-ink-muted hover:text-ink hover:bg-white/60 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
            <Link href="#contact" onClick={closeMenu} className="mt-3 w-full ds-btn-primary">
              Start request
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
