"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PROCESS_STEPS } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const AUTO_ADVANCE_MS = 4000;
const PAUSE_AFTER_CLICK_MS = 10000;

export function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pausedUntilRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() > pausedUntilRef.current) {
        setActiveIndex((prev) => (prev + 1) % PROCESS_STEPS.length);
      }
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, []);

  const handleStepClick = (index: number) => {
    setActiveIndex(index);
    pausedUntilRef.current = Date.now() + PAUSE_AFTER_CLICK_MS;
  };

  const activeStep = PROCESS_STEPS[activeIndex];

  return (
    <section
      id="process"
      className="py-24 md:py-32 bg-bg-dark overflow-hidden"
    >
      <Container>
        <SectionHeading
          label="How We Work"
          title="From conversation to transformation."
          subtitle="A clear, structured process so you always know what's happening and what's next."
          dark
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Stepper row */}
          <motion.div variants={fadeInUp} className="relative mb-10 md:mb-12">
            {/* Connecting line (behind nodes) */}
            <div className="absolute top-5 left-0 right-0 hidden md:block">
              <div className="mx-auto max-w-3xl relative h-[2px]">
                {/* Background line */}
                <div className="absolute inset-0 bg-border-dark/60 rounded-full" />
                {/* Progress fill */}
                <motion.div
                  className="absolute inset-y-0 left-0 bg-accent/50 rounded-full"
                  animate={{
                    width: `${(activeIndex / (PROCESS_STEPS.length - 1)) * 100}%`,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            </div>

            {/* Nodes */}
            <div className="flex justify-between items-start max-w-3xl mx-auto relative">
              {PROCESS_STEPS.map((step, index) => {
                const isActive = index === activeIndex;
                const isPast = index < activeIndex;
                const Icon = step.icon;

                return (
                  <button
                    key={step.number}
                    onClick={() => handleStepClick(index)}
                    className="flex flex-col items-center gap-2 md:gap-3 group relative z-10 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark rounded-lg"
                  >
                    {/* Node circle */}
                    <div className="relative">
                      <motion.div
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                          isActive
                            ? "bg-accent border-accent"
                            : isPast
                              ? "bg-accent/20 border-accent/40"
                              : "bg-bg-dark border-border-dark/60 group-hover:border-accent/30"
                        }`}
                        animate={
                          isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }
                        }
                        transition={
                          isActive
                            ? {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }
                            : { duration: 0.3 }
                        }
                      >
                        <Icon
                          className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-colors duration-300 ${
                            isActive
                              ? "text-white"
                              : isPast
                                ? "text-accent"
                                : "text-text-on-dark-muted group-hover:text-text-on-dark"
                          }`}
                        />
                      </motion.div>

                      {/* Auto-advance ring indicator */}
                      {isActive && (
                        <svg
                          className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)]"
                          viewBox="0 0 44 44"
                        >
                          <motion.circle
                            cx="22"
                            cy="22"
                            r="20"
                            fill="none"
                            stroke="var(--accent)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeDasharray="125.6"
                            strokeDashoffset="125.6"
                            key={`ring-${activeIndex}`}
                            animate={{ strokeDashoffset: 0 }}
                            transition={{
                              duration: AUTO_ADVANCE_MS / 1000,
                              ease: "linear",
                            }}
                            style={{
                              transform: "rotate(-90deg)",
                              transformOrigin: "center",
                            }}
                          />
                        </svg>
                      )}
                    </div>

                    {/* Label */}
                    <div className="flex flex-col items-center">
                      <span
                        className={`font-mono text-[10px] md:text-xs transition-colors duration-300 ${
                          isActive
                            ? "text-accent"
                            : isPast
                              ? "text-accent/60"
                              : "text-text-on-dark-muted/60 group-hover:text-text-on-dark-muted"
                        }`}
                      >
                        {step.number}
                      </span>
                      <span
                        className={`hidden md:block text-xs md:text-sm font-medium transition-colors duration-300 ${
                          isActive
                            ? "text-text-on-dark"
                            : isPast
                              ? "text-text-on-dark-muted"
                              : "text-text-on-dark-muted/60 group-hover:text-text-on-dark-muted"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Content panel */}
          <motion.div variants={fadeInUp}>
            <div className="max-w-3xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="bg-bg-dark-lighter rounded-2xl p-6 md:p-8 border border-border-dark/50 relative overflow-hidden"
                >
                  {/* Accent top border */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

                  <div className="flex items-start gap-4 md:gap-5">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <activeStep.icon className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-xs text-accent/70">
                          {activeStep.number}
                        </span>
                        <h3 className="font-heading text-xl md:text-2xl font-bold text-text-on-dark">
                          {activeStep.title}
                        </h3>
                      </div>
                      <p className="text-text-on-dark-muted leading-relaxed">
                        {activeStep.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
