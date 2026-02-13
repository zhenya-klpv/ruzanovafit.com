import { Section, SectionHead } from "./Section";
import Image from "next/image";

const ABOUT_IMAGE = "/images/about-cutout.webp";

const pillars = [
  {
    id: "sovereignty",
    title: "Personalized Coaching",
    body: "Every plan is shaped around your body, lifestyle, schedule, and goals. No copy-paste programs.",
  },
  {
    id: "explainability",
    title: "Science Before Noise",
    body: "Training and nutrition choices are evidence-based, practical, and built for progress you can measure.",
  },
  {
    id: "bounded",
    title: "Sustainable Results",
    body: "The goal is not a two-week sprint. We build strength, confidence, and habits that last beyond one season.",
  },
];

export function Philosophy() {
  return (
    <Section id="about" ariaLabel="About and philosophy">
      <SectionHead
        eyebrow="About"
        title="Hi, I'm Alena. I coach with precision, empathy, and high standards."
        subtitle="From first session to long-term transformation, your progress is built with structure and support."
        maxWidth="full"
      />
      <div className="grid gap-8 lg:grid-cols-12 items-stretch mb-10">
        <div className="lg:col-span-5">
          <div className="fog-frame mx-auto w-full max-w-[420px] lg:max-w-none h-[560px] flex items-end justify-center">
          <Image
            src={ABOUT_IMAGE}
            alt="Alena Ruzanova portrait"
            width={560}
            height={840}
            className="h-[92%] w-auto max-w-[82%] object-contain portrait-soft"
            unoptimized
          />
          </div>
        </div>
        <div className="lg:col-span-7 ds-card-elevated p-6 md:p-8 flex flex-col justify-center min-h-[560px]">
          <p className="text-label uppercase tracking-[0.16em] text-ink-subtle mb-3">Coach profile</p>
          <p className="text-body text-ink-muted mb-3">
            NASM-certified personal trainer and nutrition coach with a science-first approach to body recomposition, strength, and confident movement.
          </p>
          <p className="text-body text-ink-muted mb-4">
            Education in engineering and pedagogy shapes every program: precise structure, clear progression, and support that is both strategic and human.
          </p>
          <p className="text-body text-ink-muted mb-4">
            I work with women and men across different phases: beginners, athletes, postpartum return, and clients rebuilding after long breaks. The principle stays the same: quality movement first, then progressive overload, then sustainable lifestyle integration.
          </p>
          <p className="text-body text-ink-muted mb-5">
            My philosophy from day one: no copy-paste plans, no extremes, no empty motivation. We combine strength training, nutrition structure, and accountability so your results are visible and lasting, not temporary.
          </p>
          <ul className="space-y-2 text-caption text-ink-muted mb-5">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              Specialties: body recomposition, glute development, functional strength
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              Corrective approach for posture, movement quality, and injury prevention
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              Coaching style: calm precision, clear standards, and consistent support
            </li>
          </ul>
          <div className="flex flex-wrap gap-3 text-caption text-ink-muted">
            <span className="ds-pill normal-case tracking-normal text-caption">Coach since 2018</span>
            <span className="ds-pill normal-case tracking-normal text-caption">Bay Area + Online</span>
            <span className="ds-pill normal-case tracking-normal text-caption">Evidence-based</span>
          </div>
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {pillars.map((p, i) => (
          <article
            key={p.id}
            className="ds-card-elevated p-6 md:p-8"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <h3 className="text-title font-semibold text-ink mb-3 tracking-tight">
              {p.title}
            </h3>
            <p className="text-body text-ink-muted prose-narrow">
              {p.body}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
