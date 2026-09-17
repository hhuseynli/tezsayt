"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
  useInView,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { Search, Check, X, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/utils";
import type { Locale } from "@/lib/constants";

type HeroProps = { locale: Locale; dict: Record<string, string> };

/* The three stages shown in tabs */
type Stage = 0 | 1 | 2;

/* Sub-phases within stage 0 (the search animation) */
type SearchPhase =
  | "idle"
  | "typing"
  | "submitted"
  | "results"
  | "highlight"
  | "verdict"
  | "weCanFix";

/* Sub-phases within stage 1 (the build animation) */
type BuildPhase = "idle" | "building" | "built";

export function Hero({ locale, dict }: HeroProps) {
  const prefersReduced = useReducedMotion();

  /* ── Tab state ── */
  const [activeStage, setActiveStage] = useState<Stage>(0);
  const [animDone, setAnimDone] = useState(false);

  /* ── Stage 0: search animation ── */
  const [searchPhase, setSearchPhase] = useState<SearchPhase>("idle");
  const [typedChars, setTypedChars] = useState(0);

  /* ── Stage 1: build animation ── */
  const [buildPhase, setBuildPhase] = useState<BuildPhase>("idle");
  const [buildProgress, setBuildProgress] = useState(0);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const hasStarted = useRef(false);
  const query = dict["home.hero.searchQuery"] || "Saleh Tech School Baku";

  const after = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  }, []);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  /* ── Tab labels ── */
  const tabs = [
    dict["home.how.step1.title"] || "Tell us about your business",
    dict["home.how.step2.title"] || "We build your homepage. Free.",
    dict["home.how.step3.title"] || "You decide",
  ];

  const handleTabClick = (stage: Stage) => {
    if (!animDone || stage === activeStage) return;
    setActiveStage(stage);

    // Show final state for each stage when clicking
    if (stage === 0) {
      setSearchPhase("weCanFix");
      setTypedChars(query.length);
    } else if (stage === 1) {
      setBuildPhase("built");
      setBuildProgress(100);
    }
  };

  /* ── Hero text fade-out on scroll ── */
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"],
  });
  const heroTextOpacity = useTransform(heroScroll, [0, 0.4], [1, 0]);
  const heroTextY = useTransform(heroScroll, [0, 0.4], [0, -60]);
  const floatingOpacity = useTransform(heroScroll, [0, 0.35], [0.85, 0]);

  /* ── Scroll-driven card reveal ── */
  const peekRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: peekRef,
    offset: ["start end", "start 0.25"],
  });
  const cardY = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.6], [0.35, 1]);
  const cardScale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const maskOpacity = useTransform(scrollYProgress, [0.3, 0.8], [1, 0]);
  const cardShadow = useTransform(
    scrollYProgress,
    [0, 1],
    ["0 4px 24px rgba(26,22,18,0.03)", "0 20px 60px rgba(26,22,18,0.08), 0 8px 24px rgba(26,22,18,0.05)"]
  );

  /* ── Trigger animation when card is fully in view ── */
  const animTriggerRef = useRef<HTMLDivElement>(null);
  const isCardRevealed = useInView(animTriggerRef, { amount: 0.4, once: true });

  // Reduced motion: skip to end
  useEffect(() => {
    if (prefersReduced) {
      setActiveStage(2);
      setAnimDone(true);
      setSearchPhase("verdict");
      setTypedChars(query.length);
      setBuildPhase("built");
      setBuildProgress(100);
    }
  }, [prefersReduced, query]);

  // Full auto-play animation — runs linearly, tabs appear after
  useEffect(() => {
    if (!isCardRevealed || hasStarted.current || prefersReduced) return;
    hasStarted.current = true;

    let t = 300;

    // ── Stage 0: Search ──
    after(() => setSearchPhase("typing"), t);
    for (let i = 1; i <= query.length; i++) {
      after(() => setTypedChars(i), t + i * 70);
    }
    t += query.length * 70;
    after(() => setSearchPhase("submitted"), t + 350);
    after(() => setSearchPhase("results"), t + 900);
    after(() => setSearchPhase("highlight"), t + 3000);
    after(() => setSearchPhase("verdict"), t + 4800);
    after(() => setSearchPhase("weCanFix"), t + 6500);

    // ── Stage 1: Build ──
    const stage1Start = t + 8000;
    after(() => {
      setActiveStage(1);
      setBuildPhase("building");
      setBuildProgress(0);
    }, stage1Start);

    const buildDur = 4000;
    const ticks = 30;
    for (let i = 1; i <= ticks; i++) {
      after(
        () => setBuildProgress(Math.min(100, Math.round((i / ticks) * 100))),
        stage1Start + (buildDur / ticks) * i
      );
    }
    after(() => setBuildPhase("built"), stage1Start + buildDur);

    // ── Stage 2: You decide + reveal tabs ──
    const stage2Start = stage1Start + buildDur + 2000;
    after(() => {
      setActiveStage(2);
      setAnimDone(true);
    }, stage2Start);

    return clearTimers;
  }, [isCardRevealed, prefersReduced, query, after, clearTimers]);

  /* ── Determine search sub-phase index for rendering ── */
  const searchPhases: SearchPhase[] = ["idle", "typing", "submitted", "results", "highlight", "verdict", "weCanFix"];
  const spi = searchPhases.indexOf(searchPhase);

  return (
    <>
      {/* ── Part 1: Hero text — fills the viewport, fades on scroll ── */}
      <section ref={heroSectionRef} className="bg-bg relative min-h-[100svh] flex flex-col items-center px-[20px] md:px-[24px] overflow-hidden pt-[20vh] md:pt-[18vh]">
        <motion.div
          className="text-center max-w-[720px] relative z-[1]"
          style={{ opacity: heroTextOpacity, y: heroTextY }}
        >
          <motion.h1
            className="font-serif text-[36px] md:text-[52px] lg:text-[60px] font-normal leading-[1.08] tracking-[-0.025em] text-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {dict["home.hero.h1"]}
          </motion.h1>
          <motion.p
            className="mt-[16px] md:mt-[24px] text-[16px] md:text-[18px] leading-[1.6] text-text-muted max-w-[540px] mx-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {dict["home.hero.sub"]}
          </motion.p>
          <motion.div
            className="mt-[32px] flex flex-col sm:flex-row items-center justify-center gap-[12px]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a
              href={waLink(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-[8px] px-[24px] py-[14px] rounded-[8px] bg-accent text-white text-[15px] font-medium transition-all hover:bg-accent-hover hover:shadow-[0_4px_16px_rgba(168,71,31,0.25)] w-full sm:w-auto"
            >
              {dict["home.hero.cta"]}
            </a>
          </motion.div>
        </motion.div>

        <FloatingUIComponents scrollOpacity={floatingOpacity} />
      </section>

      {/* ── Part 2: Card + Tabs ── */}
      <section ref={peekRef} className="bg-bg relative pb-[48px] md:pb-[96px]">
        <div className="max-w-[1120px] mx-auto px-[20px] md:px-[24px] -mt-[64px] md:-mt-[96px]">
          <motion.div
            ref={animTriggerRef}
            style={{ y: cardY, opacity: cardOpacity, scale: cardScale }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 z-10 pointer-events-none rounded-[12px]"
                style={{
                  opacity: maskOpacity,
                  background: "linear-gradient(to bottom, var(--bg) 0%, transparent 100%)",
                }}
              />

              {/* ── Animation card ── */}
              <motion.div
                className="bg-surface rounded-[16px] border border-border overflow-hidden"
                style={{ boxShadow: cardShadow }}
              >
                <div className="min-h-[600px] md:min-h-[640px] relative">
                  <AnimatePresence mode="wait">

                    {/* ── Stage 0: Search / Discovery ── */}
                    {activeStage === 0 && (
                      <motion.div
                        key="stage-0"
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <SearchBar
                          query={query}
                          typedChars={typedChars}
                          phase={searchPhase}
                          spi={spi}
                          placeholder={dict["home.hero.searchPlaceholder"]}
                        />
                        {spi >= 2 && (
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
                        <div className="px-[20px] md:px-[32px] py-[20px] md:py-[32px]">
                          <AnimatePresence mode="wait">
                            {(spi >= 3 && spi <= 4) && (
                              <motion.div key="s0-results" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                                <p className="text-[12px] text-text-faint mb-[20px]">{dict["home.hero.resultCount"]} (0.34 s)</p>
                                <GoogleResults highlighted={spi >= 4} />
                              </motion.div>
                            )}
                            {(spi >= 5) && (
                              <motion.div
                                key="s0-verdict"
                                className="flex flex-col items-center justify-center min-h-[260px] md:min-h-[320px]"
                                initial={{ opacity: 0, scale: 0.97 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                              >
                                <p className="text-[22px] md:text-[30px] font-serif text-text text-center leading-[1.3]">
                                  {dict["home.hero.nothingToFind"]}
                                </p>
                                {spi >= 6 && (
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
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    )}

                    {/* ── Stage 1: Build ── */}
                    {activeStage === 1 && (
                      <motion.div
                        key="stage-1"
                        className="absolute inset-0 px-[20px] md:px-[32px] py-[20px] md:py-[32px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <AnimatePresence mode="wait">
                          {buildPhase !== "built" ? (
                            <motion.div key="s1-building" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                              <SalehBuilder progress={buildProgress} statusText={dict["home.hero.building"]} />
                            </motion.div>
                          ) : (
                            <motion.div key="s1-built" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                              <SalehFinished />
                              <div className="mt-[16px] flex items-center gap-[8px]">
                                <span className="w-[8px] h-[8px] rounded-full bg-success" />
                                <span className="text-[14px] font-medium text-success">{dict["home.hero.ready"]}</span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}

                    {/* ── Stage 2: You decide ── */}
                    {activeStage === 2 && (
                      <motion.div
                        key="stage-2"
                        className="px-[20px] md:px-[32px] py-[20px] md:py-[32px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <OfferScreen locale={locale} dict={dict} />
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>

        <LogoMarquee />
      </section>
    </>
  );
}

/* ── Offer screen ── */
type OfferView = "offer" | "feedback" | "thanks";

function OfferScreen({ locale, dict }: { locale: Locale; dict: Record<string, string> }) {
  const [view, setView] = useState<OfferView>("offer");
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const reasons = [
    { key: "noNeed", label: dict["home.hero.fb.noNeed"] || "I don't need a website right now" },
    { key: "hasWebsite", label: dict["home.hero.fb.hasWebsite"] || "I already have a website" },
    { key: "tooExpensive", label: dict["home.hero.fb.tooExpensive"] || "It seems too expensive" },
    { key: "notConvinced", label: dict["home.hero.fb.notConvinced"] || "I'm not convinced yet" },
    { key: "other", label: dict["home.hero.fb.other"] || "Something else" },
  ];

  return (
    <div className="py-[8px] md:py-[16px]">
      <AnimatePresence mode="wait">

        {view === "offer" && (
          <motion.div key="offer-main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
            <div className="max-w-[480px] mx-auto mb-[24px] md:mb-[32px]">
              <SalehFinished />
            </div>
            <h2 className="font-serif text-[22px] md:text-[28px] font-normal leading-[1.2] tracking-[-0.02em] text-center text-text">
              {dict["home.hero.offerTitle"]}
            </h2>
            <div className="max-w-[520px] mx-auto mt-[20px] md:mt-[24px] space-y-[12px]">
              {["offerStep1", "offerStep2", "offerStep3"].map((key, i) => (
                <div key={key} className="flex items-start gap-[12px]">
                  <span className="w-[24px] h-[24px] rounded-full bg-surface-alt border border-border flex items-center justify-center text-[12px] font-medium text-text-muted flex-shrink-0 shadow-[0_1px_3px_rgba(26,22,18,0.05)]">
                    {i + 1}
                  </span>
                  <p className="text-[14px] md:text-[15px] leading-[1.5] text-text-muted pt-[2px]">{dict[`home.hero.${key}`]}</p>
                </div>
              ))}
            </div>
            <div className="mt-[24px] md:mt-[32px] flex flex-col sm:flex-row items-center justify-center gap-[12px]">
              <a href={waLink(locale)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-[8px] px-[24px] py-[14px] rounded-[8px] bg-accent text-white text-[15px] font-medium transition-all hover:bg-accent-hover hover:shadow-[0_4px_16px_rgba(168,71,31,0.25)] w-full sm:w-auto">
                <Check size={18} strokeWidth={2} />
                {dict["home.hero.continueLabel"]}
              </a>
              <button onClick={() => setView("feedback")} className="flex items-center justify-center gap-[8px] px-[24px] py-[14px] rounded-[8px] bg-surface border border-border text-[15px] text-text-muted font-medium w-full sm:w-auto transition-all hover:shadow-[0_2px_8px_rgba(26,22,18,0.05)]">
                <X size={18} strokeWidth={2} />
                {dict["home.hero.dontLabel"]}
              </button>
            </div>
          </motion.div>
        )}

        {view === "feedback" && (
          <motion.div key="offer-feedback" className="max-w-[480px] mx-auto" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
            <div className="rounded-[12px] border border-border bg-surface-alt p-[24px] shadow-[0_4px_20px_rgba(26,22,18,0.05)]">
              <div className="flex items-center gap-[8px] mb-[16px]">
                <MessageCircle size={18} strokeWidth={1.75} className="text-text-muted" />
                <p className="text-[15px] font-medium text-text">{dict["home.hero.fb.heading"] || "No problem. Mind telling us why?"}</p>
              </div>
              <p className="text-[13px] text-text-faint mb-[16px]">{dict["home.hero.fb.sub"] || "This helps us improve. One tap, no sign-up."}</p>
              <div className="space-y-[8px]">
                {reasons.map((r) => (
                  <button key={r.key} onClick={() => setSelectedReason(r.key)} className={`w-full text-left px-[16px] py-[12px] rounded-[8px] border text-[14px] transition-all ${selectedReason === r.key ? "border-accent bg-accent/5 text-text shadow-[0_0_0_1px_var(--accent)]" : "border-border bg-surface text-text-muted hover:border-text/20 hover:shadow-[0_1px_4px_rgba(26,22,18,0.03)]"}`}>
                    {r.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-[8px] mt-[16px]">
                <button onClick={() => setView("offer")} className="flex-1 py-[12px] rounded-[8px] text-[14px] font-medium border border-border bg-surface text-text-muted transition-all hover:shadow-[0_2px_8px_rgba(26,22,18,0.05)]">
                  {dict["home.hero.fb.back"] || "Back"}
                </button>
                <button onClick={() => { if (selectedReason) setView("thanks"); }} disabled={!selectedReason} className={`flex-[2] py-[12px] rounded-[8px] text-[14px] font-medium transition-all ${selectedReason ? "bg-text text-surface hover:shadow-[0_4px_12px_rgba(26,22,18,0.08)]" : "bg-surface text-text-faint border border-border cursor-not-allowed"}`}>
                  {dict["home.hero.fb.send"] || "Send feedback"}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {view === "thanks" && (
          <motion.div key="offer-thanks" className="max-w-[480px] mx-auto" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
            <div className="rounded-[12px] border border-border bg-surface-alt p-[32px] shadow-[0_4px_20px_rgba(26,22,18,0.05)] text-center">
              <div className="w-[48px] h-[48px] rounded-full bg-success/10 flex items-center justify-center mx-auto mb-[16px]">
                <Check size={24} strokeWidth={2} className="text-success" />
              </div>
              <p className="text-[16px] font-medium text-text">{dict["home.hero.fb.thanks"] || "Thanks for letting us know."}</p>
              <p className="text-[14px] text-text-faint mt-[8px]">{dict["home.hero.fb.thanksBody"] || "If you change your mind, we're here."}</p>
              <a href={waLink(locale)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-[8px] mt-[24px] px-[24px] py-[12px] rounded-[8px] bg-surface border border-border text-[14px] text-text-muted font-medium transition-all hover:shadow-[0_2px_8px_rgba(26,22,18,0.05)]">
                {dict["home.hero.fb.changeMind"] || "Actually, let's talk"}
              </a>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

/* ── Search bar ── */
function SearchBar({
  query, typedChars, phase, spi, placeholder,
}: {
  query: string; typedChars: number; phase: SearchPhase; spi: number; placeholder: string;
}) {
  return (
    <div className="px-[20px] md:px-[32px] pt-[20px] md:pt-[24px] pb-[14px] md:pb-[16px]">
      <div className="flex items-center gap-[6px] mb-[14px]">
        <div className="flex gap-[2px]">
          {"Search".split("").map((ch, i) => (
            <span key={i} className="text-[22px] md:text-[26px] font-semibold" style={{ color: ["#4285f4", "#ea4335", "#fbbc05", "#4285f4", "#34a853", "#ea4335"][i] }}>
              {ch}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-[10px] rounded-[999px] border border-border px-[18px] py-[12px] shadow-[0_2px_8px_rgba(26,22,18,0.05)] bg-surface">
        <Search size={18} strokeWidth={1.75} className="text-text-faint flex-shrink-0" />
        <span className="text-[16px] md:text-[17px] text-text flex-1 min-w-0 truncate">
          {phase === "idle" ? (
            <span className="text-text-faint">{placeholder}…</span>
          ) : (
            <>
              {spi >= 2 ? query : query.slice(0, typedChars)}
              {phase === "typing" && <span className="inline-block w-[2px] h-[17px] bg-text align-text-bottom ml-[1px] animate-pulse" />}
            </>
          )}
        </span>
        {spi >= 2 && <span className="text-[14px] text-text-faint">✕</span>}
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
          <div className="w-[22px] h-[22px] rounded-full bg-surface-alt border border-border flex items-center justify-center"><span className="text-[9px]">ig</span></div>
          <span className="text-[12px] text-text-faint">instagram.com › salehtechschool</span>
        </div>
        <p className="text-[17px] md:text-[18px] text-[#1a0dab] leading-[1.3]">Saleh Tech School (@salehtechschool)</p>
        <p className="text-[14px] text-text-muted leading-[1.5] mt-[3px]">500+ tələbə · Proqramlaşdırma, robototexnika, AI · 6-18 yaş · Bakı</p>
      </div>
      <div>
        <div className="flex items-center gap-[6px] mb-[3px]">
          <div className="w-[22px] h-[22px] rounded-full bg-surface-alt border border-border flex items-center justify-center"><span className="text-[9px]">fb</span></div>
          <span className="text-[12px] text-text-faint">facebook.com › SalehTechSchool</span>
        </div>
        <p className="text-[17px] md:text-[18px] text-[#1a0dab] leading-[1.3]">Saleh Tech School - Bakı</p>
        <p className="text-[14px] text-text-muted leading-[1.5] mt-[3px]">Uşaqlar üçün texnologiya kursları. Əlaqə: +994 XX XXX XX XX</p>
      </div>
      <div className={`rounded-[8px] px-[14px] py-[12px] -mx-[14px] transition-all duration-700 ${highlighted ? "bg-danger/6" : ""}`}>
        <div className="flex items-center gap-[6px] mb-[3px]">
          <div className="w-[22px] h-[22px] rounded-full bg-surface-alt border border-border flex items-center justify-center"><span className="text-[9px]">m</span></div>
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="border-t border-border pt-[16px]">
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
      <div className="rounded-[8px] border border-border bg-surface overflow-hidden relative shadow-[0_4px_20px_rgba(26,22,18,0.05)]">
        <div className="px-[12px] py-[7px] border-b border-border bg-surface-alt flex items-center gap-[6px] relative z-10">
          <div className="flex gap-[5px]">
            <span className="w-[8px] h-[8px] rounded-full bg-[#ff5f57]" />
            <span className="w-[8px] h-[8px] rounded-full bg-[#febc2e]" />
            <span className="w-[8px] h-[8px] rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 mx-[10px] bg-surface rounded-[4px] border border-border px-[10px] py-[3px]">
            <motion.span className="text-[11px] text-text-faint" animate={{ opacity: p > 10 ? 1 : 0 }}>saleh-tech-school.com</motion.span>
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

/* ── Floating UI components ── */
const uiPieces: { el: React.ReactNode; x: string; y: string; w: string; rotate: number; delay: number; float: [number, number] }[] = [
  // Top-left: nav bar
  {
    x: "6%", y: "52%", w: "160px", rotate: -6, delay: 0.4, float: [-6, 6],
    el: (
      <div className="rounded-[8px] border border-border bg-surface shadow-[0_4px_20px_rgba(26,22,18,0.06)] px-[10px] py-[8px] flex items-center justify-between">
        <div className="h-[6px] w-[28px] rounded bg-text/15" />
        <div className="flex gap-[6px]"><div className="h-[5px] w-[18px] rounded bg-text/10" /><div className="h-[5px] w-[18px] rounded bg-text/10" /><div className="h-[5px] w-[18px] rounded bg-text/10" /></div>
      </div>
    ),
  },
  // Top-right: CTA button
  {
    x: "74%", y: "50%", w: "120px", rotate: 5, delay: 0.6, float: [-8, 4],
    el: (
      <div className="rounded-[8px] bg-accent/15 border border-accent/25 px-[14px] py-[9px] flex items-center justify-center gap-[6px] shadow-[0_4px_16px_rgba(168,71,31,0.10)]">
        <div className="h-[6px] w-[48px] rounded bg-accent/40" />
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3 1.5L7 5L3 8.5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
    ),
  },
  // Center-left: image card
  {
    x: "14%", y: "68%", w: "130px", rotate: 4, delay: 0.8, float: [-5, 7],
    el: (
      <div className="rounded-[8px] border border-border bg-surface shadow-[0_6px_24px_rgba(26,22,18,0.06)] overflow-hidden">
        <div className="h-[48px] bg-surface-alt flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-text-faint"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" /><circle cx="8.5" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.5" /><path d="M3 16l5-5 4 4 3-3 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <div className="px-[8px] py-[6px] space-y-[3px]"><div className="h-[5px] w-[70%] rounded bg-text/10" /><div className="h-[4px] w-[50%] rounded bg-text/6" /></div>
      </div>
    ),
  },
  // Bottom-center: browser mockup
  {
    x: "38%", y: "78%", w: "160px", rotate: -2, delay: 0.7, float: [-4, 6],
    el: (
      <div className="rounded-[8px] border border-border bg-surface shadow-[0_6px_24px_rgba(26,22,18,0.06)] overflow-hidden">
        <div className="px-[8px] py-[5px] border-b border-border bg-surface-alt flex items-center gap-[4px]">
          <div className="flex gap-[3px]"><span className="w-[5px] h-[5px] rounded-full bg-text/15" /><span className="w-[5px] h-[5px] rounded-full bg-text/15" /><span className="w-[5px] h-[5px] rounded-full bg-text/15" /></div>
          <div className="flex-1 mx-[6px] h-[4px] rounded bg-text/8" />
        </div>
        <div className="p-[8px] space-y-[5px]">
          <div className="h-[6px] w-[60%] rounded bg-text/10" />
          <div className="h-[5px] w-[80%] rounded bg-text/6" />
          <div className="h-[14px] w-[50px] rounded-[999px] bg-accent/15 mt-[2px]" />
        </div>
      </div>
    ),
  },
  // Center-right: form
  {
    x: "64%", y: "70%", w: "140px", rotate: -3, delay: 1.0, float: [-7, 5],
    el: (
      <div className="space-y-[6px] rounded-[8px] border border-border bg-surface shadow-[0_6px_24px_rgba(26,22,18,0.06)] p-[10px]">
        <div className="h-[4px] w-[40px] rounded bg-text/12" />
        <div className="rounded-[6px] border border-border bg-surface-alt px-[10px] py-[8px] flex items-center gap-[6px]"><div className="h-[5px] w-[60px] rounded bg-text/8" /></div>
        <div className="rounded-[6px] bg-accent/15 border border-accent/25 px-[10px] py-[7px] flex items-center justify-center"><div className="h-[5px] w-[36px] rounded bg-accent/40" /></div>
      </div>
    ),
  },
  // Far-left: star rating
  {
    x: "3%", y: "62%", w: "90px", rotate: 8, delay: 1.2, float: [-4, 8],
    el: (
      <div className="rounded-[8px] border border-border bg-surface shadow-[0_4px_16px_rgba(26,22,18,0.06)] px-[10px] py-[8px] flex items-center gap-[3px]">
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="10" height="10" viewBox="0 0 12 12" fill={i < 4 ? "var(--accent)" : "none"} stroke={i < 4 ? "none" : "var(--border)"} strokeWidth="1"><path d="M6 1l1.5 3.1L11 4.5 8.5 7l.6 3.5L6 8.8 2.9 10.5l.6-3.5L1 4.5l3.5-.4L6 1z" /></svg>
        ))}
      </div>
    ),
  },
  // Far-right: toggle
  {
    x: "84%", y: "62%", w: "80px", rotate: -8, delay: 0.9, float: [-6, 6],
    el: (
      <div className="rounded-[999px] border border-border bg-surface shadow-[0_4px_16px_rgba(26,22,18,0.06)] px-[10px] py-[6px] flex items-center gap-[6px]">
        <div className="w-[20px] h-[11px] rounded-full bg-accent/20 relative"><div className="absolute right-[1px] top-[1px] w-[9px] h-[9px] rounded-full bg-accent" /></div>
        <div className="h-[4px] w-[24px] rounded bg-text/10" />
      </div>
    ),
  },
];

function FloatingUIComponents({ scrollOpacity }: { scrollOpacity: MotionValue<number> }) {
  return (
    <motion.div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block" style={{ opacity: scrollOpacity }} aria-hidden>
      {uiPieces.map((piece, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: piece.x, top: piece.y, width: piece.w }}
          initial={{ opacity: 0, y: 30, rotate: 0, scale: 0.8 }}
          animate={{ opacity: [0, 1, 1], y: [30, 0, 0], rotate: piece.rotate, scale: 1 }}
          transition={{ duration: 1, delay: piece.delay, ease: "easeOut" }}
        >
          <motion.div animate={{ y: piece.float }} transition={{ duration: 3 + i * 0.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}>
            {piece.el}
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ── Logo marquee ── */
const logos = [
  { src: "/images/logos/azcon.png", alt: "AZCON", h: 28 },
  { src: "/images/logos/metro.png", alt: "Baku Metro", h: 32 },
  { src: "/images/logos/pasha.png", alt: "Pasha Holding", h: 28 },
  { src: "/images/logos/gdg.png", alt: "GDG", h: 20 },
  { src: "/images/logos/idda.png", alt: "IDDA", h: 40 },
  { src: "/images/logos/holberton.png", alt: "Holberton", h: 36 },
  { src: "/images/logos/xsolla-logo.png", alt: "Xsolla", h: 48, dark: true },
];

function LogoMarquee() {
  return (
    <div className="mt-[48px] md:mt-[64px] overflow-hidden">
      <div className="flex animate-[marquee_30s_linear_infinite] w-max">
        {[...Array(3)].map((_, rep) => (
          <div key={rep} className="flex items-center gap-[48px] md:gap-[64px] px-[24px] md:px-[32px]">
            {logos.map((logo) => (
              <Image
                key={`${rep}-${logo.alt}`}
                src={logo.src}
                alt={logo.alt}
                width={logo.h * 3}
                height={logo.h}
                className={`opacity-40 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-300${"dark" in logo && logo.dark ? " brightness-[0.3]" : ""}`}
                style={{ height: logo.h, width: "auto" }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Finished screenshot ── */
function SalehFinished() {
  return (
    <div className="rounded-[8px] border border-border bg-surface overflow-hidden shadow-[0_8px_30px_rgba(26,22,18,0.06)]">
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
