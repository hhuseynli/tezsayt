"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Send, Check } from "lucide-react";

export function HowItWorks({ dict }: { dict: Record<string, string> }) {
  const [active, setActive] = useState(0);

  const tabs = [
    dict["home.how.tab1"] || "Chat",
    dict["home.how.tab2"] || "Free draft",
    dict["home.how.tab3"] || "Decide",
  ];
  const times = [
    dict["home.how.time1"] || "~10 min",
    dict["home.how.time2"] || "3 days",
    dict["home.how.time3"] || "Same day",
  ];
  const steps = [
    { title: dict["home.how.step1.title"], body: dict["home.how.step1.body"] },
    { title: dict["home.how.step2.title"], body: dict["home.how.step2.body"] },
    { title: dict["home.how.step3.title"], body: dict["home.how.step3.body"] },
  ];

  return (
    <section className="bg-bg">
      <div className="max-w-[1120px] mx-auto px-[20px] md:px-[24px] py-[64px] md:py-[96px]">
        <h2 className="font-serif text-[26px] md:text-[32px] font-normal leading-[1.2] tracking-[-0.02em] text-center">
          {dict["home.how.heading"]}
        </h2>

        {/* Tab switcher */}
        <div className="flex items-center justify-center mt-[32px] md:mt-[40px]">
          <div className="inline-flex rounded-[999px] border border-border bg-surface p-[4px] shadow-[0_2px_8px_rgba(26,22,18,0.05)]">
            {tabs.map((label, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative px-[14px] md:px-[24px] py-[10px] rounded-[999px] text-[13px] md:text-[14px] font-medium transition-all ${
                  active === i ? "text-text" : "text-text-faint hover:text-text-muted"
                }`}
              >
                {active === i && (
                  <motion.div
                    layoutId="howTab"
                    className="absolute inset-0 rounded-[999px] bg-surface-alt border border-border shadow-[0_1px_3px_rgba(26,22,18,0.05)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-[1]">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Timeline progress */}
        <div className="max-w-[320px] mx-auto mt-[20px] flex items-center gap-[4px]">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex-1 h-[3px] rounded-full overflow-hidden bg-surface-alt">
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={false}
                animate={{ width: i <= active ? "100%" : "0%" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          ))}
        </div>

        {/* Content card */}
        <div className="max-w-[800px] mx-auto mt-[28px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="bg-surface rounded-[16px] border border-border shadow-[0_4px_20px_rgba(26,22,18,0.04)] overflow-hidden"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Left: text content */}
                <div className="flex-1 p-[28px] md:p-[36px]">
                  <span className="inline-flex items-center gap-[4px] text-[12px] text-text-faint bg-surface-alt px-[8px] py-[3px] rounded-[999px]">
                    <Clock size={11} strokeWidth={2} />
                    {times[active]}
                  </span>
                  <h3 className="font-serif text-[20px] md:text-[24px] font-normal leading-[1.2] mt-[10px]">
                    {steps[active].title}
                  </h3>
                  <p className="text-[14px] md:text-[15px] text-text-muted leading-[1.6] mt-[10px]">
                    {steps[active].body}
                  </p>
                </div>

                {/* Right: step visual */}
                <div className="md:w-[280px] bg-surface-alt border-t md:border-t-0 md:border-l border-border flex items-center justify-center p-[24px] md:p-[28px]">
                  <StepVisual step={active} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="text-[13px] text-text-faint mt-[24px] text-center">
          {dict["home.how.fineprint"]}
        </p>
      </div>
    </section>
  );
}

/* ── Step visuals ── */
function StepVisual({ step }: { step: number }) {
  if (step === 0) return <ChatVisual />;
  if (step === 1) return <BuildVisual />;
  return <DecideVisual />;
}

/* Chat bubble mockup */
function ChatVisual() {
  return (
    <div className="w-full max-w-[200px] space-y-[8px]">
      {/* Incoming */}
      <motion.div
        className="flex justify-start"
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="bg-surface border border-border rounded-[12px] rounded-bl-[4px] px-[12px] py-[8px] max-w-[75%]">
          <div className="h-[5px] w-[80px] rounded bg-text/10" />
          <div className="h-[5px] w-[50px] rounded bg-text/7 mt-[4px]" />
        </div>
      </motion.div>
      {/* Outgoing */}
      <motion.div
        className="flex justify-end"
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="bg-accent/10 border border-accent/15 rounded-[12px] rounded-br-[4px] px-[12px] py-[8px] max-w-[75%]">
          <div className="h-[5px] w-[60px] rounded bg-accent/30" />
          <div className="h-[5px] w-[40px] rounded bg-accent/20 mt-[4px]" />
        </div>
      </motion.div>
      {/* Incoming reply */}
      <motion.div
        className="flex justify-start"
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="bg-surface border border-border rounded-[12px] rounded-bl-[4px] px-[12px] py-[8px] max-w-[75%]">
          <div className="h-[5px] w-[70px] rounded bg-text/10" />
        </div>
      </motion.div>
      {/* Typing indicator */}
      <motion.div
        className="flex justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-center gap-[4px] bg-accent/10 border border-accent/15 rounded-[12px] rounded-br-[4px] px-[12px] py-[10px]">
          <Send size={12} className="text-accent/50" />
          <div className="flex gap-[3px]">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-[4px] h-[4px] rounded-full bg-accent/40"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* Browser building wireframe */
function BuildVisual() {
  return (
    <div className="w-full max-w-[200px]">
      <div className="rounded-[8px] border border-border bg-surface overflow-hidden shadow-[0_2px_8px_rgba(26,22,18,0.04)]">
        {/* Browser chrome */}
        <div className="px-[8px] py-[5px] border-b border-border bg-surface-alt flex items-center gap-[4px]">
          <div className="flex gap-[3px]">
            <span className="w-[5px] h-[5px] rounded-full bg-[#ff5f57]" />
            <span className="w-[5px] h-[5px] rounded-full bg-[#febc2e]" />
            <span className="w-[5px] h-[5px] rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 mx-[4px] h-[4px] rounded bg-text/8" />
        </div>
        {/* Page content building up */}
        <div className="p-[8px] space-y-[6px]">
          <motion.div className="h-[5px] rounded bg-text/12" initial={{ width: 0 }} animate={{ width: "60%" }} transition={{ delay: 0.1, duration: 0.5 }} />
          <motion.div className="h-[5px] rounded bg-text/8" initial={{ width: 0 }} animate={{ width: "80%" }} transition={{ delay: 0.3, duration: 0.5 }} />
          <motion.div className="h-[14px] rounded-[999px] bg-accent/15" initial={{ width: 0 }} animate={{ width: 50 }} transition={{ delay: 0.5, duration: 0.4 }} />
          <motion.div
            className="h-[40px] rounded-[4px] bg-surface-alt border border-border flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-text-faint">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3 16l5-5 4 4 3-3 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
          <motion.div className="h-[5px] rounded bg-text/6" initial={{ width: 0 }} animate={{ width: "70%" }} transition={{ delay: 0.9, duration: 0.4 }} />
          <motion.div className="h-[5px] rounded bg-text/6" initial={{ width: 0 }} animate={{ width: "50%" }} transition={{ delay: 1.0, duration: 0.4 }} />
        </div>
      </div>
      {/* Progress bar below */}
      <div className="mt-[8px] h-[3px] rounded-full bg-surface-alt overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-accent"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.1, duration: 1.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

/* Checkmark / decision visual */
function DecideVisual() {
  return (
    <div className="w-full max-w-[200px] flex flex-col items-center gap-[12px]">
      {/* Big checkmark */}
      <motion.div
        className="w-[56px] h-[56px] rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Check size={28} strokeWidth={2.5} className="text-accent" />
        </motion.div>
      </motion.div>
      {/* Two option cards */}
      <div className="w-full space-y-[6px]">
        <motion.div
          className="flex items-center gap-[8px] bg-accent/8 border border-accent/15 rounded-[8px] px-[10px] py-[8px]"
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="w-[14px] h-[14px] rounded-full bg-accent flex items-center justify-center">
            <Check size={9} strokeWidth={3} className="text-white" />
          </div>
          <div className="h-[5px] w-[70px] rounded bg-accent/25" />
        </motion.div>
        <motion.div
          className="flex items-center gap-[8px] bg-surface border border-border rounded-[8px] px-[10px] py-[8px]"
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.65 }}
        >
          <div className="w-[14px] h-[14px] rounded-full border border-border" />
          <div className="h-[5px] w-[60px] rounded bg-text/10" />
        </motion.div>
      </div>
    </div>
  );
}
