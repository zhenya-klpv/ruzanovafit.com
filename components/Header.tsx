"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled ? "border-b border-surface-border/60 bg-surface/80 backdrop-blur" : "border-0 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        <Link
          href="/"
          onClick={closeMenu}
          className={`text-title font-semibold tracking-[0.04em] transition-colors ${scrolled ? "text-ink hover:text-trust" : "text-white hover:text-white/90"}`}
        >
          Ruzanova Fitness
        </Link>
        <nav aria-label="Main" className="ml-auto hidden md:block">
          <ul className={`flex items-center gap-6 text-caption uppercase tracking-[0.11em] ${scrolled ? "text-ink-muted" : "text-white/90"}`}>
            <li>
              <Link href="/#about" className={scrolled ? "text-ink-muted hover:text-ink transition-colors" : "text-white/90 hover:text-white transition-colors"}>
                About
              </Link>
            </li>
            <li>
              <Link href="/#services" className={scrolled ? "text-ink-muted hover:text-ink transition-colors" : "text-white/90 hover:text-white transition-colors"}>
                Services
              </Link>
            </li>
            <li>
              <Link href="/security/" className={scrolled ? "text-ink-muted hover:text-ink transition-colors" : "text-white/90 hover:text-white transition-colors"}>
                Info
              </Link>
            </li>
          </ul>
        </nav>
        <Link
          href="/#contact"
          className={`hidden md:inline-flex items-center justify-center rounded-lg px-4 py-2 text-caption font-semibold uppercase tracking-[0.11em] ${scrolled ? "ds-btn-primary" : "bg-white text-ink hover:bg-white/95 border-0"}`}
        >
          Book
        </Link>
        <button
          type="button"
          className={`md:hidden inline-flex items-center justify-center rounded-lg border px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] ${scrolled ? "border-surface-border bg-white/70 text-ink" : "border-white/40 bg-white/20 text-white"}`}
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
                <Link href="/#about" onClick={closeMenu} className="block rounded-lg px-3 py-3 text-ink-muted hover:text-ink hover:bg-white/60 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#services" onClick={closeMenu} className="block rounded-lg px-3 py-3 text-ink-muted hover:text-ink hover:bg-white/60 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/security/" onClick={closeMenu} className="block rounded-lg px-3 py-3 text-ink-muted hover:text-ink hover:bg-white/60 transition-colors">
                  Info
                </Link>
              </li>
            </ul>
            <Link href="/#contact" onClick={closeMenu} className="mt-3 w-full ds-btn-primary">
              Start request
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
