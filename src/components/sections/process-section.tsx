"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { PROCESS_STEPS } from "@/lib/constants";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

const LAST = PROCESS_STEPS.length - 1;

// Under the caption the photo darkens so the text stays readable whatever the picture.
const CAPTION_SHADE =
  "linear-gradient(to top, rgba(18,27,22,0.82) 0%, rgba(18,27,22,0.45) 32%, rgba(18,27,22,0) 62%)";

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export function ProcessSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const squareRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [fill, setFill] = useState(0);

  // Where the pinned block sits relative to its scroll track: 0 at the first step, 1 at the last.
  const geometry = () => {
    const track = trackRef.current!;
    const pinH = pinRef.current!.offsetHeight;
    const rect = track.getBoundingClientRect();
    const top = (window.innerHeight - pinH) / 2;
    const total = track.offsetHeight - pinH;
    return { rect, top, total };
  };

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!trackRef.current || !pinRef.current) return;
      const { rect, top, total } = geometry();
      const p = clamp01((top - rect.top) / total);
      const first = squareRefs.current[0];
      const last = squareRefs.current[LAST];
      if (first && last) {
        const span = last.getBoundingClientRect().top - first.getBoundingClientRect().top;
        setFill(p * span);
      }
      setActive(Math.round(p * LAST));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = (k: number) => {
    const { rect, top, total } = geometry();
    window.scrollTo({
      top: window.scrollY + rect.top - top + (k / LAST) * total + 1,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="process"
      className="pt-24 md:pt-32 [--pinH:88svh] lg:[--pinH:min(76vh,640px)]"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, var(--bg-secondary) 0px, var(--bg-primary) 240px)",
      }}
    >
      <Container>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 items-end mb-10"
        >
          <div>
            <span className="block font-mono text-[11px] tracking-[0.16em] uppercase text-accent-hover mb-4">
              How we work
            </span>
            <h2 className="font-heading text-4xl md:text-5xl leading-[1.05] text-text-primary text-balance">
              We show up, we build, and we stay.
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-text-secondary max-w-md lg:justify-self-end">
            Five steps. You always know what&apos;s happening and what&apos;s
            next. Keep scrolling and each one comes into focus.
          </p>
        </motion.div>

        {/* The track is tall; the block inside it pins while the track scrolls past. */}
        <div ref={trackRef} className="relative h-[calc(var(--pinH)+4*62vh+10vh)]">
          <div
            ref={pinRef}
            className="sticky top-[calc((100vh-var(--pinH))/2)] h-[var(--pinH)]"
          >
            <div className="grid h-full grid-cols-1 grid-rows-[46%_1fr] gap-4 lg:grid-cols-[5fr_7fr] lg:grid-rows-1 lg:gap-14">
              {/* Steps and rail */}
              <div className="relative flex flex-col justify-between h-full order-2 lg:order-1">
                <span aria-hidden className="absolute left-4 top-[17px] bottom-[17px] w-[2px] rounded-full bg-border" />
                <span
                  aria-hidden
                  className="absolute left-4 top-[17px] w-[2px] rounded-full bg-accent transition-[height] duration-200 ease-linear"
                  style={{ height: fill }}
                />
                {PROCESS_STEPS.map((step, i) => {
                  const on = i === active;
                  const done = i < active;
                  return (
                    <div
                      key={step.number}
                      role="button"
                      tabIndex={0}
                      aria-label={`${step.title}, step ${i + 1} of ${PROCESS_STEPS.length}`}
                      aria-current={on ? "step" : undefined}
                      onClick={() => goTo(i)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          goTo(i);
                        }
                      }}
                      className="group grid grid-cols-[34px_1fr] gap-[18px] cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg-primary"
                    >
                      <span className="relative z-[1] block">
                        <span
                          ref={(el) => {
                            squareRefs.current[i] = el;
                          }}
                          className={cn(
                            "grid place-items-center w-[34px] h-[34px] rounded-[9px] font-mono text-xs border transition-[background-color,color,border-color,transform] duration-300",
                            on
                              ? "bg-accent border-accent text-white scale-[1.08]"
                              : done
                                ? "bg-bg-manila border-transparent text-text-primary"
                                : "bg-bg-primary border-border text-text-secondary"
                          )}
                        >
                          {step.number}
                        </span>
                      </span>
                      <span className="pt-1">
                        <h3
                          className={cn(
                            "font-heading text-[22px] lg:text-[26px] leading-[1.1] transition-colors duration-300 group-hover:text-text-primary",
                            on ? "text-text-primary" : "text-text-secondary"
                          )}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={cn(
                            "mt-1.5 text-[14.5px] leading-normal text-text-secondary max-w-[38ch] transition-opacity duration-300 lg:block",
                            on ? "block opacity-100" : "hidden lg:opacity-55"
                          )}
                        >
                          {step.description}
                        </p>
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* One picture per step */}
              <div className="relative h-full rounded-[22px] overflow-hidden text-text-on-dark order-1 lg:order-2">
                {PROCESS_STEPS.map((step, i) => {
                  const on = i === active;
                  return (
                    <div
                      key={step.number}
                      aria-hidden={!on}
                      className={cn(
                        "absolute inset-0 transition-[opacity,transform] duration-700 ease-out",
                        on ? "opacity-100 scale-100" : "opacity-0 scale-[1.04]"
                      )}
                    >
                      <Image
                        src={step.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 700px, 100vw"
                        quality={88}
                        className="object-cover"
                      />
                      <span aria-hidden className="absolute inset-0" style={{ background: CAPTION_SHADE }} />
                      <div className="absolute left-7 right-7 bottom-7 lg:left-8 lg:right-8 lg:bottom-8">
                        <span className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-text-on-dark/70">
                          {step.when}
                        </span>
                        <strong className="block mt-2.5 font-heading font-normal text-[20px] lg:text-[26px] leading-[1.2] tracking-[-0.01em] max-w-[24ch]">
                          {step.deliverable}
                        </strong>
                      </div>
                    </div>
                  );
                })}
                <div className="absolute top-[22px] right-6 flex gap-1.5" aria-hidden>
                  {PROCESS_STEPS.map((step, i) => (
                    <span
                      key={step.number}
                      className={cn(
                        "w-[22px] h-[3px] rounded-full transition-colors duration-300",
                        i <= active ? "bg-text-on-dark" : "bg-text-on-dark/30"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 pb-24 md:pb-32 flex flex-col sm:flex-row sm:justify-between gap-2 text-[13px] text-text-secondary">
          <span>
            A typical project runs{" "}
            <b className="font-medium text-text-primary">8 to 12 weeks</b> from the first call to
            handover.
          </span>
          <span>
            You talk to <b className="font-medium text-text-primary">one person</b> the whole way
            through.
          </span>
        </div>
      </Container>
    </section>
  );
}
