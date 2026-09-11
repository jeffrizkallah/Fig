"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { FAQS } from "@/lib/faqs";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

function FaqRow({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <motion.div
      variants={fadeInUp}
      className="border-b border-border last:border-b-0"
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="group w-full flex items-start justify-between gap-6 py-6 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-4 focus-visible:ring-offset-bg-secondary rounded-lg"
        >
          <span
            className={cn(
              "font-heading text-xl md:text-[26px] leading-[1.25] transition-colors duration-200",
              isOpen
                ? "text-text-primary"
                : "text-text-primary group-hover:text-accent-hover"
            )}
          >
            {question}
          </span>
          <span
            className={cn(
              "flex-shrink-0 mt-1 w-8 h-8 rounded-full border grid place-items-center transition-all duration-300",
              isOpen
                ? "bg-accent border-accent text-white rotate-45"
                : "bg-white border-border text-text-secondary group-hover:border-accent/40 group-hover:text-accent"
            )}
          >
            <Plus className="w-4 h-4" />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-7 pr-14 text-[16.5px] leading-relaxed text-text-secondary max-w-[62ch]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="pt-24 md:pt-32 pb-24 md:pb-28 bg-bg-secondary"
      style={{
        background:
          "linear-gradient(to bottom, var(--bg-primary) 0px, var(--bg-secondary) 260px)",
      }}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Heading rail */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-4 lg:sticky lg:top-32"
          >
            <span className="block font-mono text-[11px] tracking-[0.16em] uppercase text-accent-hover mb-4">
              FAQs
            </span>
            <h2 className="font-heading text-4xl md:text-5xl leading-[1.05] text-text-primary text-balance">
              You&apos;ve got questions. Fair enough.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-text-secondary max-w-sm">
              The things people ask us before they decide to work with us.
            </p>
          </motion.div>

          {/* Rows */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-8"
          >
            {FAQS.map((faq, i) => (
              <FaqRow
                key={faq.question}
                index={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
