"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Search, Check, X, ArrowRight } from "lucide-react";
import { waLink } from "@/lib/utils";
import type { Locale } from "@/lib/constants";

type HeroProps = { locale: Locale; dict: Record<string, string> };

type Phase =
  | "idle"
  | "typing"
  | "submitted"
  | "results"
  | "highlight"
  | "verdict"
  | "weCanFix"
  | "building"
  | "built"
  | "offer";

export function Hero({ locale, dict }: HeroProps) {
  const prefersReduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [typedChars, setTypedChars] = useState(0);
  const [buildProgress, setBuildProgress] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const query = dict["home.hero.searchQuery"] || "Saleh Tech School Baku";

  const after = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  }, []);

  useEffect(() => {
    if (prefersReduced) {
      setPhase("offer");
      setTypedChars(query.length);
      setBuildProgress(100);
      return;
    }

    // ── Slower timeline ──
    let t = 800;

    // Typing — 80ms per char
    after(() => setPhase("typing"), t);
    for (let i = 1; i <= query.length; i++) {
      after(() => setTypedChars(i), t + i * 80);
    }
    t += query.length * 80;

    // Submit
    after(() => setPhase("submitted"), t + 400);

    // Results appear — linger for ~2.5s
    after(() => setPhase("results"), t + 1000);

    // Highlight "no website" — linger for ~2s
    after(() => setPhase("highlight"), t + 3500);

    // Verdict message
    after(() => setPhase("verdict"), t + 5500);

    // "We can fix that"
    after(() => setPhase("weCanFix"), t + 7500);

    // Building — 4 seconds of progress
    after(() => {
      setPhase("building");
      setBuildProgress(0);
    }, t + 9000);

    const buildStart = t + 9000;
    const buildEnd = t + 13000;
    const buildDur = buildEnd - buildStart;
    const ticks = 30;
    for (let i = 1; i <= ticks; i++) {
      after(
        () => setBuildProgress(Math.min(100, Math.round((i / ticks) * 100))),
        buildStart + (buildDur / ticks) * i
      );
    }

    // Built — show screenshot for 1.5s
    after(() => setPhase("built"), buildEnd);

    // Final offer screen
    after(() => setPhase("offer"), buildEnd + 1500);

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      setPhase("idle");
      setTypedChars(0);
      setBuildProgress(0);
    };
  }, [prefersReduced, query, after]);

  const phases: Phase[] = [
    "idle", "typing", "submitted", "results", "highlight",
    "verdict", "weCanFix", "building", "built", "offer",
  ];
  const pi = phases.indexOf(phase);

  return (
    <section className="bg-bg overflow-hidden">
      <div className="max-w-[1120px] mx-auto px-[20px] md:px-[24px] pt-[32px] pb-[48px] md:pt-[64px] md:pb-[96px]">
        {/* Headline */}
        <motion.h1
          className="font-serif text-[28px] md:text-[40px] lg:text-[48px] font-normal leading-[1.1] tracking-[-0.02em] text-center mb-[32px] md:mb-[48px]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {dict["home.hero.h1"]}
        </motion.h1>

        {/* Full-width animation card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-surface rounded-[12px] border border-border shadow-[var(--shadow-card)] overflow-hidden">

            {/* Search chrome — hidden during offer phase */}
            {pi <= 8 && (
              <>
                <SearchBar
                  query={query}
                  typedChars={typedChars}
                  phase={phase}
                  pi={pi}
                  placeholder={dict["home.hero.searchPlaceholder"]}
                />

                {pi >= 2 && (
                  <div className="px-[20px] md:px-[32px] border-b border-border flex gap-[24px]">
                    {["All", "Images", "Maps"].map((tab, i) => (
                      <span
                        key={tab}
                        className={`text-[13px] py-[9px] border-b-[2px] ${
                          i === 0
                            ? "text-accent border-accent font-medium"
                            : "text-text-faint border-transparent"
                        }`}
                      >
                        {tab}
                      </span>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Content area */}
            <div className={`px-[20px] md:px-[32px] py-[20px] md:py-[32px] relative ${
              pi <= 8 ? "min-h-[360px] md:min-h-[440px]" : ""
            }`}>
              <AnimatePresence mode="wait">

                {/* Search results */}
                {(pi >= 3 && pi <= 4) && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-[12px] text-text-faint mb-[20px]">
                      {dict["home.hero.resultCount"]} (0.34 s)
                    </p>
                    <GoogleResults highlighted={pi >= 4} />
                  </motion.div>
                )}

                {/* Verdict */}
                {(pi === 5 || pi === 6) && (
                  <motion.div
                    key="verdict"
                    className="absolute inset-0 flex flex-col items-center justify-center px-[32px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-[22px] md:text-[30px] font-serif text-text text-center leading-[1.3]">
                      {dict["home.hero.nothingToFind"]}
                    </p>
                    {pi >= 6 && (
                      <motion.p
                        className="text-[17px] md:text-[20px] text-accent font-medium mt-[16px]"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                      >
                        {dict["home.hero.weCanFix"]}
                      </motion.p>
                    )}
                  </motion.div>
                )}

                {/* Building */}
                {pi === 7 && (
                  <motion.div
                    key="building"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SalehBuilder progress={buildProgress} statusText={dict["home.hero.building"]} />
                  </motion.div>
                )}

                {/* Built — screenshot with status */}
                {pi === 8 && (
                  <motion.div
                    key="built"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <SalehFinished />
                    <div className="mt-[16px] flex items-center gap-[8px]">
                      <span className="w-[8px] h-[8px] rounded-full bg-success" />
                      <span className="text-[14px] font-medium text-success">
                        {dict["home.hero.ready"]}
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Offer screen — the process explained */}
                {pi >= 9 && (
                  <motion.div
                    key="offer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <OfferScreen locale={locale} dict={dict} />
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Offer screen — explains the full process ── */
function OfferScreen({ locale, dict }: { locale: Locale; dict: Record<string, string> }) {
  return (
    <div className="py-[8px] md:py-[16px]">
      {/* Screenshot at top, smaller */}
      <div className="max-w-[480px] mx-auto mb-[32px] md:mb-[40px]">
        <SalehFinished />
      </div>

      {/* Offer title */}
      <motion.h2
        className="font-serif text-[24px] md:text-[32px] font-normal leading-[1.2] tracking-[-0.02em] text-center text-text"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
      >
        {dict["home.hero.offerTitle"]}
      </motion.h2>

      {/* Steps */}
      <div className="max-w-[520px] mx-auto mt-[24px] md:mt-[32px] space-y-[16px]">
        {[
          { key: "offerStep1", icon: "1", delay: 0.25 },
          { key: "offerStep2", icon: "2", delay: 0.35 },
          { key: "offerStep3", icon: "3", delay: 0.45 },
        ].map((step) => (
          <motion.div
            key={step.key}
            className="flex items-start gap-[12px]"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: step.delay, duration: 0.35 }}
          >
            <span className="w-[28px] h-[28px] rounded-full bg-surface-alt border border-border flex items-center justify-center text-[13px] font-medium text-text-muted flex-shrink-0">
              {step.icon}
            </span>
            <p className="text-[15px] md:text-[16px] leading-[1.5] text-text-muted pt-[3px]">
              {dict[`home.hero.${step.key}`]}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Two option buttons */}
      <motion.div
        className="mt-[32px] md:mt-[40px] flex flex-col sm:flex-row items-center justify-center gap-[12px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <a
          href={waLink(locale)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-[8px] px-[24px] py-[14px] rounded-[8px] bg-accent text-white text-[15px] font-medium transition-colors hover:bg-accent-hover w-full sm:w-auto"
        >
          <Check size={18} strokeWidth={2} />
          {dict["home.hero.continueLabel"]}
        </a>
        <span className="flex items-center justify-center gap-[8px] px-[24px] py-[14px] rounded-[8px] bg-surface border border-border text-[15px] text-text-muted font-medium w-full sm:w-auto">
          <X size={18} strokeWidth={2} />
          {dict["home.hero.dontLabel"]}
        </span>
      </motion.div>
    </div>
  );
}

/* ── Search bar ── */
function SearchBar({
  query,
  typedChars,
  phase,
  pi,
  placeholder,
}: {
  query: string;
  typedChars: number;
  phase: Phase;
  pi: number;
  placeholder: string;
}) {
  return (
    <div className="px-[20px] md:px-[32px] pt-[20px] md:pt-[24px] pb-[14px] md:pb-[16px]">
      <div className="flex items-center gap-[6px] mb-[14px]">
        <div className="flex gap-[2px]">
          {"Search".split("").map((ch, i) => (
            <span
              key={i}
              className="text-[22px] md:text-[26px] font-semibold"
              style={{ color: ["#4285f4", "#ea4335", "#fbbc05", "#4285f4", "#34a853", "#ea4335"][i] }}
            >
              {ch}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-[10px] rounded-[999px] border border-border px-[18px] py-[12px] shadow-[0_1px_4px_rgba(0,0,0,0.06)] bg-surface">
        <Search size={18} strokeWidth={1.75} className="text-text-faint flex-shrink-0" />
        <span className="text-[16px] md:text-[17px] text-text flex-1 min-w-0 truncate">
          {phase === "idle" ? (
            <span className="text-text-faint">{placeholder}…</span>
          ) : (
            <>
              {pi >= 2 ? query : query.slice(0, typedChars)}
              {phase === "typing" && (
                <span className="inline-block w-[2px] h-[17px] bg-text align-text-bottom ml-[1px] animate-pulse" />
              )}
            </>
          )}
        </span>
        {pi >= 2 && <span className="text-[14px] text-text-faint">✕</span>}
      </div>
    </div>
  );
}

/* ── Google-like results ── */
function GoogleResults({ highlighted }: { highlighted: boolean }) {
  return (
    <div className="space-y-[24px]">
      <div>
        <div className="flex items-center gap-[6px] mb-[3px]">
          <div className="w-[22px] h-[22px] rounded-full bg-surface-alt border border-border flex items-center justify-center">
            <span className="text-[9px]">ig</span>
          </div>
          <span className="text-[12px] text-text-faint">instagram.com › salehtechschool</span>
        </div>
        <p className="text-[17px] md:text-[18px] text-[#1a0dab] leading-[1.3]">
          Saleh Tech School (@salehtechschool)
        </p>
        <p className="text-[14px] text-text-muted leading-[1.5] mt-[3px]">
          500+ tələbə · Proqramlaşdırma, robototexnika, AI · 6-18 yaş · Bakı
        </p>
      </div>

      <div>
        <div className="flex items-center gap-[6px] mb-[3px]">
          <div className="w-[22px] h-[22px] rounded-full bg-surface-alt border border-border flex items-center justify-center">
            <span className="text-[9px]">fb</span>
          </div>
          <span className="text-[12px] text-text-faint">facebook.com › SalehTechSchool</span>
        </div>
        <p className="text-[17px] md:text-[18px] text-[#1a0dab] leading-[1.3]">
          Saleh Tech School - Bakı
        </p>
        <p className="text-[14px] text-text-muted leading-[1.5] mt-[3px]">
          Uşaqlar üçün texnologiya kursları. Əlaqə: +994 XX XXX XX XX
        </p>
      </div>

      <div className={`rounded-[8px] px-[14px] py-[12px] -mx-[14px] transition-all duration-700 ${highlighted ? "bg-danger/6" : ""}`}>
        <div className="flex items-center gap-[6px] mb-[3px]">
          <div className="w-[22px] h-[22px] rounded-full bg-surface-alt border border-border flex items-center justify-center">
            <span className="text-[9px]">m</span>
          </div>
          <span className="text-[12px] text-text-faint">maps › Saleh Tech School</span>
        </div>
        <p className="text-[17px] md:text-[18px] text-[#1a0dab] leading-[1.3]">Saleh Tech School</p>
        <div className="flex items-center gap-[8px] mt-[4px]">
          <span className="text-[14px] text-text-muted">4.8 ★</span>
          <span className="text-[14px] text-text-faint">· Bakı</span>
          <span className={`text-[13px] font-medium ml-auto transition-colors duration-700 ${highlighted ? "text-danger" : "text-text-faint"}`}>
            {highlighted ? "⚠ No website" : "No website"}
          </span>
        </div>
      </div>

      {highlighted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="border-t border-border pt-[16px]"
        >
          <p className="text-[13px] text-text-faint italic">No official website found for this business.</p>
        </motion.div>
      )}
    </div>
  );
}

/* ── Builder ── */
function SalehBuilder({ progress, statusText }: { progress: number; statusText: string }) {
  const p = progress;
  return (
    <div>
      <div className="flex items-center justify-between mb-[12px]">
        <span className="text-[15px] font-medium text-text-muted">{statusText}</span>
        <span className="text-[14px] text-text-faint tabular-nums">{p}%</span>
      </div>
      <div className="h-[3px] bg-surface-alt rounded-full overflow-hidden mb-[24px]">
        <motion.div className="h-full bg-accent rounded-full" animate={{ width: `${p}%` }} transition={{ duration: 0.1, ease: "linear" }} />
      </div>

      <div className="rounded-[8px] border border-border bg-surface overflow-hidden relative">
        <div className="px-[12px] py-[7px] border-b border-border bg-surface-alt flex items-center gap-[6px] relative z-10">
          <div className="flex gap-[5px]">
            <span className="w-[8px] h-[8px] rounded-full bg-[#ff5f57]" />
            <span className="w-[8px] h-[8px] rounded-full bg-[#febc2e]" />
            <span className="w-[8px] h-[8px] rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 mx-[10px] bg-surface rounded-[4px] border border-border px-[10px] py-[3px]">
            <motion.span className="text-[11px] text-text-faint" animate={{ opacity: p > 10 ? 1 : 0 }}>
              saleh-tech-school.com
            </motion.span>
          </div>
        </div>

        <div className="p-[16px] space-y-[10px]">
          <div className="flex items-center justify-between mb-[8px]">
            <motion.div className="h-[8px] rounded bg-[#FF6B35]/20" animate={{ width: p > 8 ? 70 : 0 }} />
            <div className="flex gap-[10px]">
              {[30, 26, 34, 26].map((w, i) => (
                <motion.div key={i} className="h-[7px] rounded bg-text/8" animate={{ width: p > 12 + i * 6 ? w : 0, opacity: p > 12 + i * 6 ? 1 : 0 }} transition={{ duration: 0.25 }} />
              ))}
            </div>
          </div>
          <motion.div className="h-[16px] rounded bg-text/12" animate={{ width: p > 25 ? "65%" : 0, opacity: p > 25 ? 1 : 0 }} />
          <motion.div className="h-[16px] rounded bg-[#FF6B35]/18" animate={{ width: p > 30 ? "55%" : 0, opacity: p > 30 ? 1 : 0 }} />
          <motion.div className="h-[16px] rounded bg-text/12" animate={{ width: p > 34 ? "45%" : 0, opacity: p > 34 ? 1 : 0 }} />
          <div className="space-y-[5px] pt-[8px]">
            {[80, 70].map((w, i) => (
              <motion.div key={i} className="h-[7px] rounded bg-text/6" animate={{ width: p > 40 + i * 5 ? `${w}%` : 0, opacity: p > 40 + i * 5 ? 1 : 0 }} />
            ))}
          </div>
          <motion.div className="h-[28px] rounded-[999px] bg-[#FF6B35]/20 mt-[10px]" animate={{ width: p > 55 ? 150 : 0, opacity: p > 55 ? 1 : 0 }} />
          <motion.div className="h-[100px] md:h-[140px] rounded-[8px] bg-surface-alt border border-border mt-[10px] flex items-center justify-center" animate={{ opacity: p > 65 ? 1 : 0 }}>
            {p > 65 && <span className="text-[24px]">🦊</span>}
          </motion.div>
        </div>

        <motion.div className="absolute inset-0 top-[31px]" animate={{ opacity: p > 85 ? 1 : 0 }} transition={{ duration: 0.8 }}>
          <Image src="/images/projects/saleh.png" alt="Saleh Tech School homepage" width={1280} height={800} className="w-full h-full object-cover object-top" priority />
        </motion.div>
      </div>
    </div>
  );
}

/* ── Finished screenshot ── */
function SalehFinished() {
  return (
    <div className="rounded-[8px] border border-border bg-surface overflow-hidden shadow-[var(--shadow-card)]">
      <div className="px-[12px] py-[7px] border-b border-border bg-surface-alt flex items-center gap-[6px]">
        <div className="flex gap-[5px]">
          <span className="w-[8px] h-[8px] rounded-full bg-[#ff5f57]" />
          <span className="w-[8px] h-[8px] rounded-full bg-[#febc2e]" />
          <span className="w-[8px] h-[8px] rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 mx-[10px] bg-surface rounded-[4px] border border-border px-[10px] py-[3px]">
          <span className="text-[11px] text-text-faint">saleh-tech-school.com</span>
        </div>
      </div>
      <Image src="/images/projects/saleh.png" alt="Saleh Tech School homepage" width={1280} height={800} className="w-full h-auto block" priority />
    </div>
  );
}
