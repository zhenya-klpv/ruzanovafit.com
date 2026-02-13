import { Section, SectionHead } from "./Section";

const formats = [
  {
    label: "1:1 Personal Training",
    note: "In person, 60 minutes",
    detail: "Hands-on coaching for technique, progression, and confidence.",
  },
  {
    label: "Online Coaching",
    note: "Worldwide support",
    detail: "Structured training and weekly accountability from anywhere.",
  },
  {
    label: "Nutrition Coaching",
    note: "Habits, macros, consistency",
    detail: "Sustainable food strategy tailored to your lifestyle.",
  },
];

const programs = [
  {
    label: "Body Recomposition",
    note: "Lose fat, build muscle",
    detail: "Smart programming to improve shape without extreme methods.",
  },
  {
    label: "Glute Development",
    note: "Strength and shape focus",
    detail: "Targeted lower-body work with progressive overload.",
  },
  {
    label: "Functional Strength",
    note: "Move better in daily life",
    detail: "Better posture, power, and movement quality in real life.",
  },
  {
    label: "Corrective Training",
    note: "Posture and imbalances",
    detail: "Precision work to reduce weak links and improve control.",
  },
  {
    label: "Postpartum Return",
    note: "Safe and progressive",
    detail: "Careful rebuild of strength and confidence after pregnancy.",
  },
];

export function InputTypes() {
  return (
    <Section id="offers" ariaLabel="Coaching formats">
      <SectionHead
        eyebrow="Work model"
        title="Formats and programs, clearly separated"
        subtitle="Choose how we work together, then choose the program direction that matches your current phase."
        maxWidth="full"
      />
      <div className="max-w-5xl">
        <p className="text-label uppercase tracking-[0.16em] text-ink-subtle mb-4">Formats</p>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {formats.map((f) => (
            <li key={f.label} className="group ds-card p-5 min-h-[170px] flex flex-col ds-card-hover">
              <p className="ds-pill self-start ds-pill-accent-hover">
                Format
              </p>
              <h3 className="mt-3 text-title font-semibold text-ink leading-tight">{f.label}</h3>
              {f.note && <p className="mt-2 text-caption text-ink-muted">{f.note}</p>}
              <p className="text-[11px] text-ink-subtle mt-0 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:mt-3 group-hover:max-h-16 group-hover:opacity-100">
                {f.detail}
              </p>
            </li>
          ))}
        </ul>

        <p className="text-label uppercase tracking-[0.16em] text-ink-subtle mt-8 mb-4">Programs</p>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 items-stretch">
          {programs.map((f) => (
            <li key={f.label} className="group ds-card p-5 min-h-[170px] flex flex-col ds-card-hover">
              <p className="ds-pill self-start ds-pill-accent-hover">
                Program
              </p>
              <h3 className="mt-3 text-title font-semibold text-ink leading-tight">{f.label}</h3>
              {f.note && <p className="mt-2 text-caption text-ink-muted">{f.note}</p>}
              <p className="text-[11px] text-ink-subtle mt-0 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:mt-3 group-hover:max-h-16 group-hover:opacity-100">
                {f.detail}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-caption text-ink-subtle">
          Package level and coaching cadence are selected in the booking step after the initial assessment.
        </p>
      </div>
    </Section>
  );
}
