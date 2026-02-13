import Link from "next/link";
import { Section, SectionHead } from "@/components/Section";

const faq = [
  {
    q: "Do I need to be in shape before starting?",
    a: "Not at all. Programs are built for your current level, from complete beginners to experienced clients.",
  },
  {
    q: "How long is one personal training session?",
    a: "Standard sessions are 60 minutes, including warm-up, focused work, and recovery guidance.",
  },
  {
    q: "Can I train online if I am outside California?",
    a: "Yes. Online coaching is available worldwide and includes structure, check-ins, and support.",
  },
  {
    q: "Do you provide nutrition coaching?",
    a: "Yes. Nutrition is integrated into coaching plans, and a dedicated nutrition-only program is also available.",
  },
  {
    q: "Can I train at home?",
    a: "Absolutely. Programs are adapted to your environment, with or without gym equipment.",
  },
  {
    q: "How soon will I see results?",
    a: "Most clients feel stronger and more energetic within the first few weeks. Visible body changes usually follow with consistent training and nutrition.",
  },
];

export const metadata = {
  title: "FAQ — Ruzanova Fitness",
  description: "Frequently asked questions about training, online coaching, nutrition, and booking.",
};

export default function SecurityPage() {
  return (
    <>
      <header className="border-b border-surface-border/60 bg-surface/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-caption uppercase tracking-[0.1em] text-ink-muted hover:text-ink transition-colors">
            ← Ruzanova Fitness
          </Link>
        </div>
      </header>
      <main>
        <Section>
          <SectionHead
            eyebrow="FAQ"
            title="Questions clients ask before starting"
            subtitle="Practical answers about coaching format, expectations, and next steps."
            maxWidth="full"
          />
          <dl className="grid gap-4 md:grid-cols-2 max-w-5xl">
            {faq.map((item) => (
              <div key={item.q} className="ds-card p-5 md:p-6">
                <dt className="text-title font-semibold text-ink mb-3">{item.q}</dt>
                <dd className="text-body text-ink-muted">{item.a}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 pt-8 border-t border-surface-border max-w-5xl">
            <h3 className="text-title font-semibold text-ink mb-4">Coaching principles</h3>
            <ul className="grid gap-3 md:grid-cols-2 text-body text-ink-muted">
              <li className="ds-card flex items-start gap-2 px-4 py-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                Personalized plans, not one-size-fits-all templates
              </li>
              <li className="ds-card flex items-start gap-2 px-4 py-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                Technique quality and safety come first
              </li>
              <li className="ds-card flex items-start gap-2 px-4 py-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                Sustainable progress over quick-fix intensity
              </li>
              <li className="ds-card flex items-start gap-2 px-4 py-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                Accountability and support through every phase
              </li>
            </ul>
          </div>

          <p className="mt-12 text-caption text-ink-subtle max-w-5xl">
            For booking requests and coaching questions,{" "}
            <a href="mailto:info@ruzanovafit.com?subject=Coaching%20Question" className="text-accent underline hover:no-underline">
              email us
            </a>.
          </p>
        </Section>
      </main>
    </>
  );
}
