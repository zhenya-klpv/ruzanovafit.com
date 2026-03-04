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
      <p className="text-label uppercase tracking-[0.16em] text-ink-subtle mt-8 mb-4">
        Flow
      </p>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
        {steps.map((s) => (
          <li
            key={s.step}
            className="group ds-card p-5 min-h-[170px] flex flex-col ds-card-hover"
          >
            <p className="ds-pill self-start ds-pill-accent-hover">Step {s.step}</p>
            <h3 className="mt-3 text-title font-semibold text-ink leading-tight">{s.title}</h3>
            <p className="mt-2 text-caption text-ink-muted">{s.body}</p>
            <p className="text-[11px] text-ink-subtle mt-0 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:mt-3 group-hover:max-h-16 group-hover:opacity-100">
              {s.detail}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-caption text-ink-subtle">
        Real support. Real structure. Real results.
      </p>
    </div>
  );
}
