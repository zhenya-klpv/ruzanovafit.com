"use client";

import { useEffect, useMemo, useState } from "react";
import { Section, SectionHead } from "./Section";

type LocalTestimonial = {
  quote: string;
  author: string;
  location: string;
  source?: "site" | "yelp";
};

type YelpReview = {
  rating?: number;
  text?: string;
  time_created?: string;
  user?: { name?: string; location?: string };
  url?: string;
};

type YelpPayload = {
  reviews?: YelpReview[];
};

const YELP_BUSINESS_URL =
  "https://www.yelp.com/biz/elena-ruzanova-personal-trainer-and-nutritionist-san-jose";

const localTestimonials: LocalTestimonial[] = [
  {
    quote:
      "Working with Alena changed everything for me. In a few months I felt stronger, lighter, and much more confident in my body.",
    author: "Maria K.",
    location: "Los Angeles, CA",
  },
  {
    quote:
      "Professional, structured, and genuinely supportive coaching. Training and nutrition finally started making sense, and results followed.",
    author: "John S.",
    location: "San Francisco, CA",
  },
  {
    quote:
      "Online format was super convenient and still very personal. I had clear weekly direction and real accountability.",
    author: "Anna L.",
    location: "San Diego, CA",
  },
];

export function Testimonials() {
  const [remoteReviews, setRemoteReviews] = useState<LocalTestimonial[]>([]);
  const [reviewsError, setReviewsError] = useState(false);
  const hasRemoteEndpoint = Boolean(process.env.NEXT_PUBLIC_REVIEWS_API_URL);

  useEffect(() => {
    const endpoint = process.env.NEXT_PUBLIC_REVIEWS_API_URL;
    if (!endpoint) return;
    const endpointUrl = endpoint;

    let isMounted = true;

    async function loadYelpReviews() {
      try {
        const res = await fetch(endpointUrl, { cache: "no-store" });
        if (!res.ok) {
          if (isMounted) setReviewsError(true);
          return;
        }

        const payload = (await res.json()) as YelpPayload;
        const incoming = (payload.reviews ?? [])
          .filter((r) => Boolean(r.text))
          .map((r) => ({
            quote: (r.text ?? "").trim(),
            author: r.user?.name?.trim() || "Verified Yelp Client",
            location: r.user?.location?.trim() || "California",
            source: "yelp" as const,
          }));

        if (isMounted) {
          setReviewsError(false);
          setRemoteReviews(incoming);
        }
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.warn("Yelp reviews loading failed:", error);
        }
        if (isMounted) setReviewsError(true);
      }
    }

    loadYelpReviews();
    return () => {
      isMounted = false;
    };
  }, []);

  const mergedTestimonials = useMemo(() => {
    const all = [...localTestimonials, ...remoteReviews];
    const seen = new Set<string>();

    return all.filter((t) => {
      const key = `${t.author}::${t.quote}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [remoteReviews]);

  return (
    <section id="testimonials" aria-label="Client testimonials" className="relative">
      <div className="absolute inset-0 -z-10 min-h-full w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/images/testimonials-bg.jpg)" }} aria-hidden />
      <div className="absolute inset-0 -z-10 min-h-full w-full bg-gradient-to-b from-surface/92 via-surface/96 to-surface/98" aria-hidden />
      <div className="relative max-w-6xl mx-auto py-14 md:py-24 lg:py-32 xl:py-40 px-4 sm:px-6 lg:px-8 md:min-h-[85vh] lg:min-h-[90vh] md:flex md:flex-col md:justify-center">
        <SectionHead
        eyebrow="Client voices"
        title="Results people can feel and sustain"
        subtitle="A light snapshot of what clients say after structured coaching and consistent execution."
        maxWidth="full"
      />
      <div className="grid gap-6 md:grid-cols-3">
        {mergedTestimonials.map((t) => (
          <article key={`${t.author}-${t.quote.slice(0, 32)}`} className="ds-card-elevated p-6">
            <p className="text-body text-ink-muted mb-5">&ldquo;{t.quote}&rdquo;</p>
            <p className="text-caption text-ink">
              <strong>{t.author}</strong> <span className="text-ink-muted">— {t.location}</span>
            </p>
            {t.source === "yelp" && (
              <a
                href={YELP_BUSINESS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex text-[11px] uppercase tracking-[0.12em] text-ink-subtle hover:text-ink transition-colors"
              >
                Source: Yelp
              </a>
            )}
          </article>
        ))}
      </div>
      <div className="mt-8 md:mt-10 lg:mt-12 ds-card p-5 max-w-5xl">
        <p className="text-caption text-ink-muted">
          {remoteReviews.length > 0
            ? "Yelp reviews are loaded live and appended to curated client testimonials."
            : reviewsError
              ? "Live Yelp reviews are temporarily unavailable. Verified local testimonials remain visible."
              : hasRemoteEndpoint
                ? "Loading live Yelp reviews..."
                : "Verified local testimonials are shown. Live Yelp feed can be enabled anytime."}
        </p>
      </div>
      </div>
    </section>
  );
}
