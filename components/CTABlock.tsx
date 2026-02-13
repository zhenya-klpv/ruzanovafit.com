"use client";

import emailjs from "@emailjs/browser";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Section } from "./Section";

const pricing = [
  { item: "Essentials", detail: "4 sessions / month", price: "$520" },
  { item: "Signature", detail: "8 sessions / month + nutrition guidance", price: "$980" },
  { item: "Atelier", detail: "12 sessions / month + priority support", price: "$1,380" },
  { item: "Nutrition-Only", detail: "Weekly review + macro coaching", price: "$320 / month" },
];

const formats = [
  "1:1 Personal Training (Bay Area)",
  "Online Coaching (Worldwide)",
  "Nutrition Coaching",
];

const programs = [
  "Body Recomposition",
  "Glute Development",
  "Functional Strength",
  "Corrective Training",
  "Postpartum Return",
];

type RequestForm = {
  packageName: string;
  fullName: string;
  email: string;
  phone: string;
  format: string;
  program: string;
  goal: string;
  notes: string;
};

export function CTABlock() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activePackage, setActivePackage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [form, setForm] = useState<RequestForm>({
    packageName: "General consultation",
    fullName: "",
    email: "",
    phone: "",
    format: "",
    program: "",
    goal: "",
    notes: "",
  });

  function openRequest(packageName?: string) {
    const chosenPackage = packageName ?? "General consultation";
    setActivePackage(chosenPackage);
    setModalOpen(true);
    setSubmitStatus(null);
    setForm((prev) => ({ ...prev, packageName: chosenPackage }));
  }

  function closeModal() {
    setModalOpen(false);
    setSubmitStatus(null);
  }

  useEffect(() => {
    if (!modalOpen) return;

    const modalNode = modalRef.current;
    if (!modalNode) return;

    const focusable = modalNode.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length > 0) {
      focusable[0].focus();
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [modalOpen]);

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSending) return;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSubmitStatus({
        type: "error",
        text: "Email delivery is not configured. Add EmailJS env values first.",
      });
      return;
    }

    const selectedPackage = form.packageName || activePackage || "General consultation";
    setIsSending(true);
    setSubmitStatus(null);

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.fullName,
          from_email: form.email,
          phone: form.phone || "Not provided",
          package_name: selectedPackage,
          coaching_format: form.format,
          program_name: form.program,
          goal: form.goal || "Not provided",
          notes: form.notes || "Not provided",
          message:
            `New package request from website\n\n` +
            `Package: ${selectedPackage}\n` +
            `Format: ${form.format}\n` +
            `Program: ${form.program}\n` +
            `Name: ${form.fullName}\n` +
            `Email: ${form.email}\n` +
            `Phone: ${form.phone || "Not provided"}\n` +
            `Goal: ${form.goal || "Not provided"}\n` +
            `Notes: ${form.notes || "Not provided"}`,
          to_email: "info@ruzanovafit.com",
        },
        { publicKey },
      );

      setSubmitStatus({
        type: "success",
        text: "Request sent successfully. Alena will contact you shortly.",
      });
      setForm((prev) => ({
        ...prev,
        packageName: selectedPackage,
        fullName: "",
        email: "",
        phone: "",
        format: "",
        program: "",
        goal: "",
        notes: "",
      }));
    } catch {
      setSubmitStatus({
        type: "error",
        text: "Could not send right now. Please try again or email directly.",
      });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <>
      <Section id="contact" className="ds-panel" ariaLabel="Contact and next steps">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <p className="text-label uppercase tracking-[0.16em] text-ink-subtle mb-2">Book now</p>
            <h2 className="text-headline font-semibold text-ink mb-2">
              Book your free assessment
            </h2>
          </div>
          <p className="text-body text-ink-muted mb-8 max-w-3xl mx-auto text-center">
            Start with a personalized consultation to map your goals, current level, and the coaching path that fits you best.
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-10">
            {pricing.map((p) => (
              <button
                key={p.item}
                type="button"
                className="ds-card-elevated p-5 text-left ds-card-hover focus-visible:outline-none"
                onClick={() => openRequest(p.item)}
              >
                <p className="text-label uppercase tracking-[0.13em] text-ink-subtle mb-2">{p.item}</p>
                <p className="text-title font-semibold text-ink mb-2">{p.price}</p>
                <p className="text-caption text-ink-muted">{p.detail}</p>
                <p className="mt-3 text-[11px] uppercase tracking-[0.12em] text-accent">
                  Select package -&gt;
                </p>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <button
              type="button"
              onClick={() => openRequest("General consultation")}
              className="ds-btn-primary"
            >
              Request consultation
            </button>
            <a
              href="#security"
              className="ds-btn-secondary"
            >
              View credentials
            </a>
            <a
              href="mailto:info@ruzanovafit.com?subject=Consultation%20Request"
              className="text-caption text-ink-muted underline hover:text-ink transition-colors uppercase tracking-[0.1em]"
            >
              Email directly
            </a>
            <a
              href="/security/"
              className="text-caption text-ink-muted underline hover:text-ink transition-colors uppercase tracking-[0.1em]"
            >
              Read FAQ
            </a>
          </div>

          <div className="border-t border-surface-border pt-8 text-center">
            <p className="text-caption text-ink-muted">
              Pricing framework is aligned with Bay Area premium coaching benchmarks and adapted for personalized boutique support.
            </p>
          </div>
        </div>
      </Section>

      {modalOpen && (
        <div
          className="fixed inset-0 z-[70] bg-ink/40 backdrop-blur-sm px-4 py-6 sm:px-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Package request form"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div ref={modalRef} className="max-w-xl mx-auto ds-card-elevated p-6 md:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-label uppercase tracking-[0.14em] text-ink-subtle mb-2">
                  Package request
                </p>
                <h3 className="text-title font-semibold text-ink">
                  {activePackage || "General consultation"}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="ds-btn-secondary !px-3 !py-2"
                aria-label="Close form"
              >
                Close
              </button>
            </div>

            <p className="mt-4 text-caption text-ink-muted">
              Fill your details and send your request directly to Alena by email.
            </p>

            <div className="mt-3 rounded-lg border border-accent/30 bg-accent-mute/35 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.12em] text-accent font-semibold">
                Privacy note
              </p>
              <p className="mt-1 text-caption text-ink-muted">
                Data is used only to answer your booking request and is sent securely via EmailJS to the coach inbox.
              </p>
            </div>

            <form className="mt-5 space-y-4" onSubmit={submitRequest}>
              <div>
                <label className="text-caption text-ink-muted" htmlFor="packageName">
                  Package
                </label>
                <input
                  id="packageName"
                  type="text"
                  readOnly
                  value={form.packageName}
                  className="mt-1 w-full rounded-lg border border-surface-border bg-white/70 px-3 py-2 text-body text-ink"
                />
              </div>

              <div>
                <label className="text-caption text-ink-muted" htmlFor="fullName">
                  Full name
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.fullName}
                  onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-surface-border bg-white/70 px-3 py-2 text-body text-ink"
                />
              </div>

              <div>
                <label className="text-caption text-ink-muted" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-surface-border bg-white/70 px-3 py-2 text-body text-ink"
                />
              </div>

              <div>
                <label className="text-caption text-ink-muted" htmlFor="phone">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-surface-border bg-white/70 px-3 py-2 text-body text-ink"
                />
              </div>

              <div>
                <label className="text-caption text-ink-muted" htmlFor="format">
                  Format
                </label>
                <select
                  id="format"
                  required
                  value={form.format}
                  onChange={(e) => setForm((prev) => ({ ...prev, format: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-surface-border bg-white/70 px-3 py-2 text-body text-ink"
                >
                  <option value="">Select format</option>
                  {formats.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-caption text-ink-muted" htmlFor="program">
                  Program
                </label>
                <select
                  id="program"
                  required
                  value={form.program}
                  onChange={(e) => setForm((prev) => ({ ...prev, program: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-surface-border bg-white/70 px-3 py-2 text-body text-ink"
                >
                  <option value="">Select program</option>
                  {programs.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-caption text-ink-muted" htmlFor="goal">
                  Main goal
                </label>
                <input
                  id="goal"
                  type="text"
                  placeholder="Fat loss, strength, posture, postpartum return..."
                  value={form.goal}
                  onChange={(e) => setForm((prev) => ({ ...prev, goal: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-surface-border bg-white/70 px-3 py-2 text-body text-ink"
                />
              </div>

              <div>
                <label className="text-caption text-ink-muted" htmlFor="notes">
                  Notes
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  value={form.notes}
                  onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-surface-border bg-white/70 px-3 py-2 text-body text-ink resize-y"
                />
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <button type="submit" className="ds-btn-primary" disabled={isSending}>
                  {isSending ? "Sending..." : "Send request"}
                </button>
                <button type="button" onClick={closeModal} className="ds-btn-secondary">
                  Cancel
                </button>
              </div>
            </form>

            {submitStatus && (
              <p className={`mt-4 text-caption ${submitStatus.type === "success" ? "text-accent" : "text-ink-muted"}`}>
                {submitStatus.text}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
