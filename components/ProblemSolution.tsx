import { Section, SectionHead } from "./Section";
import { HowItWorksSteps } from "./HowItWorksSteps";

export function ProblemSolution() {
  return (
    <>
      <Section id="services" ariaLabel="Services overview">
        <SectionHead
          eyebrow="Services"
          title="One coach. Multiple ways to work together."
          subtitle="Choose the format that fits your life right now: in-person sessions, online coaching, or nutrition-focused support."
          maxWidth="full"
        />
        <div className="max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 items-stretch">
            <div className="ds-card-elevated p-6 h-full min-h-[250px] flex flex-col">
              <p className="text-label uppercase tracking-[0.14em] text-ink-subtle mb-2">1:1 in-person</p>
              <h3 className="text-title font-semibold text-ink mb-2">Private Training Session</h3>
              <p className="text-caption text-ink-subtle mb-3">Bay Area • 60 minutes</p>
              <p className="text-body text-ink-muted mb-4 flex-1">Hands-on coaching for form, progression, and confidence in every rep.</p>
              <p className="text-body font-semibold text-ink">Included in Essentials / Signature / Atelier packages</p>
            </div>
            <div className="ds-card-elevated p-6 h-full min-h-[250px] flex flex-col">
              <p className="text-label uppercase tracking-[0.14em] text-ink-subtle mb-2">Online coaching</p>
              <h3 className="text-title font-semibold text-ink mb-2">Hybrid Accountability Plan</h3>
              <p className="text-caption text-ink-subtle mb-3">Worldwide • weekly check-ins</p>
              <p className="text-body text-ink-muted mb-4 flex-1">Custom programming, chat support, progress review, and plan updates.</p>
              <p className="text-body font-semibold text-ink">Most clients choose Signature package</p>
            </div>
            <div className="ds-card-elevated p-6 h-full min-h-[250px] flex flex-col md:col-span-2 xl:col-span-1">
              <p className="text-label uppercase tracking-[0.14em] text-ink-subtle mb-2">Nutrition only</p>
              <h3 className="text-title font-semibold text-ink mb-2">3-Month Nutrition Coaching</h3>
              <p className="text-caption text-ink-subtle mb-3">Macros • habits • consistency</p>
              <p className="text-body text-ink-muted mb-4 flex-1">Personalized strategy for fat loss, energy, and sustainable food routines.</p>
              <p className="text-body font-semibold text-ink">Nutrition-Only package: $320 / month</p>
            </div>
          </div>
          <div className="mt-6 ds-card p-5 max-w-5xl">
            <p className="text-caption text-ink-muted">
              Service formats stay fixed; package level is selected in booking based on support depth and session frequency.
            </p>
          </div>
        </div>
      </Section>

      <Section id="method" ariaLabel="Coaching method">
        <SectionHead
          eyebrow="Method"
          title="A clear coaching system from day one"
          subtitle="Assessment, tailored training, and consistent feedback to keep your momentum strong."
          maxWidth="full"
        />
        <div className="relative ds-panel p-8 md:p-10 overflow-hidden max-w-5xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-mute/20 rounded-full -translate-y-1/2 translate-x-1/2 bounded-blur" aria-hidden />
          <div className="relative grid gap-4 md:grid-cols-3 text-center items-stretch">
            <div className="group ds-card p-6 min-h-[130px] flex flex-col justify-center ds-card-hover">
              <p className="ds-pill self-center mb-3 ds-pill-accent-hover">
                Assessment
              </p>
              <p className="text-caption text-ink-muted">Movement, goals, schedule, and baseline habits.</p>
              <p className="text-[11px] text-ink-subtle mt-0 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:mt-3 group-hover:max-h-14 group-hover:opacity-100">
                Initial screening sets priorities and prevents random programming.
              </p>
            </div>
            <div className="group ds-card p-6 min-h-[130px] flex flex-col justify-center ds-card-hover">
              <p className="ds-pill self-center mb-3 ds-pill-accent-hover">
                Coaching Core
              </p>
              <p className="text-caption text-ink-muted">Training plan, nutrition targets, and weekly adjustments.</p>
              <p className="text-[11px] text-ink-subtle mt-0 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:mt-3 group-hover:max-h-14 group-hover:opacity-100">
                The plan evolves with your results, recovery, and lifestyle.
              </p>
            </div>
            <div className="group ds-card p-6 min-h-[130px] flex flex-col justify-center ds-card-hover">
              <p className="ds-pill self-center mb-3 ds-pill-accent-hover">
                Execution
              </p>
              <p className="text-caption text-ink-muted">Confident sessions, real accountability, measurable results.</p>
              <p className="text-[11px] text-ink-subtle mt-0 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:mt-3 group-hover:max-h-14 group-hover:opacity-100">
                You always know what to do next and why it matters.
              </p>
            </div>
          </div>
          <p className="relative mt-5 text-center text-caption text-ink-subtle">
            Built for consistency and long-term body confidence.
          </p>
        </div>
        <HowItWorksSteps />
      </Section>
    </>
  );
}
