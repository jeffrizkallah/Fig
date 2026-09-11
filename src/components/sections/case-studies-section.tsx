"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { CASE_STUDIES, type CaseStudy } from "@/lib/case-studies";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

function Sheet({
  variant,
  label,
  text,
}: {
  variant: "b1" | "b2" | "front";
  label: string;
  text: string;
}) {
  return (
    <div className={cn("case-sheet", variant)}>
      <span className="block font-mono text-[10px] tracking-[0.14em] uppercase text-accent-hover mb-[7px]">
        {label}
      </span>
      <p className="text-sm leading-normal text-text-primary">{text}</p>
    </div>
  );
}

const TAG =
  "font-mono text-[10.5px] tracking-[0.06em] uppercase text-text-secondary px-[9px] py-[5px] rounded-full border border-black/[0.09] bg-white/65";

export function CaseStudiesSection() {
  const reduce = useReducedMotion();
  // `active` drives the modal; `openedId` keeps the folder lifted until the modal has fully left.
  const [active, setActive] = useState<CaseStudy | null>(null);
  const [openedId, setOpenedId] = useState<string | null>(null);
  const [panelIn, setPanelIn] = useState(false);
  const folderRefs = useRef<Record<string, HTMLElement | null>>({});
  const closeRef = useRef<HTMLButtonElement>(null);
  const afterClose = useRef<(() => void) | null>(null);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  // The story rises in a beat after the panel itself.
  useEffect(() => {
    if (!active) {
      setPanelIn(false);
      return;
    }
    const t = setTimeout(() => setPanelIn(true), reduce ? 0 : 200);
    return () => clearTimeout(t);
  }, [active, reduce]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCase();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  function openCase(c: CaseStudy) {
    if (active) return;
    setOpenedId(c.id);
    setActive(c);
  }

  function closeCase(then?: () => void) {
    if (!active) return;
    afterClose.current = then ?? null;
    setActive(null);
  }

  // Runs once the panel has finished leaving: the folder settles, focus returns.
  function onClosed() {
    const id = openedId;
    setOpenedId(null);
    if (id) folderRefs.current[id]?.focus({ preventScroll: true });
    const then = afterClose.current;
    afterClose.current = null;
    then?.();
  }

  const spring = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 300, damping: 26, mass: 0.9 };
  const fade = reduce ? { duration: 0 } : { duration: 0.42, ease: [0.32, 0.72, 0, 1] as const };
  const leave = reduce ? { duration: 0 } : { duration: 0.36, ease: [0.32, 0.72, 0, 1] as const };

  return (
    <section id="work" className="py-24 md:py-32">
      <Container>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 items-end mb-12 lg:mb-14"
        >
          <div>
            <span className="block font-mono text-[11px] tracking-[0.16em] uppercase text-accent-hover mb-4">
              Case studies
            </span>
            <h2 className="font-heading text-4xl md:text-5xl leading-[1.05] text-text-primary text-balance">
              Three businesses. Three very different messes.
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-text-secondary max-w-md lg:justify-self-end">
            Three companies in Portugal, three very different problems. Open a
            folder to see what was slowing them down and what changed.
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 pt-3 pb-6 md:-mx-8 md:px-8 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:mx-0 lg:px-0 lg:pt-0 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {CASE_STUDIES.map((c) => (
            <article
              key={c.id}
              ref={(el) => {
                folderRefs.current[c.id] = el;
              }}
              data-state={openedId === c.id ? "opening" : "idle"}
              tabIndex={-1}
              className="case-folder relative flex flex-col shrink-0 w-[82%] sm:w-[60%] md:w-[46%] lg:w-auto snap-start min-h-[450px] rounded-[24px] border border-black/[0.07] bg-bg-manila overflow-hidden px-[26px] pt-[26px]"
            >
              <button
                type="button"
                onClick={() => openCase(c)}
                aria-haspopup="dialog"
                aria-label={`Open case study: ${c.name}`}
                className="absolute inset-0 z-[2] rounded-[24px] cursor-pointer focus-visible:outline-none"
              />
              <div>
                <h3 className="font-heading text-[27px] leading-[1.1] text-text-primary">{c.name}</h3>
                <p className="mt-1.5 text-[13px] text-text-secondary">
                  {c.sector} · {c.city}
                </p>
              </div>
              <div className="relative flex-1 -mx-[26px] mt-5 min-h-[300px]">
                <Sheet variant="b1" label="The result" text={c.result} />
                <Sheet variant="b2" label="What we built" text={c.built} />
                <Sheet variant="front" label="The struggle" text={c.struggle} />
                <div className="case-flap">
                  <div className="relative z-[1] flex flex-wrap gap-1.5">
                    {c.services.map((s) => (
                      <span key={s} className={TAG}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="relative z-[1] flex items-center justify-between text-sm font-medium text-text-primary">
                    <span>Open case study</span>
                    <span className="case-arrow inline-flex w-[30px] h-[30px] rounded-full bg-text-primary text-white items-center justify-center">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </motion.div>

        <p className="mt-10 text-[13px] text-text-secondary">
          Example clients and figures while the real ones are being collected.
        </p>
      </Container>

      <AnimatePresence onExitComplete={onClosed}>
        {active && (
          <div
            key="case-modal"
            className="fixed inset-0 z-[60] grid place-items-center p-6 max-md:p-0 max-md:items-end"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={fade}
              onClick={() => closeCase()}
              className="absolute inset-0 bg-text-primary/40 backdrop-blur-md"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="case-study-title"
              initial={{ opacity: 0, y: 64, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: spring }}
              exit={{ opacity: 0, y: 44, scale: 0.97, transition: leave }}
              onAnimationComplete={() => closeRef.current?.focus()}
              className={cn(
                "case-panel relative w-full max-w-[1060px] max-h-[min(860px,100%)] grid lg:grid-rows-[minmax(0,1fr)] lg:grid-cols-[320px_1fr] bg-white rounded-[28px] overflow-hidden shadow-[0_40px_80px_-30px_rgba(26,26,26,0.45)]",
                "max-md:rounded-b-none max-md:max-h-[94vh] max-md:overflow-auto scroll-subtle",
                panelIn && "is-in"
              )}
            >
              <button
                ref={closeRef}
                type="button"
                onClick={() => closeCase()}
                aria-label="Close case study"
                className="absolute top-[18px] right-[18px] z-[2] w-10 h-10 rounded-full border border-border bg-white grid place-items-center cursor-pointer transition-[background-color,transform] duration-300 hover:bg-bg-secondary hover:rotate-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <X className="w-4 h-4" />
              </button>

              <aside className="bg-bg-manila px-6 py-7 md:px-8 md:py-9 flex flex-col gap-7 lg:overflow-auto scroll-subtle">
                <div className="reveal">
                  <span className="block font-mono text-[11px] tracking-[0.16em] uppercase text-accent-hover">
                    Case study
                  </span>
                  <h3
                    id="case-study-title"
                    className="font-heading text-[34px] leading-[1.05] text-text-primary mt-3"
                  >
                    {active.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-text-secondary">
                    {active.sector} · {active.city}
                  </p>
                </div>
                <dl className="reveal flex flex-col gap-3.5 pt-[22px] border-t border-black/10">
                  {[
                    ["Timeline", active.timeline],
                    ["Team", active.team],
                  ].map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[84px_1fr] gap-3 items-start">
                      <dt className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-text-secondary pt-[3px]">
                        {k}
                      </dt>
                      <dd className="text-sm text-text-primary">{v}</dd>
                    </div>
                  ))}
                  <div className="grid grid-cols-[84px_1fr] gap-3 items-start">
                    <dt className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-text-secondary pt-[3px]">
                      Services
                    </dt>
                    <dd className="flex flex-wrap gap-[5px]">
                      {active.services.map((s) => (
                        <span key={s} className={TAG}>
                          {s}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
                <div className="reveal flex flex-row flex-wrap gap-5 lg:flex-col lg:gap-3.5 pt-[22px] border-t border-black/10 lg:mt-auto">
                  {active.metrics.map((m) => (
                    <div key={m.label}>
                      <b className="block font-heading font-normal text-[28px] lg:text-4xl leading-none tracking-[-0.02em] text-accent-hover tabular-nums">
                        {m.value}
                      </b>
                      <span className="block mt-[5px] text-[13px] text-text-secondary">{m.label}</span>
                    </div>
                  ))}
                </div>
              </aside>

              <div className="px-6 py-7 md:px-12 md:py-11 flex flex-col gap-8 lg:overflow-auto scroll-subtle">
                {(
                  [
                    ["The struggle", active.struggle, null],
                    ["What we built", active.built, active.bullets],
                    ["The result", active.result, null],
                  ] as [string, string, string[] | null][]
                ).map(([title, text, bullets]) => (
                  <div key={title} className="reveal">
                    <h4 className="font-mono font-medium text-[11px] tracking-[0.16em] uppercase text-accent-hover mb-2.5">
                      {title}
                    </h4>
                    <p className="text-[17px] leading-[1.6] text-text-primary max-w-[62ch]">{text}</p>
                    {bullets && (
                      <ul className="mt-3.5 flex flex-col gap-2">
                        {bullets.map((b) => (
                          <li key={b} className="relative pl-5 text-[15px] text-text-primary">
                            <span className="absolute left-0 top-[9px] w-2 h-2 rounded-full bg-accent" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                <blockquote className="reveal m-0 p-7 rounded-[18px] bg-bg-primary border border-border">
                  <p className="font-heading text-[23px] leading-[1.35] tracking-[-0.01em] text-text-primary text-pretty">
                    &ldquo;{active.quote}&rdquo;
                  </p>
                  <footer className="flex items-center gap-3 mt-5">
                    <span className="w-10 h-10 rounded-full grid place-items-center bg-accent text-white font-heading text-[15px] tracking-[0.02em]">
                      {initials(active.who)}
                    </span>
                    <div>
                      <strong className="block font-medium text-sm text-text-primary">{active.who}</strong>
                      <span className="block text-[13px] text-text-secondary">{active.role}</span>
                    </div>
                  </footer>
                </blockquote>

                <div className="reveal flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-7 border-t border-border">
                  <p className="font-heading text-[22px] tracking-[-0.01em] text-text-primary">
                    Have a similar problem?
                  </p>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      closeCase(() =>
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                      );
                    }}
                    className="inline-flex items-center gap-2.5 h-[46px] px-[22px] rounded-full bg-text-primary text-white text-sm font-medium transition-[background-color,transform] duration-300 hover:bg-accent hover:scale-[1.02]"
                  >
                    Book a call
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
