import { Section, SectionHead } from "./Section";

const cases = [
  {
    title: "Body recomposition",
    examples: ["Lose body fat without losing curves", "Build lean muscle with structure", "Stay consistent without extremes"],
  },
  {
    title: "Strength and confidence",
    examples: ["Master form and gym technique", "Increase power and stability", "Train with purpose, not guesswork"],
  },
  {
    title: "Nutrition and lifestyle",
    examples: ["Create sustainable eating habits", "Follow macros with flexibility", "Build routines that fit real life"],
  },
];

export function UseCases() {
  return (
    <Section id="use-cases" ariaLabel="Use cases">
      <SectionHead
        eyebrow="Goals"
        title="Coaching for real-life transformation"
        subtitle="For women and men who want visible results, expert guidance, and accountability that lasts."
      />
      <ul className="flex flex-wrap gap-3 mb-8 text-caption text-ink-muted">
        <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />In-person in the Bay Area</li>
        <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />Online coaching worldwide</li>
        <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />Nutrition support and accountability</li>
      </ul>
      <div className="grid gap-8 md:grid-cols-3">
        {cases.map((c) => (
          <article key={c.title} className="rounded-xl glass-panel p-6 luxury-border">
            <h3 className="text-title font-semibold text-ink mb-4">{c.title}</h3>
            <ul className="space-y-2 text-body text-ink-muted">
              {c.examples.map((ex) => (
                <li key={ex} className="flex gap-2">
                  <span className="text-accent mt-0.5">→</span>
                  <span>{ex}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
