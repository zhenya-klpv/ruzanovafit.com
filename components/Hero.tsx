"use client";

import { useEffect, useState } from "react";
import { BoundedShape } from "./BoundedShape";

export function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const onScroll = () => {
      const y = Math.min(window.scrollY, 420);
      setScrollY(y);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headlineShift = scrollY * 0.045;
  const noteShift = scrollY * 0.08;

  return (
    <header className="relative min-h-[84vh] md:min-h-[92vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-10 md:pt-0">
      <div className="absolute inset-0 flex items-center justify-center">
        <BoundedShape variant="hero" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid gap-8 md:gap-10 lg:grid-cols-12 lg:items-center">
        <div
          className="text-center lg:text-left lg:col-span-7"
          style={{ transform: `translateY(${headlineShift * -1}px)` }}
        >
          <p className="text-label uppercase tracking-[0.18em] md:tracking-[0.24em] text-ink-subtle mb-5 md:mb-6 animate-fade-in">
            Ruzanova Fitness
          </p>
          <h1 className="text-display font-semibold text-ink tracking-tight animate-slide-up [animation-delay:0.1s] opacity-0 [animation-fill-mode:forwards] max-w-4xl">
            Sculpt strength. Move beautifully. Feel unstoppable.
          </h1>
          <p className="mt-6 md:mt-8 text-body text-ink-muted max-w-prose mx-auto lg:mx-0 animate-slide-up [animation-delay:0.25s] opacity-0 [animation-fill-mode:forwards]">
            Personal training in the Bay Area, plus online coaching worldwide. Science-based programming, mindful nutrition, and support that keeps you consistent.
          </p>
          <p className="mt-4 text-caption text-ink-subtle animate-slide-up [animation-delay:0.35s] opacity-0 [animation-fill-mode:forwards]">
            Led by Alena Ruzanova: NASM-certified trainer, nutrition coach, and athlete focused on lasting, sustainable transformation.
          </p>
          <div className="mt-6 flex justify-center lg:justify-start animate-slide-up [animation-delay:0.37s] opacity-0 [animation-fill-mode:forwards]">
            <span className="hero-shimmer-line" aria-hidden />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-2 animate-slide-up [animation-delay:0.38s] opacity-0 [animation-fill-mode:forwards]">
            <span className="ds-pill text-ink-muted">
              Personal Training in California
            </span>
            <span className="ds-pill text-ink-muted">
              Online Training Worldwide
            </span>
          </div>
          <div className="mt-10 md:mt-12 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 animate-slide-up [animation-delay:0.4s] opacity-0 [animation-fill-mode:forwards]">
            <a
              href="#contact"
              className="ds-btn-primary w-full sm:w-auto"
            >
              Book a free consultation
            </a>
            <a
              href="#services"
              className="ds-btn-secondary w-full sm:w-auto"
            >
              Explore services
            </a>
            <a
              href="/security/"
              className="text-caption text-center sm:text-left text-ink-muted underline hover:text-ink transition-colors uppercase tracking-[0.1em] py-1"
            >
              FAQ & policies
            </a>
          </div>
        </div>
        <div
          className="animate-slide-up [animation-delay:0.3s] opacity-0 [animation-fill-mode:forwards] lg:col-span-5 mt-2 lg:mt-0"
          style={{ transform: `translateY(${noteShift * -1}px)` }}
        >
          <article className="w-full max-w-md mx-auto lg:ml-auto ds-card-elevated p-5 md:p-6 editorial-note-animate">
            <p className="text-label uppercase tracking-[0.16em] text-ink-subtle mb-3">
              Editorial note
            </p>
            <p className="text-body text-ink-muted mb-5">
              &ldquo;The body changes when precision meets consistency. My role is to guide both.&rdquo;
            </p>
            <ul className="space-y-2 text-caption text-ink-muted">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                Free 30-minute assessment for new clients
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                Coach since 2018, Bay Area + online
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                Package options: Essentials, Signature, Atelier
              </li>
            </ul>
            <p className="mt-4 text-[11px] text-ink-subtle">
              Designed for sustainable results, not quick-fix cycles.
            </p>
          </article>
          <p className="mt-2 text-[10px] text-ink-subtle/80 max-w-md mx-auto lg:ml-auto text-center lg:text-right tracking-wide">
            Precision coaching with editorial clarity and calm discipline.
          </p>
        </div>
      </div>
    </header>
  );
}
