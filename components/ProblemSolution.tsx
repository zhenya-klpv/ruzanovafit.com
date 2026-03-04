import { SectionHead } from "./Section";

export function ProblemSolution() {
  return (
    <>
      <section id="services" aria-label="Services overview" className="relative">
        <div className="absolute inset-0 -z-10 min-h-full w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/images/services-bg.jpg)" }} aria-hidden />
        <div className="absolute inset-0 -z-10 min-h-full w-full bg-gradient-to-b from-surface/92 via-surface/96 to-surface/98" aria-hidden />
        <div className="relative max-w-6xl mx-auto py-14 md:py-24 lg:py-32 xl:py-40 px-4 sm:px-6 lg:px-8 md:min-h-[85vh] lg:min-h-[90vh] md:flex md:flex-col md:justify-center">
        <SectionHead
          eyebrow="Services"
          title="One coach. Multiple ways to work together."
          subtitle="Choose the format that fits your life right now: in-person sessions, online coaching, or nutrition-focused support."
          maxWidth="full"
        />
        <p className="md:hidden text-body text-ink-muted mb-6">In-person, online, or nutrition-only. You choose.</p>
        <div className="max-w-5xl w-full">
          <div className="grid gap-6 md:gap-8 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 items-stretch">
            <div className="ds-card-elevated p-6 h-full min-h-[250px] md:min-h-[280px] flex flex-col">
              <p className="text-label uppercase tracking-[0.14em] text-ink-subtle mb-2">1:1 in-person</p>
              <h3 className="text-title font-semibold text-ink mb-2">Private Training Session</h3>
              <p className="text-caption text-ink-subtle mb-3">Bay Area · 60 minutes</p>
              <p className="text-body text-ink-muted mb-4 flex-1 leading-relaxed">Hands-on coaching for form, progression, and confidence—every rep counts.</p>
              <p className="text-body font-semibold text-ink leading-snug">Included in Essentials, Signature & Atelier packages</p>
            </div>
            <div className="ds-card-elevated p-6 h-full min-h-[250px] md:min-h-[280px] flex flex-col">
              <p className="text-label uppercase tracking-[0.14em] text-ink-subtle mb-2">1:1 & Online coaching</p>
              <h3 className="text-title font-semibold text-ink mb-2">Hybrid Accountability Plan</h3>
              <p className="text-caption text-ink-subtle mb-3">Bay Area & Worldwide · weekly check-ins</p>
              <p className="text-body text-ink-muted mb-4 flex-1 leading-relaxed">Custom programming, chat support, and progress review—with plan updates.</p>
              <p className="text-body font-semibold text-ink leading-snug">Most clients choose: Signature package</p>
            </div>
            <div className="ds-card-elevated p-6 h-full min-h-[250px] md:min-h-[280px] flex flex-col md:col-span-2 xl:col-span-1">
              <p className="text-label uppercase tracking-[0.14em] text-ink-subtle mb-2">Nutrition only</p>
              <h3 className="text-title font-semibold text-ink mb-2">3-Month Nutrition Coaching</h3>
              <p className="text-caption text-ink-subtle mb-3">Macros • Habits • Consistency</p>
              <p className="text-body text-ink-muted mb-4 flex-1">Personalized strategy for fat loss, energy, and sustainable food routines.</p>
              <p className="text-body font-semibold text-ink">Nutrition-Only: monthly package</p>
            </div>
          </div>
          <div className="mt-8 md:mt-10 lg:mt-12 ds-card p-5 max-w-5xl">
            <p className="text-caption text-ink-muted">
              Service formats stay fixed; package level is selected in booking based on support depth and session frequency.
            </p>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
