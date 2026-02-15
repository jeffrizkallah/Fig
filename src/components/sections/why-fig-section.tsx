"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { DIFFERENTIATORS } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import {
  BrainCircuit,
  User,
  Lightbulb,
  Target,
  Palette,
  Cpu,
  ScanSearch,
  Bot,
} from "lucide-react";

const AUTO_ADVANCE_MS = 5000;
const PAUSE_AFTER_CLICK_MS = 12000;

/* ── Shared counter ──────────────────────────────────────── */
function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  delay = 0,
  className = "text-accent",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const duration = 1200;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start - delay;
      if (elapsed < 0) {
        requestAnimationFrame(step);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value, delay]);

  return (
    <span className={`font-mono font-bold tabular-nums ${className}`}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

/* ── Visual 0: Efficiency First ─────────────────────────── */
function EfficiencyVisual() {
  return (
    <div className="flex flex-col justify-between h-full gap-5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-accent-warm/40" />
          <div className="w-3 h-3 rounded-full bg-accent/40" />
          <div className="w-3 h-3 rounded-full bg-border" />
        </div>
        <p className="text-xs font-medium text-text-secondary">
          Time to complete monthly reporting
        </p>
      </motion.div>

      {/* Before / After bars */}
      <div className="space-y-4 flex-1 flex flex-col justify-center">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-text-secondary uppercase tracking-wider">
              Before
            </span>
            <span className="text-[10px] text-accent-warm/60 bg-accent-warm/8 px-2 py-0.5 rounded-full">
              Manual
            </span>
          </div>
          <div className="relative h-9 rounded-lg bg-bg-secondary overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-lg bg-accent-warm/20"
              initial={{ width: 0 }}
              animate={{ width: "88%" }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-accent-warm font-bold">
              3 days
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-text-secondary uppercase tracking-wider">
              After
            </span>
            <span className="text-[10px] text-accent/60 bg-accent/8 px-2 py-0.5 rounded-full">
              Automated
            </span>
          </div>
          <div className="relative h-9 rounded-lg bg-bg-secondary overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-lg bg-accent/25"
              initial={{ width: 0 }}
              animate={{ width: "12%" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            />
            <span className="absolute left-[15%] top-1/2 -translate-y-1/2 font-mono text-xs text-accent font-bold">
              15 min
            </span>
          </div>
        </div>
      </div>

      {/* Big stat + mini cards */}
      <div className="space-y-3">
        <motion.div
          className="flex items-center gap-3 rounded-xl bg-accent/8 border border-accent/15 px-4 py-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <span className="font-mono text-3xl font-bold text-accent">92%</span>
          <span className="text-xs text-text-secondary leading-tight">
            time saved on
            <br />
            recurring tasks
          </span>
        </motion.div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Tools", value: "12→1" },
            { label: "Errors", value: "0" },
            { label: "Updates", value: "Real-time" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="rounded-lg bg-bg-secondary/80 p-2.5 text-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1 }}
            >
              <div className="font-mono text-xs font-bold text-text-primary">
                {stat.value}
              </div>
              <div className="text-[9px] text-text-secondary mt-0.5">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Visual 1: End-to-End ────────────────────────────────── */
const JOURNEY_DATA = [
  { label: "Chat", desc: "Understand your goals" },
  { label: "Audit", desc: "Map current systems" },
  { label: "Build", desc: "Develop solutions" },
  { label: "Train", desc: "Upskill your team" },
  { label: "Support", desc: "Ongoing optimisation" },
];

function EndToEndVisual() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-2"
      >
        <p className="text-xs font-medium text-text-secondary">
          Your journey with Fig
        </p>
      </motion.div>

      {/* Vertical timeline */}
      <div className="flex-1 relative pl-6 pt-3">
        {/* Connecting line — starts and ends at dot centres */}
        <motion.div
          className="absolute left-[9px] w-[2px] bg-accent/30 origin-top"
          style={{ top: 18, bottom: 34 }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />

        <div className="space-y-1.5">
          {JOURNEY_DATA.map((step, i) => {
            const isHighlighted = i === 2;
            return (
              <motion.div
                key={step.label}
                className="relative flex items-center"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.4 }}
              >
                {/* Dot */}
                <div
                  className={`absolute -left-6 w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center ${
                    isHighlighted
                      ? "bg-accent border-accent"
                      : "bg-white border-accent/30"
                  }`}
                >
                  {isHighlighted && (
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-white"
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </div>

                {/* Content */}
                <div
                  className={`flex-1 rounded-lg px-3 py-2 ${
                    isHighlighted
                      ? "bg-accent/8 border border-accent/15"
                      : "bg-bg-secondary/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-accent/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-xs font-semibold ${
                        isHighlighted
                          ? "text-text-primary"
                          : "text-text-secondary"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  <p className="text-[10px] text-text-secondary mt-0.5 pl-6">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <motion.div
        className="flex items-center gap-2 mt-2 rounded-lg bg-accent/5 border border-accent/10 px-3 py-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-[11px] text-text-secondary">
          One partner through every stage
        </span>
      </motion.div>
    </div>
  );
}

/* ── Visual 2: Human + AI ────────────────────────────────── */
const HUMAN_TASKS = [
  { icon: Lightbulb, label: "Strategy" },
  { icon: Target, label: "Decisions" },
  { icon: Palette, label: "Creativity" },
];

const AI_TASKS = [
  { icon: Cpu, label: "Data Processing" },
  { icon: ScanSearch, label: "Pattern Recognition" },
  { icon: Bot, label: "Automation" },
];

function HumanAIVisual() {
  return (
    <div className="flex flex-col justify-between h-full">
      {/* Header */}
      <motion.p
        className="text-xs font-medium text-text-secondary mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        How your team and AI work together
      </motion.p>

      {/* Two panels */}
      <div className="flex-1 grid grid-cols-2 gap-3">
        {/* Human side */}
        <motion.div
          className="rounded-xl bg-accent-warm/5 border border-accent-warm/15 p-3 flex flex-col"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <User className="w-4 h-4 text-accent-warm" />
            <span className="text-xs font-semibold text-accent-warm">
              Your Team
            </span>
          </div>
          <div className="space-y-2 flex-1">
            {HUMAN_TASKS.map((task, i) => (
              <motion.div
                key={task.label}
                className="flex items-center gap-2 rounded-lg bg-white/60 px-2.5 py-2 border border-accent-warm/10"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.12 }}
              >
                <task.icon className="w-3.5 h-3.5 text-accent-warm/70" />
                <span className="text-[11px] font-medium text-text-secondary">
                  {task.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI side */}
        <motion.div
          className="rounded-xl bg-accent/5 border border-accent/15 p-3 flex flex-col"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <BrainCircuit className="w-4 h-4 text-accent" />
            <span className="text-xs font-semibold text-accent">AI Layer</span>
          </div>
          <div className="space-y-2 flex-1">
            {AI_TASKS.map((task, i) => (
              <motion.div
                key={task.label}
                className="flex items-center gap-2 rounded-lg bg-white/60 px-2.5 py-2 border border-accent/10"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.12 }}
              >
                <task.icon className="w-3.5 h-3.5 text-accent/70" />
                <span className="text-[11px] font-medium text-text-secondary">
                  {task.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Connection indicator */}
      <motion.div
        className="mt-3 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="h-[2px] w-full bg-bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full w-12 rounded-full bg-gradient-to-r from-accent-warm/50 to-accent/50"
            animate={{ x: ["-48px", "calc(100% + 48px)"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 0.5,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="flex items-center gap-2 mt-3 rounded-lg bg-bg-secondary border border-border px-3 py-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-xs text-text-secondary">
          Augmented, not replaced
        </span>
      </motion.div>
    </div>
  );
}

/* ── Visual 3: ROI-Driven ────────────────────────────────── */
function ROIVisual() {
  return (
    <div className="flex flex-col justify-between h-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-3"
      >
        <div className="flex gap-2 mb-2">
          <div className="w-3 h-3 rounded-full bg-accent/40" />
          <div className="w-3 h-3 rounded-full bg-accent-warm/40" />
          <div className="w-3 h-3 rounded-full bg-border" />
        </div>
        <p className="text-xs font-medium text-text-secondary">
          Measurable impact across the board
        </p>
      </motion.div>

      {/* Big counters */}
      <div className="grid grid-cols-3 gap-2">
        <motion.div
          className="rounded-xl bg-accent/5 border border-accent/10 p-3 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <AnimatedCounter
            value={42}
            prefix="+"
            suffix="%"
            delay={200}
            className="text-accent text-xl"
          />
          <div className="text-[10px] text-text-secondary mt-1">
            Efficiency
          </div>
        </motion.div>

        <motion.div
          className="rounded-xl bg-accent-warm/5 border border-accent-warm/10 p-3 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <AnimatedCounter
            value={68}
            prefix="-"
            suffix="%"
            delay={400}
            className="text-accent-warm text-xl"
          />
          <div className="text-[10px] text-text-secondary mt-1">
            Manual Work
          </div>
        </motion.div>

        <motion.div
          className="rounded-xl bg-accent/5 border border-accent/10 p-3 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <AnimatedCounter
            value={3}
            suffix=".2x"
            delay={600}
            className="text-accent text-xl"
          />
          <div className="text-[10px] text-text-secondary mt-1">ROI</div>
        </motion.div>
      </div>

      {/* Bar chart — taller */}
      <div className="flex-1 flex items-end gap-1.5 py-3 min-h-[100px]">
        {[25, 38, 32, 48, 42, 55, 50, 68, 62, 78, 72, 92].map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t bg-accent/12"
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{
              duration: 0.5,
              delay: 0.5 + i * 0.05,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Trend line footer */}
      <motion.div
        className="flex items-center justify-between rounded-lg bg-bg-secondary/80 px-3 py-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-[10px] text-text-secondary">
          Growth over 12 months
        </span>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="font-mono text-[10px] font-bold text-accent">
            ↑ Trending
          </span>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Visual registry ─────────────────────────────────────── */
const VISUALS = [EfficiencyVisual, EndToEndVisual, HumanAIVisual, ROIVisual];

/* ── Main component ──────────────────────────────────────── */
export function WhyFigSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pausedUntilRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() > pausedUntilRef.current) {
        setActiveIndex((prev) => (prev + 1) % DIFFERENTIATORS.length);
      }
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    pausedUntilRef.current = Date.now() + PAUSE_AFTER_CLICK_MS;
  };

  return (
    <section id="about" className="py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - interactive differentiators */}
          <div>
            <SectionHeading
              label="Why Fig"
              title="Built different. On purpose."
              subtitle="We're not a consultancy that disappears after a slide deck. We build, train, and support, end to end."
              align="left"
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-3"
            >
              {DIFFERENTIATORS.map((item, index) => {
                const isActive = index === activeIndex;
                const Icon = item.icon;

                return (
                  <motion.button
                    key={item.title}
                    variants={fadeInUp}
                    onClick={() => handleClick(index)}
                    className={`w-full text-left rounded-xl px-5 py-4 border transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                      isActive
                        ? "bg-accent/5 border-accent/20"
                        : "bg-transparent border-transparent hover:bg-bg-secondary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                          isActive
                            ? "bg-accent/15 text-accent"
                            : "bg-bg-secondary text-text-secondary"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3
                        className={`font-heading text-base font-semibold transition-colors duration-300 ${
                          isActive ? "text-text-primary" : "text-text-secondary"
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="text-sm text-text-secondary leading-relaxed overflow-hidden pl-11"
                        >
                          <span className="block pt-2">
                            {item.description}
                          </span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          {/* Right - swappable visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative hidden lg:block"
          >
            <div className="relative min-h-[440px] max-w-md mx-auto">
              {/* Layered card frame */}
              <div className="absolute inset-0 rounded-3xl bg-bg-secondary border border-border" />
              <div className="absolute inset-3 rounded-2xl bg-white border border-border shadow-sm" />

              {/* Visual content */}
              <div className="absolute inset-3 p-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="h-full"
                  >
                    {(() => {
                      const Visual = VISUALS[activeIndex];
                      return <Visual />;
                    })()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
