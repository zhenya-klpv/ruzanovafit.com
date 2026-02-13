import { Section } from "./Section";

export function CTA() {
  return (
    <Section id="contact" className="text-center" ariaLabel="Contact">
      <div className="max-w-prose mx-auto">
        <h2 className="text-headline font-semibold text-ink mb-4">
          Build your strongest body with coaching that is structured, personal, and sustainable.
        </h2>
        <p className="text-body text-ink-muted mb-8">
          In-person training in California and online coaching worldwide. Personalized plans, nutrition guidance, and real accountability.
        </p>
        <p className="text-caption text-ink-subtle">
          Contact us for a free consultation.
        </p>
      </div>
    </Section>
  );
}
