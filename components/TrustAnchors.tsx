import { Section, SectionHead } from "./Section";

const anchors = [
  "Women and men ready to build strength and confidence",
  "Busy professionals who need structure that fits real life",
  "Beginners, returners, and intermediate clients who want proper technique",
  "Clients looking for accountability, not random workouts",
];

export function TrustAnchors() {
  return (
    <Section id="who-uses" ariaLabel="Who is already using this">
      <SectionHead
        eyebrow="Who it's for"
        title="Built for people serious about change"
        subtitle="No gimmicks. Just coaching that meets you where you are and moves you forward."
        maxWidth="full"
      />
      <div className="max-w-5xl">
        <ul className="grid gap-4 md:grid-cols-2 text-body text-ink-muted items-stretch">
          {anchors.map((line) => (
            <li
              key={line}
              className="group ds-card ds-card-hover flex items-start gap-3 px-5 py-4"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              <span className="group-hover:text-ink transition-colors">{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
