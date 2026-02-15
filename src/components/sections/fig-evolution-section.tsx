"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useFlubber } from "@/hooks/use-flubber";

// ---------------------------------------------------------------------------
// SVG Fig Paths – 3 matched stages shaped like the logo's fig cross-section.
// Wide bulbous body, narrow stem top, rounded bottom.
// Every M + 6C + Z matches across all paths for tangle-free Flubber morphing.
// ViewBox: 0 0 24 28
// ---------------------------------------------------------------------------

// Stage 1 – Legacy: Small, angular/rigid fig
const PATH_LEGACY =
  "M12,5 C14,5 16.5,8 17,12 C17.5,16 17,19 15.5,21.5 C14,23.5 13,24 12,24 C11,24 10,23.5 8.5,21.5 C7,19 6.5,16 7,12 C7.5,8 10,5 12,5 Z";

// Stage 2 – Audit: Slightly larger, smoother
const PATH_AUDIT =
  "M12,4 C14.5,4 18,7 19,12 C20,17 19,20.5 17,23 C15,25.5 13.5,26 12,26 C10.5,26 9,25.5 7,23 C5,20.5 4,17 5,12 C6,7 9.5,4 12,4 Z";

// Stage 3 – Mature: Full, organic, lush
const PATH_MATURE =
  "M12,3 C15,3 19.5,6.5 20.5,12 C21.5,17.5 20.5,21.5 18,24.5 C16,27 14,27.5 12,27.5 C10,27.5 8,27 6,24.5 C3.5,21.5 2.5,17.5 3.5,12 C4.5,6.5 9,3 12,3 Z";

const FIG_PATHS = [PATH_LEGACY, PATH_AUDIT, PATH_MATURE];

// ---------------------------------------------------------------------------
// Circuit lines positioned inside the fig body (visible during phase 3)
// ---------------------------------------------------------------------------
const CIRCUIT_LINES = [
  "M 12 9 L 12 22",           // Vertical trunk
  "M 12 13 L 9 15 L 8 18",    // Left branch
  "M 12 16 L 15 18 L 16 20",   // Right branch
  "M 8 18 L 7 20",             // Left terminal
  "M 16 20 L 17 21.5",         // Right terminal
  "M 9 16.5 L 14.5 18",        // Cross connector
];

const CIRCUIT_NODES: [number, number][] = [
  [12, 13], [9, 15], [8, 18],
  [15, 18], [16, 20], [7, 20], [17, 21.5],
];

// ---------------------------------------------------------------------------
// Phase labels
// ---------------------------------------------------------------------------
const PHASES = [
  { label: "Legacy", sub: "Where you are today" },
  { label: "Audit", sub: "Understanding the gaps" },
  { label: "Digitization", sub: "Building the bridge" },
  { label: "Maturity", sub: "Digital-first operations" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function FigEvolutionSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring-smoothed progress for organic, weighted movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });

  // ------ Path morphing via Flubber (3 paths at [0, 0.5, 1]) ------
  const figPath = useFlubber(smoothProgress, FIG_PATHS);

  // ------ Color transitions across 4 visual phases ------
  const fillColor = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["#4A7C59", "#B8A038", "#8B6BAE", "#A855F7", "#A855F7"]
  );

  const strokeColor = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["#3D6B4A", "#9A8830", "#6B4E8A", "#7C3AED", "#7C3AED"]
  );

  // ------ Scale: 0.8 → 1.2 ------
  const figScale = useTransform(smoothProgress, [0, 1], [0.8, 1.2]);

  // ------ Glow: CSS drop-shadow for final phase (0.75–1.0) ------
  const glowOpacity = useTransform(smoothProgress, [0.7, 0.95], [0, 0.4]);
  const glowBlur = useTransform(smoothProgress, [0.7, 0.95], [0, 15]);

  // ------ Circuit line reveal (phase 3 – ~0.4 to 0.7) ------
  const circuitPathLength = useTransform(smoothProgress, [0.4, 0.65], [0, 1]);
  const circuitOpacity = useTransform(
    smoothProgress,
    [0.4, 0.5, 0.7, 0.8],
    [0, 0.8, 0.8, 0]
  );

  // ------ Phase labels ------
  const phase0Opacity = useTransform(smoothProgress, [0, 0.05, 0.2, 0.28], [0, 1, 1, 0]);
  const phase1Opacity = useTransform(smoothProgress, [0.22, 0.3, 0.45, 0.53], [0, 1, 1, 0]);
  const phase2Opacity = useTransform(smoothProgress, [0.47, 0.55, 0.7, 0.78], [0, 1, 1, 0]);
  const phase3Opacity = useTransform(smoothProgress, [0.72, 0.8, 0.95, 1], [0, 1, 1, 1]);
  const phaseOpacities = [phase0Opacity, phase1Opacity, phase2Opacity, phase3Opacity];

  // ------ Scroll indicator ------
  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.05], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[400vh]">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center bg-white overflow-hidden">
        {/* Subtle radial background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.03)_0%,_transparent_70%)]" />

        {/* Fig SVG wrapped in motion.div for scale + CSS drop-shadow glow */}
        <motion.div
          className="relative z-10"
          style={{
            scale: figScale,
            willChange: "transform, filter",
            filter: useTransform(
              [glowBlur, glowOpacity],
              ([blur, opacity]) =>
                `drop-shadow(0 0 ${blur}px rgba(168,85,247,${opacity}))`
            ),
          }}
        >
          <svg viewBox="0 0 24 28" className="w-48 sm:w-56 md:w-72 h-auto">
            {/* Stem */}
            <motion.line
              x1="12"
              y1="3"
              x2="12"
              y2="0.5"
              style={{ stroke: strokeColor }}
              strokeWidth={0.5}
              strokeLinecap="round"
            />
            <motion.path
              d="M 11.6 2 Q 10.5 0.5 9.5 1"
              fill="none"
              style={{ stroke: strokeColor }}
              strokeWidth={0.4}
              strokeLinecap="round"
            />

            {/* Main fig shape */}
            <motion.path
              d={figPath}
              style={{ fill: fillColor, stroke: strokeColor }}
              strokeWidth={0.3}
            />

            {/* Circuit lines – draw on during digitization phase */}
            {CIRCUIT_LINES.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                fill="none"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth={0.3}
                strokeLinecap="round"
                style={{
                  pathLength: circuitPathLength,
                  opacity: circuitOpacity,
                }}
              />
            ))}

            {/* Circuit nodes */}
            {CIRCUIT_NODES.map(([cx, cy], i) => (
              <motion.circle
                key={i}
                cx={cx}
                cy={cy}
                r={0.5}
                fill="rgba(255,255,255,0.9)"
                style={{ opacity: circuitOpacity }}
              />
            ))}
          </svg>
        </motion.div>

        {/* Phase labels */}
        <div className="relative h-20 mt-8 flex items-start justify-center w-full max-w-md">
          {PHASES.map((phase, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 flex flex-col items-center text-center"
              style={{ opacity: phaseOpacities[i] }}
            >
              <span className="font-mono text-xs tracking-widest uppercase text-text-secondary mb-1">
                Phase {i + 1}
              </span>
              <h3 className="font-heading text-2xl font-bold text-text-primary">
                {phase.label}
              </h3>
              <p className="text-sm text-text-secondary mt-1">{phase.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Scroll indicator (fades out on scroll) */}
        <motion.div
          className="absolute bottom-8 flex flex-col items-center gap-2"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <span className="text-xs text-text-secondary font-mono tracking-wider uppercase">
            Scroll to explore
          </span>
          <motion.div
            className="w-5 h-8 rounded-full border-2 border-text-secondary/30 flex items-start justify-center p-1"
            initial={{ opacity: 0.6 }}
          >
            <motion.div
              className="w-1 h-1.5 rounded-full bg-text-secondary/50"
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
