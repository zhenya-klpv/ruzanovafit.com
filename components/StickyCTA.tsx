"use client";

export function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-gradient-to-t from-ink to-transparent md:hidden">
      <a
        href="/#contact"
        className="block w-full py-4 text-center font-semibold uppercase tracking-wider text-white bg-accent hover:bg-accent/90 rounded-lg shadow-lg"
      >
        Book a free consultation
      </a>
    </div>
  );
}
