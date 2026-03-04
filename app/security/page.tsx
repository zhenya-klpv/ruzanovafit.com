import Link from "next/link";
import { FaqWithMethod } from "@/components/FaqWithMethod";

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
        <FaqWithMethod faq={faq} />
      </main>
    </>
  );
}
