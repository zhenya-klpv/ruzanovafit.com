import type { ReactNode } from "react";

/**
 * Trust cue: icon + short label. No marketing fluff.
 */
export function TrustBadge({
  icon,
  label,
  title,
}: {
  icon: ReactNode;
  label: string;
  title?: string;
}) {
  return (
    <div
      className="group ds-card ds-card-hover flex items-center gap-3 text-left px-4 py-4"
      title={title ?? label}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-surface-border/80 bg-white/65 text-ink-muted group-hover:text-accent group-hover:border-accent/50 transition-colors">
        {icon}
      </span>
      <span className="text-caption font-medium text-ink-muted group-hover:text-ink transition-colors">{label}</span>
    </div>
  );
}

function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function TrustBadges() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <TrustBadge icon={<LockIcon />} label="NASM Certified Personal Trainer & Nutrition Coach" title="Evidence-based training and nutrition guidance" />
      <TrustBadge icon={<ShieldIcon />} label="CPR/AED certified and safety-first coaching" title="Form quality and injury prevention in every phase" />
      <TrustBadge icon={<EyeIcon />} label="Two master's degrees: Engineering and Pedagogy" title="Scientific mindset plus structured teaching approach" />
    </div>
  );
}
