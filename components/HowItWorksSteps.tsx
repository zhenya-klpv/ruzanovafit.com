import { Section } from "./Section";

const steps = [
  {
    step: "1",
    title: "Assess",
    body: "We start with goals, movement quality, training history, and daily routine to build your personal baseline.",
    detail: "Clear baseline reduces guesswork and accelerates progress.",
  },
  {
    step: "2",
    title: "Program",
    body: "You receive a tailored training structure plus nutrition guidance designed for your body and schedule.",
    detail: "Custom structure adapts to your life, not the other way around.",
  },
  {
    step: "3",
    title: "Coach",
    body: "Sessions and check-ins keep you accountable. Technique is refined and the plan evolves as you progress.",
    detail: "Regular feedback keeps momentum strong and standards high.",
  },
  {
    step: "4",
    title: "Transform",
    body: "Strength, confidence, and body composition improve through consistency, not crash methods.",
    detail: "Results are built for retention, not short-term spikes.",
  },
];

export function HowItWorksSteps() {
  return (
    <div className="mt-10 md:mt-12 max-w-5xl">
      <p className="text-label uppercase tracking-wider text-ink-subtle mb-6 text-center">
        Flow
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
        {steps.map((s) => (
          <div
            key={s.step}
            className="group ds-card p-5 h-full min-h-[200px] flex flex-col ds-card-hover"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-surface text-caption font-semibold mb-3">
              {s.step}
            </span>
            <h3 className="text-title font-semibold text-ink mb-2">{s.title}</h3>
            <p className="text-caption text-ink-muted flex-1">{s.body}</p>
            <p className="text-[11px] text-ink-subtle mt-0 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:mt-3 group-hover:max-h-14 group-hover:opacity-100">
              {s.detail}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-center text-caption text-ink-muted">
        Real support. Real structure. Real results.
      </p>
    </div>
  );
}
