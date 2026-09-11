"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { Container } from "@/components/ui/container";

// ---------------------------------------------------------------------------
// Copy
// ---------------------------------------------------------------------------
// Four beats. Each owns a slice of the scroll: it fades up as it arrives and
// fades out before the next arrives. The closing line lands last and stays.
interface Beat {
  lead: React.ReactNode;
  trail?: React.ReactNode;
}

const BEATS: Beat[] = [
  {
    lead: (
      <>
        Every week there&apos;s another headline.{" "}
        <em className="not-italic text-text-on-dark font-medium">
          Adopt AI or get left behind.
        </em>
      </>
    ),
    trail: (
      <>
        So you watched the videos. Took the course. Sat through the webinar. And
        you still don&apos;t know what to build, or whether AI is even the
        answer to your problem.
      </>
    ),
  },
  {
    lead: <>You run a good business. It works. Everyone&apos;s busy.</>,
    trail: (
      <>
        And somewhere in the back of your mind is the feeling that it should all
        be running more smoothly than this, and no clear idea where to
        start. Or you know exactly where to start, and no time or way to
        actually do it.
      </>
    ),
  },
  {
    lead: (
      <>
        Here&apos;s the truth. Most businesses don&apos;t need much. They need
        two or three things fixed where the work is slow, repetitive and
        expensive.
      </>
    ),
    trail: (
      <>
        Sometimes that means AI. More often it&apos;s a dashboard, a proper
        system, or a repetitive job that should have been automated years ago.
      </>
    ),
  },
  {
    lead: (
      <>
        Knowing which is which is the hard part. And you&apos;re too busy
        running the business to work it out yourself.
      </>
    ),
  },
];

// Scroll windows per beat: [fadeInStart, fullStart, fullEnd, fadeOutEnd].
// Each beat is fully transparent before the next begins to appear. The
// windows must not overlap, or two beats stack on the same absolute slot
// and the text becomes unreadable.
const BEAT_WINDOWS: [number, number, number, number][] = [
  [0.03, 0.10, 0.18, 0.22],
  [0.24, 0.31, 0.39, 0.43],
  [0.45, 0.52, 0.60, 0.64],
  [0.66, 0.72, 0.80, 0.84],
];

// ---------------------------------------------------------------------------
// Beat
// ---------------------------------------------------------------------------
function BeatBlock({
  beat,
  index,
  progress,
  reduced,
}: {
  beat: Beat;
  index: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const [a, b, c, d] = BEAT_WINDOWS[index];

  const opacity = useTransform(progress, [a, b, c, d], [0, 1, 1, 0]);
  const y = useTransform(progress, [a, b], [26, 0]);

  return (
    <motion.div
      style={reduced ? undefined : { opacity, y, willChange: "opacity, transform" }}
      className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-5 px-2 pointer-events-none"
    >
      <p className="font-heading text-[26px] sm:text-3xl md:text-[38px] leading-[1.28] tracking-[-0.015em] text-text-on-dark text-balance max-w-[24ch]">
        {beat.lead}
      </p>
      {beat.trail && (
        <p className="font-heading text-[19px] sm:text-[22px] md:text-[25px] leading-[1.45] text-text-on-dark-muted text-balance max-w-[34ch]">
          {beat.trail}
        </p>
      )}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------
export function ProblemSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 22,
    restDelta: 0.001,
  });

  // Closing line: arrives after the last beat has dimmed, then holds.
  const turnOpacity = useTransform(progress, [0.86, 0.93], [0, 1]);
  const turnY = useTransform(progress, [0.86, 0.93], [22, 0]);

  // Progress rail down the left edge of the pinned viewport.
  const railScale = useTransform(progress, [0.02, 0.92], [0, 1]);

  // Scroll cue fades as soon as the reader starts moving.
  const cueOpacity = useTransform(progress, [0, 0.05], [1, 0]);

  // -------------------------------------------------------------------------
  // Reduced motion: no pinning, all four beats stacked and readable.
  // -------------------------------------------------------------------------
  if (reduced) {
    return (
      <section
        id="problem"
        className="relative rounded-[32px] bg-bg-dark py-24 md:py-32 overflow-hidden"
      >
        {/* Fine vertical lines, fading out at the top and bottom edges */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(245,245,240,0.05) 0px, rgba(245,245,240,0.05) 1px, transparent 1px, transparent 5px)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, #000 22%, #000 78%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, #000 22%, #000 78%, transparent 100%)",
          }}
        />

        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-80 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 0%, rgba(74,124,89,0.18), transparent 70%)",
          }}
        />
        <Container>
          <div className="relative flex flex-col items-center gap-16 text-center">
            {BEATS.map((beat, i) => (
              <div key={i} className="flex flex-col items-center gap-5">
                <p className="font-heading text-[26px] sm:text-3xl md:text-[38px] leading-[1.28] tracking-[-0.015em] text-text-on-dark text-balance max-w-[24ch]">
                  {beat.lead}
                </p>
                {beat.trail && (
                  <p className="font-heading text-[19px] sm:text-[22px] md:text-[25px] leading-[1.45] text-text-on-dark-muted text-balance max-w-[34ch]">
                    {beat.trail}
                  </p>
                )}
              </div>
            ))}
            <p className="font-heading font-semibold text-[34px] sm:text-5xl md:text-[56px] leading-[1.02] tracking-[-0.02em] text-text-on-dark">
              That&apos;s why we built Fig.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  // -------------------------------------------------------------------------
  // Pinned scroll sequence
  // -------------------------------------------------------------------------
  return (
    <section
      ref={containerRef}
      id="problem"
      className="relative h-[420vh] rounded-[32px] bg-bg-dark"
    >
      <div className="sticky top-0 h-screen overflow-hidden rounded-[32px] bg-bg-dark">
        {/* Fine vertical lines, fading out at the top and bottom edges */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(245,245,240,0.05) 0px, rgba(245,245,240,0.05) 1px, transparent 1px, transparent 5px)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, #000 22%, #000 78%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, #000 22%, #000 78%, transparent 100%)",
          }}
        />

        {/* Warm glow from the top edge, matching the process section */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-80 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 0%, rgba(74,124,89,0.18), transparent 70%)",
          }}
        />

        {/* Progress rail */}
        <div
          aria-hidden
          className="absolute left-6 md:left-10 top-[22vh] bottom-[22vh] w-px bg-white/10"
        >
          <motion.div
            className="absolute inset-x-0 top-0 bg-accent/70 origin-top"
            style={{ height: "100%", scaleY: railScale }}
          />
        </div>

        <Container className="relative h-full">
          <div className="relative h-full text-center">
            {BEATS.map((beat, i) => (
              <BeatBlock
                key={i}
                beat={beat}
                index={i}
                progress={progress}
                reduced={reduced}
              />
            ))}

            {/* The turn */}
            <motion.p
              style={{ opacity: turnOpacity, y: turnY }}
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 font-heading font-semibold text-[34px] sm:text-5xl md:text-[56px] leading-[1.02] tracking-[-0.02em] text-text-on-dark px-2"
            >
              That&apos;s why we built Fig.
            </motion.p>
          </div>
        </Container>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-on-dark-muted/70">
            Scroll
          </span>
          <span className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
            <motion.span
              className="w-1 h-1.5 rounded-full bg-white/40"
              animate={{ y: [0, 9, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
