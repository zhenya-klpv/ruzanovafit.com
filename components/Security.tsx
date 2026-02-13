import { Section, SectionHead } from "./Section";
import { TrustBadges } from "./TrustBadge";

const points = [
  "Coach since 2018 with a personalized, client-first approach",
  "Specialties: body recomposition, glute development, functional strength",
  "Corrective and rehabilitation-oriented programming when needed",
  "Postpartum-safe progressions and confidence rebuilding",
  "Ongoing guidance and accountability between sessions",
];

export function Security() {
  return (
    <Section id="security" className="ds-panel" ariaLabel="Security and trust">
      <SectionHead
        eyebrow="Credentials & trust"
        title="Experience you can feel in every session"
        subtitle="Structured coaching, careful technique, and an approach built for long-term progress."
        maxWidth="full"
      />
      <div className="max-w-5xl">
        <TrustBadges />
        <ul className="mt-8 grid gap-3 md:grid-cols-2 text-caption text-ink-muted">
          {points.map((p) => (
            <li key={p} className="ds-card flex items-start gap-2 px-4 py-3">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" aria-hidden />
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <a
            href="/security/"
            className="ds-btn-secondary border-accent/60 text-accent hover:bg-accent-mute/25"
          >
            FAQ and coaching details →
          </a>
        </div>
      </div>
    </Section>
  );
}
