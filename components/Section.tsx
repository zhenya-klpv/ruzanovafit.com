import type { ReactNode } from "react";

/**
 * Section container — consistent rhythm, Berlin grid.
 */
export function Section({
  children,
  className = "",
  id,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabel?: string;
}) {
  return (
    <section
      id={id}
      className={`py-20 md:py-30 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  subtitle,
  maxWidth = "prose",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  maxWidth?: "prose" | "narrow" | "full";
}) {
  const widthClass = maxWidth === "prose" ? "max-w-prose" : maxWidth === "narrow" ? "max-w-narrow" : "";

  return (
    <header className={`mb-12 md:mb-16 ${widthClass}`}>
      {eyebrow && (
        <p className="text-label uppercase tracking-[0.18em] text-ink-subtle mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-headline font-semibold text-ink tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-body text-ink-muted">
          {subtitle}
        </p>
      )}
    </header>
  );
}
