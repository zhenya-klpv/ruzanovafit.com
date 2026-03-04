"use client";

import { useEffect, useState } from "react";

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

  return (
    <header className="relative min-h-[84vh] md:min-h-[92vh] lg:min-h-[90vh] xl:min-h-[92vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 overflow-hidden -mt-16 pt-[4.5rem] md:pt-16">
      {/* Mobile + tablet: vertical hero (1_VERT) — top pinned to top of page */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-top lg:hidden"
        style={{ backgroundImage: "url(/images/hero-bg.jpg)" }}
        aria-hidden
      />
      {/* Desktop (lg+): full-bleed background, no viewport scaling */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat hidden lg:block"
        style={{
          backgroundImage: "url(/images/hero-bg-desktop.jpg)",
          backgroundPosition: "70% 50%",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink/70" aria-hidden />

      {/* On mobile: flex + justify-end. On desktop: contained in max-w-6xl, text right-aligned */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex justify-end lg:justify-end pr-2 sm:pr-0">
        <div
          className="hero-text-block text-center lg:text-left w-fit max-w-[48vw] sm:max-w-full mx-auto md:mx-0 md:w-full md:max-w-3xl lg:max-w-xl ml-[52%] md:ml-0 lg:ml-0 lg:pl-8 min-h-0"
          style={{ transform: `translateY(${headlineShift * -1}px)` }}
        >
          <p className="text-[0.65rem] sm:text-label uppercase tracking-[0.18em] md:tracking-[0.24em] lg:tracking-[0.24em] text-white/90 mb-3 sm:mb-5 md:mb-6 animate-fade-in">
            Ruzanova Fitness
          </p>
          <h1 className="text-[1.75rem] leading-tight sm:text-[2.25rem] md:text-[2.75rem] lg:text-display font-semibold text-white tracking-tight animate-slide-up [animation-delay:0.1s] opacity-0 [animation-fill-mode:forwards] max-w-4xl drop-shadow-md space-y-0.5 lg:space-y-1">
            <span className="block whitespace-nowrap">Sculpt strength.</span>
            <span className="block whitespace-nowrap">Move beautifully.</span>
            <span className="block whitespace-nowrap">Feel unstoppable.</span>
          </h1>
          <p className="mt-3 sm:mt-6 md:mt-8 lg:mt-4 text-[0.875rem] sm:text-body text-white/95 max-w-prose mx-auto lg:mx-0 animate-slide-up [animation-delay:0.25s] opacity-0 [animation-fill-mode:forwards] hidden sm:block">
            Personal training in the Bay Area, plus online coaching worldwide. Science-based programming, mindful nutrition, and support that keeps you consistent.
          </p>
          <p className="mt-3 sm:mt-4 text-caption text-white/80 animate-slide-up [animation-delay:0.35s] opacity-0 [animation-fill-mode:forwards] hidden md:block">
            Led by Alena Ruzanova: NASM-certified trainer, nutrition coach, and athlete focused on lasting, sustainable transformation.
          </p>
          <div className="mt-6 flex justify-center lg:justify-start animate-slide-up [animation-delay:0.37s] opacity-0 [animation-fill-mode:forwards] hidden md:block">
            <span className="hero-shimmer-line" aria-hidden />
          </div>
          <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-2 animate-slide-up [animation-delay:0.38s] opacity-0 [animation-fill-mode:forwards] hidden sm:flex">
            <span className="ds-pill text-[0.65rem] md:text-[11px] text-white/90 border-white/30">
              Personal Training in California
            </span>
            <span className="ds-pill text-[0.65rem] md:text-[11px] text-white/90 border-white/30">
              Online Training Worldwide
            </span>
          </div>
          <div className="mt-4 md:mt-8 lg:mt-6 xl:mt-10 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 animate-slide-up [animation-delay:0.4s] opacity-0 [animation-fill-mode:forwards]">
            <a
              href="#contact"
              className="inline-flex items-center justify-center w-full sm:w-auto rounded-lg border-0 bg-[#7C6C4F] text-white font-semibold uppercase tracking-[0.1em] sm:tracking-[0.14em] py-3 sm:py-4 px-5 sm:px-6 text-sm sm:text-base text-center whitespace-normal shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-[#8a7a5c] hover:shadow-[0_2px_12px_rgba(0,0,0,0.2)] transition-colors transition-shadow"
            >
              Book a free consultation
            </a>
            <a
              href="#services"
              className="ds-btn-secondary w-full sm:w-auto border-white/60 text-white hover:bg-white/20 text-sm sm:text-base hidden sm:inline-flex"
            >
              Explore services
            </a>
            <a
              href="/security/#faq"
              className="text-caption text-center sm:text-left text-white/80 underline hover:text-white transition-colors uppercase tracking-[0.1em] py-1 hidden md:block"
            >
              FAQ & policies
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
