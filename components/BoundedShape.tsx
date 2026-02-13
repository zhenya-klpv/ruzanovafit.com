"use client";

/**
 * Bounded shape — visual metaphor: data stays inside.
 * Zaha-inspired fluid boundary; single element, no decoration without meaning.
 */
export function BoundedShape({
  className = "",
  variant = "hero",
}: {
  className?: string;
  variant?: "hero" | "section" | "small";
}) {
  const size = variant === "hero" ? "w-[min(90vw,720px)] h-[min(60vw,480px)]" : variant === "section" ? "w-full max-w-2xl h-64" : "w-48 h-32";

  return (
    <div
      className={`absolute pointer-events-none overflow-hidden ${size} ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full text-accent-mute/30"
        fill="currentColor"
      >
        <defs>
          <linearGradient id="bounded-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Fluid boundary — ellipse as "container" of data */}
        <ellipse cx="200" cy="150" rx="180" ry="120" fill="url(#bounded-grad)" />
        <ellipse cx="200" cy="150" rx="180" ry="120" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
      </svg>
    </div>
  );
}
