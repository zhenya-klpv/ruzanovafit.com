import { SectionHead } from "./Section";

const pillars = [
  {
    id: "sovereignty",
    title: "Personalized Coaching",
    body: "Every plan is shaped around your body, lifestyle, schedule, and goals. No copy-paste programs.",
  },
  {
    id: "explainability",
    title: "Science Before Noise",
    body: "Training and nutrition choices are evidence-based, practical, and built for progress you can measure.",
  },
  {
    id: "bounded",
    title: "Sustainable Results",
    body: "The goal is not a two-week sprint. We build strength, confidence, and habits that last beyond one season.",
  },
];

export function Philosophy() {
  return (
    <section id="about" aria-label="About and philosophy" className="relative">
      <div className="absolute inset-0 -z-10 min-h-full w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/images/section2-bg.jpg)" }} aria-hidden />
      <div className="absolute inset-0 -z-10 min-h-full w-full bg-gradient-to-b from-surface/92 via-surface/95 to-surface/98" aria-hidden />
      <div className="relative max-w-6xl mx-auto py-14 md:py-30 px-4 sm:px-6 lg:px-8">
        {/* Content pushed right on desktop so photo is visible on the left */}
        <div className="lg:ml-auto lg:max-w-2xl xl:max-w-3xl">
          <SectionHead
            eyebrow="About"
            title="Hi, I'm Alena. I coach with precision, empathy, and high standards."
            subtitle="From first session to long-term transformation, your progress is built with structure and support."
            maxWidth="full"
          />
          {/* Mobile: short subtitle only */}
          <p className="md:hidden mt-2 text-body text-ink-muted mb-6">Your progress, your pace.</p>
          <div className="mb-10">
            <div className="ds-card-elevated p-5 md:p-8 flex flex-col justify-center">
              <p className="text-label uppercase tracking-[0.16em] text-ink-subtle mb-3">Coach profile</p>
              {/* Mobile: one short paragraph + pills */}
              <p className="md:hidden text-body text-ink-muted mb-4">
                NASM-certified trainer and nutrition coach. Science-first approach, personalized plans, lasting results.
              </p>
              <div className="hidden md:block">
                <p className="text-body text-ink-muted mb-3">
                  NASM-certified personal trainer and nutrition coach with a science-first approach to body recomposition, strength, and confident movement.
                </p>
                <p className="text-body text-ink-muted mb-4">
                  Education in engineering and pedagogy shapes every program: precise structure, clear progression, and support that is both strategic and human.
                </p>
                <p className="text-body text-ink-muted mb-4">
                  I work with women and men across different phases: beginners, athletes, postpartum return, and clients rebuilding after long breaks. The principle stays the same: quality movement first, then progressive overload, then sustainable lifestyle integration.
                </p>
                <p className="text-body text-ink-muted mb-5">
                  My philosophy from day one: no copy-paste plans, no extremes, no empty motivation. We combine strength training, nutrition structure, and accountability so your results are visible and lasting, not temporary.
                </p>
                <ul className="space-y-2 text-caption text-ink-muted mb-5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    Specialties: body recomposition, glute development, functional strength
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    Corrective approach for posture, movement quality, and injury prevention
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    Coaching style: calm precision, clear standards, and consistent support
                  </li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-3 text-caption text-ink-muted">
                <span className="ds-pill normal-case tracking-normal text-caption">Coach since 2018</span>
                <span className="ds-pill normal-case tracking-normal text-caption">Bay Area + Online</span>
                <span className="ds-pill normal-case tracking-normal text-caption">Evidence-based</span>
              </div>
            </div>
          </div>
          <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-10">
            {pillars.map((p, i) => (
              <article
                key={p.id}
                className="ds-card-elevated p-5 md:p-8 lg:col-span-1"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <h3 className="text-title font-semibold text-ink mb-2 md:mb-3 tracking-tight">
                  {p.id === "bounded" ? (
                    <>Sustainable<br />Results</>
                  ) : (
                    p.title
                  )}
                </h3>
                {/* Mobile: shorter pillar text */}
                <p className="md:hidden text-caption text-ink-muted">
                  {p.id === "sovereignty" && "Plans shaped around you. No copy-paste."}
                  {p.id === "explainability" && "Evidence-based training and nutrition."}
                  {p.id === "bounded" && "Strength and habits that last."}
                </p>
                <p className="hidden md:block text-body text-ink-muted prose-narrow">
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
