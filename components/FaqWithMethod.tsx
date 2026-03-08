"use client";

import { useState, useEffect } from "react";
import { Section, SectionHead } from "./Section";
import { HowItWorksSteps } from "./HowItWorksSteps";
import { TrustBadges } from "./TrustBadge";

type FaqItem = { q: string; a: string };

const formats = [
  { label: "1:1 Personal Training", note: "In person, 60 minutes", detail: "Hands-on coaching for technique, progression, and confidence." },
  { label: "Online Coaching", note: "Worldwide support", detail: "Structured training and weekly accountability from anywhere." },
  { label: "Nutrition Coaching", note: "Habits, macros, consistency", detail: "Sustainable food strategy tailored to your lifestyle." },
];

const programs = [
  { label: "Body Recomposition", note: "Lose fat, build muscle", detail: "Smart programming to improve shape without extreme methods." },
  { label: "Glute Development", note: "Strength and shape focus", detail: "Targeted lower-body work with progressive overload." },
  { label: "Functional Strength", note: "Move better in daily life", detail: "Better posture, power, and movement quality in real life." },
  { label: "Corrective Training", note: "Posture and imbalances", detail: "Precision work to reduce weak links and improve control." },
  { label: "Postpartum Return", note: "Safe and progressive", detail: "Careful rebuild of strength and confidence after pregnancy." },
];

const whoIsForAnchors = [
  "Women and men ready to build strength and confidence",
  "Busy professionals who need structure that fits real life",
  "Beginners, returners, and intermediate clients who want proper technique",
  "Clients looking for accountability, not random workouts",
];

const credentialsPoints = [
  "Coach since 2018 with a personalized, client-first approach",
  "Specialties: body recomposition, glute development, functional strength",
  "Corrective and rehabilitation-oriented programming when needed",
  "Postpartum-safe progressions and confidence rebuilding",
  "Ongoing guidance and accountability between sessions",
];

const certificates = [
  { src: "/images/credentials/health-sciences-fundamentals.png", title: "Fundamentals of Health Coaching", issuer: "The Health Sciences Academy" },
  { src: "/images/credentials/health-sciences-nutritional-therapist.png", title: "Nutritional Therapist", issuer: "The Health Sciences Academy" },
  { src: "/images/credentials/dietetics-psoriasis.png", title: "Psoriasis: A New Look at an Old Problem", issuer: "School of Dietetics by Ekaterina Oksenyuk" },
  { src: "/images/credentials/ace-nutritional-balance.png", title: "The 3D Approach to Finding Nutritional Balance", issuer: "ACE" },
  { src: "/images/credentials/dietetics-microbiota.png", title: "Healing the Body Through Microbiota Rehabilitation", issuer: "School of Dietetics by Ekaterina Oksenyuk" },
  { src: "/images/credentials/dietetics-psychology.png", title: "Psychological Features in Group Coaching for Weight Loss", issuer: "School of Dietetics by Ekaterina Oksenyuk" },
  { src: "/images/credentials/only-natural-diet.png", title: "5-Day Intensive Course in Dietology", issuer: "Only natural diet / School of Dietetics" },
  { src: "/images/credentials/nasm-nutrition-coach.png", title: "Certified Nutrition Coach", issuer: "NASM" },
  { src: "/images/credentials/nasm-personal-trainer.png", title: "Personal Trainer Certificate", issuer: "NASM" },
  { src: "/images/credentials/cpr-aed-asti.png", title: "CPR/AED (Adult / Child / Infant)", issuer: "American Safety Training Institute" },
  { src: "/images/credentials/red-cross-first-aid-cpr.png", title: "Adult, Child and Baby First Aid/CPR/AED", issuer: "American Red Cross" },
];

const TAB_FROM_HASH: Record<string, "faq" | "method" | "workmodel" | "credentials" | "whoisfor"> = {
  faq: "faq",
  method: "method",
  workmodel: "workmodel",
  credentials: "credentials",
  whoisfor: "whoisfor",
};

export function FaqWithMethod({ faq }: { faq: FaqItem[] }) {
  const [tab, setTab] = useState<"faq" | "method" | "workmodel" | "credentials" | "whoisfor">("method");

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1).toLowerCase() : "";
    if (hash && TAB_FROM_HASH[hash]) setTab(TAB_FROM_HASH[hash]);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const value = tab === "method" ? "" : tab;
    const newHash = value ? `#${value}` : "";
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, "", window.location.pathname + newHash);
    }
  }, [tab]);

  return (
    <Section>
      <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
        <button
          type="button"
          onClick={() => setTab("method")}
          className={`px-4 py-2 rounded-lg text-caption font-medium uppercase tracking-[0.1em] transition-colors ${
            tab === "method"
              ? "bg-ink text-surface"
              : "bg-surface-border/40 text-ink-muted hover:bg-surface-border/60 hover:text-ink"
          }`}
        >
          Method
        </button>
        <button
          type="button"
          onClick={() => setTab("workmodel")}
          className={`px-4 py-2 rounded-lg text-caption font-medium uppercase tracking-[0.1em] transition-colors ${
            tab === "workmodel"
              ? "bg-ink text-surface"
              : "bg-surface-border/40 text-ink-muted hover:bg-surface-border/60 hover:text-ink"
          }`}
        >
          Work model
        </button>
        <button
          type="button"
          onClick={() => setTab("credentials")}
          className={`px-4 py-2 rounded-lg text-caption font-medium uppercase tracking-[0.1em] transition-colors ${
            tab === "credentials"
              ? "bg-ink text-surface"
              : "bg-surface-border/40 text-ink-muted hover:bg-surface-border/60 hover:text-ink"
          }`}
        >
          Credentials & trust
        </button>
        <button
          type="button"
          onClick={() => setTab("whoisfor")}
          className={`px-4 py-2 rounded-lg text-caption font-medium uppercase tracking-[0.1em] transition-colors ${
            tab === "whoisfor"
              ? "bg-ink text-surface"
              : "bg-surface-border/40 text-ink-muted hover:bg-surface-border/60 hover:text-ink"
          }`}
        >
          Who is for
        </button>
        <button
          type="button"
          onClick={() => setTab("faq")}
          className={`px-4 py-2 rounded-lg text-caption font-medium uppercase tracking-[0.1em] transition-colors ${
            tab === "faq"
              ? "bg-ink text-surface"
              : "bg-surface-border/40 text-ink-muted hover:bg-surface-border/60 hover:text-ink"
          }`}
        >
          FAQ
        </button>
      </div>

      {tab === "faq" && (
        <>
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
            </a>
            .
          </p>
        </>
      )}

      {tab === "method" && (
        <>
          <SectionHead
            eyebrow="Method"
            title="A clear coaching system from day one"
            subtitle="Assessment, tailored training, and consistent feedback to keep your momentum strong."
            maxWidth="full"
          />
          <div className="max-w-5xl">
            <p className="text-label uppercase tracking-[0.16em] text-ink-subtle mb-4">Pillars</p>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
              <li className="group ds-card p-5 min-h-[170px] flex flex-col ds-card-hover">
                <h3 className="text-title font-semibold text-ink leading-tight">Assessment</h3>
                <p className="mt-2 text-caption text-ink-muted">Movement, goals, schedule, and baseline habits.</p>
                <p className="text-[11px] text-ink-subtle mt-0 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:mt-3 group-hover:max-h-16 group-hover:opacity-100">
                  Initial screening sets priorities and prevents random programming.
                </p>
              </li>
              <li className="group ds-card p-5 min-h-[170px] flex flex-col ds-card-hover">
                <h3 className="text-title font-semibold text-ink leading-tight">Coaching Core</h3>
                <p className="mt-2 text-caption text-ink-muted">Training plan, nutrition targets, and weekly adjustments.</p>
                <p className="text-[11px] text-ink-subtle mt-0 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:mt-3 group-hover:max-h-16 group-hover:opacity-100">
                  The plan evolves with your results, recovery, and lifestyle.
                </p>
              </li>
              <li className="group ds-card p-5 min-h-[170px] flex flex-col ds-card-hover">
                <h3 className="text-title font-semibold text-ink leading-tight">Execution</h3>
                <p className="mt-2 text-caption text-ink-muted">Confident sessions, real accountability, measurable results.</p>
                <p className="text-[11px] text-ink-subtle mt-0 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:mt-3 group-hover:max-h-16 group-hover:opacity-100">
                  You always know what to do next and why it matters.
                </p>
              </li>
            </ul>
            <p className="mt-6 text-caption text-ink-subtle">
              Built for consistency and long-term body confidence.
            </p>
            <HowItWorksSteps />
          </div>
        </>
      )}

      {tab === "credentials" && (
        <>
          <SectionHead
            eyebrow="Credentials & trust"
            title="Experience you can feel in every session"
            subtitle="Structured coaching, careful technique, and an approach built for long-term progress."
            maxWidth="full"
          />
          <div className="max-w-5xl">
            <ul className="grid gap-3 md:grid-cols-2 text-caption text-ink-muted mb-8">
              {credentialsPoints.map((p) => (
                <li key={p} className="ds-card flex items-start gap-2 px-4 py-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" aria-hidden />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <TrustBadges />
            <h3 className="text-label uppercase tracking-[0.16em] text-ink-subtle mt-10 mb-4">Certificates</h3>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
              {certificates.map((cert) => (
                <li key={cert.src} className="ds-card overflow-hidden p-0">
                  <div className="aspect-[3/4] bg-surface-border/30 relative">
                    <img
                      src={cert.src}
                      alt={`${cert.title} — ${cert.issuer}`}
                      className="absolute inset-0 w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3 text-left">
                    <p className="text-caption font-medium text-ink line-clamp-2">{cert.title}</p>
                    <p className="text-[11px] text-ink-subtle mt-0.5">{cert.issuer}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {tab === "whoisfor" && (
        <>
          <SectionHead
            eyebrow="Who it's for"
            title="Built for people serious about change"
            subtitle="No gimmicks. Just coaching that meets you where you are and moves you forward."
            maxWidth="full"
          />
          <div className="max-w-5xl">
            <ul className="grid gap-4 md:grid-cols-2 text-body text-ink-muted items-stretch">
              {whoIsForAnchors.map((line) => (
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
        </>
      )}

      {tab === "workmodel" && (
        <>
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
                  <p className="ds-pill self-start ds-pill-accent-hover">Format</p>
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
                  <p className="ds-pill self-start ds-pill-accent-hover">Program</p>
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
        </>
      )}
    </Section>
  );
}
