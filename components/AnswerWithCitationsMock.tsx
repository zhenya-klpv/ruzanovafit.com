"use client";

import { useState, useEffect, useRef } from "react";

const QUESTION = "Summarize vibration test results for blue vs rigid in 22–24 kHz.";
const ANSWER =
  "Blue dampener reduces RMS in the MLCC band by ~42% vs rigid. Peak response down ~38%. Based on 12 scans (2V, grid). Best evidence: ";

const QUESTION_TYPING_MS = 48;
const QUESTION_FIRST_DELAY_MS = 400;
const THINKING_PAUSE_MS = 350;
const ANSWER_STREAM_MS = 11;
const CHUNKS_THEN_SOURCES_MS = 320;

const TEST_DATA = [
  { scan_id: "Scan_23K_2V_rigid_1st", mode: "rigid", freq_hz: 23000, voltage_v: 2, rms_m_s: "1.24e-04", peak_m_s: "3.01e-04" },
  { scan_id: "Scan_23K_2V_blue_grid_1st", mode: "blue_grid", freq_hz: 23000, voltage_v: 2, rms_m_s: "7.18e-05", peak_m_s: "1.87e-04" },
  { scan_id: "Scan_23K_2V_rigid_2nd", mode: "rigid", freq_hz: 23000, voltage_v: 2, rms_m_s: "1.21e-04", peak_m_s: "2.98e-04" },
  { scan_id: "Scan_23K_2V_blue_grid_2nd", mode: "blue_grid", freq_hz: 23000, voltage_v: 2, rms_m_s: "7.02e-05", peak_m_s: "1.82e-04" },
];

const CHART_DATA = [
  { mode: "rigid", label: "rigid (baseline)", rms: 1.22e-4, color: "#94a3b8" },
  { mode: "blue_grid", label: "blue (grid)", rms: 7.1e-5, color: "#14B8A6" },
];
const CHART_MAX = 1.35e-4;
const CHART_W = 280;
const CHART_H = 120;
const CHART_BAR_H = 28;

function ChartOnlyModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Test results chart"
    >
      <div
        className="rounded-xl border border-surface-border bg-trust text-surface shadow-2xl w-full max-w-lg overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 bg-trust-light">
          <span className="text-label font-mono text-white/80">spectrum_rms_overlay — 22–24 kHz (2V)</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-white/70 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-6">
          <svg width="100%" viewBox={`0 0 ${CHART_W} ${CHART_H + 20}`} className="max-w-sm mx-auto block" aria-label="RMS by mode chart">
            {CHART_DATA.map((d, i) => {
              const w = (d.rms / CHART_MAX) * (CHART_W - 100);
              return (
                <g key={d.mode}>
                  <text x="0" y={20 + i * (CHART_BAR_H + 12)} fill="rgba(255,255,255,0.9)" style={{ fontSize: "12px", fontFamily: "ui-monospace" }}>{d.label}</text>
                  <rect x="100" y={12 + i * (CHART_BAR_H + 12)} width={w} height={CHART_BAR_H - 4} rx="4" fill={d.color} />
                  <text x={105 + w} y={26 + i * (CHART_BAR_H + 12)} fill="rgba(255,255,255,0.9)" style={{ fontSize: "11px", fontFamily: "ui-monospace" }}>{d.rms.toExponential(2)} m/s</text>
                </g>
              );
            })}
          </svg>
          <p className="mt-4 text-center text-white/50 text-label font-mono">RMS velocity by mode. Blue dampener ~42% lower than rigid.</p>
        </div>
      </div>
    </div>
  );
}

function TestDataModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Test data — chunk source"
    >
      <div
        className="rounded-xl border border-surface-border bg-trust text-surface shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 bg-trust-light">
          <span className="text-label font-mono text-white/80">engineer_report.md §3.2 — Test data (22–24 kHz)</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-white/70 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-4 overflow-auto font-mono text-caption">
          <p className="text-white/70 mb-3">PSV vibration test — MLCC band. Source: chunk a3f2, b1c9.</p>
          <div className="rounded-lg border border-white/10 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-3 py-2 text-accent-light font-semibold">scan_id</th>
                  <th className="px-3 py-2 text-accent-light font-semibold">mode</th>
                  <th className="px-3 py-2 text-accent-light font-semibold">freq_hz</th>
                  <th className="px-3 py-2 text-accent-light font-semibold">V</th>
                  <th className="px-3 py-2 text-accent-light font-semibold">RMS [m/s]</th>
                  <th className="px-3 py-2 text-accent-light font-semibold">peak [m/s]</th>
                </tr>
              </thead>
              <tbody>
                {TEST_DATA.map((row) => (
                  <tr key={row.scan_id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="px-3 py-2 text-white/90">{row.scan_id}</td>
                    <td className="px-3 py-2 text-white/90">{row.mode}</td>
                    <td className="px-3 py-2 text-white/80">{row.freq_hz}</td>
                    <td className="px-3 py-2 text-white/80">{row.voltage_v}</td>
                    <td className="px-3 py-2 text-accent-light">{row.rms_m_s}</td>
                    <td className="px-3 py-2 text-accent-light">{row.peak_m_s}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-white/50 text-label">Blue vs rigid: ~42% RMS reduction in MLCC band.</p>

          <div className="mt-6 pt-4 border-t border-white/10">
            <p className="text-accent-light text-label uppercase tracking-wider mb-3 font-semibold">RMS velocity by mode (22–24 kHz, 2V)</p>
            <svg width={CHART_W} height={CHART_H} className="overflow-visible" aria-label="RMS by mode chart">
              {CHART_DATA.map((d, i) => {
                const w = (d.rms / CHART_MAX) * (CHART_W - 100);
                return (
                  <g key={d.mode}>
                    <text x="0" y={20 + i * (CHART_BAR_H + 12)} className="fill-white/80 text-[11px] font-mono" style={{ fontSize: "11px" }}>{d.label}</text>
                    <rect x="90" y={12 + i * (CHART_BAR_H + 12)} width={w} height={CHART_BAR_H - 4} rx="4" fill={d.color} />
                    <text x={95 + w} y={26 + i * (CHART_BAR_H + 12)} className="fill-white/90 text-[10px] font-mono" style={{ fontSize: "10px" }}>{d.rms.toExponential(2)}</text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Mock "answer with citations" — animated typewriter + clickable chunks → modal with test data.
 */
export function AnswerWithCitationsMock({ className = "" }: { className?: string }) {
  const [questionLength, setQuestionLength] = useState(0);
  const [answerLength, setAnswerLength] = useState(0);
  const [showChunks, setShowChunks] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const [started, setStarted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || started) return;
    const el = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setStarted(true);
      },
      { threshold: 0.2, rootMargin: "0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    if (questionLength < QUESTION.length) {
      const delay = questionLength === 0 ? QUESTION_FIRST_DELAY_MS : QUESTION_TYPING_MS;
      const t = setTimeout(() => setQuestionLength((n) => n + 1), delay);
      return () => clearTimeout(t);
    }
  }, [started, questionLength]);

  useEffect(() => {
    if (!started || questionLength < QUESTION.length) return;
    if (answerLength === 0) {
      const t = setTimeout(() => setAnswerLength(1), THINKING_PAUSE_MS);
      return () => clearTimeout(t);
    }
    if (answerLength < ANSWER.length) {
      const t = setTimeout(() => setAnswerLength((n) => n + 1), ANSWER_STREAM_MS);
      return () => clearTimeout(t);
    }
  }, [started, questionLength, answerLength]);

  useEffect(() => {
    if (!started || answerLength < ANSWER.length) return;
    const t1 = setTimeout(() => setShowChunks(true), 0);
    const t2 = setTimeout(() => setShowSources(true), CHUNKS_THEN_SOURCES_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [started, answerLength]);

  const displayedQuestion = QUESTION.slice(0, questionLength);
  const questionComplete = questionLength >= QUESTION.length;
  const displayedAnswer = ANSWER.slice(0, answerLength);
  const answerComplete = answerLength >= ANSWER.length;
  const showCursorAfterQuestion = started && questionLength < QUESTION.length;
  const showCursorAfterAnswer = started && questionComplete && answerLength < ANSWER.length;

  return (
    <>
      <div
        ref={containerRef}
        className={`rounded-xl border border-surface-border bg-trust text-surface overflow-hidden shadow-lg ${className}`}
        aria-label="Example: answer with source citations (animated)"
      >
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-red-500/80" />
          <span className="h-2 w-2 rounded-full bg-amber-500/80" />
          <span className="h-2 w-2 rounded-full bg-accent-light" />
          <span className="ml-2 text-label text-white/60 font-mono">Explicid — scope: TestReports/2026Q1</span>
        </div>
        <div className="p-4 font-mono text-caption space-y-3">
          <p className="text-white/90 min-h-[2em]">
            <span className="text-ink-subtle">Q:</span> {displayedQuestion}
            {showCursorAfterQuestion && (
              <span className="inline-block w-2 h-4 ml-0.5 bg-white/80 animate-pulse align-middle" aria-hidden />
            )}
          </p>
          {questionComplete && (
          <p className="text-white/95 leading-relaxed min-h-[4.5em]">
            <span className="text-accent-light font-semibold">A:</span> {displayedAnswer}
            {showChunks && (
              <>
                {" "}
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="verified-token bg-accent/30 text-accent-light px-1.5 py-0.5 rounded border border-accent-light/40 hover:bg-accent/50 hover:border-accent-light/50 transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
                  title="Open test data"
                >
                  chunk:a3f2
                </button>
                ,{" "}
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="verified-token bg-accent/30 text-accent-light px-1.5 py-0.5 rounded border border-accent-light/40 hover:bg-accent/50 hover:border-accent-light/50 transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
                  style={{ animationDelay: "0.08s" }}
                  title="Open test data"
                >
                  chunk:b1c9
                </button>
                .
              </>
            )}
            {showCursorAfterAnswer && (
              <span className="inline-block w-2 h-4 ml-0.5 bg-accent-light animate-pulse" aria-hidden />
            )}
          </p>
          )}
          {showSources && (
            <div className="pt-2 border-t border-accent/20 bg-accent/10 rounded px-3 py-2 animate-fade-in">
              <p className="text-accent-light text-label uppercase tracking-wider mb-1 font-semibold">Sources</p>
              <ul className="space-y-1 text-white/90">
                <li>
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="bg-accent/20 text-accent-light px-1 rounded hover:bg-accent/30 transition-colors cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
                  >
                    engineer_report.md
                  </button>{" "}
                  §3.2 — chunk a3f2
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="bg-accent/20 text-accent-light px-1 rounded hover:bg-accent/30 transition-colors cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
                  >
                    psv_features.json
                  </button>{" "}
                  — chunk b1c9
                </li>
                <li className="pt-1">
                  <button
                    type="button"
                    onClick={() => setChartOpen(true)}
                    className="text-accent-light underline hover:no-underline text-label focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
                  >
                    View chart (test results)
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {modalOpen && <TestDataModal onClose={() => setModalOpen(false)} />}
      {chartOpen && <ChartOnlyModal onClose={() => setChartOpen(false)} />}
    </>
  );
}
