"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PROCESS_STEPS } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function ProcessSection() {
  return (
    <section id="process" className="py-24 md:py-32 bg-bg-dark overflow-hidden">
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
          className="relative"
        >
          {/* Connecting line */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-px w-[2px]">
            <motion.div
              className="w-full bg-gradient-to-b from-accent/40 via-accent/20 to-transparent"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
            />
          </div>

          <div className="space-y-12 md:space-y-0">
            {PROCESS_STEPS.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={step.number}
                  variants={fadeInUp}
                  className="relative md:grid md:grid-cols-2 md:gap-16 md:py-10"
                >
                  {/* Step number dot on the center line */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-10 w-10 h-10 rounded-full bg-bg-dark border-2 border-accent/40 items-center justify-center z-10">
                    <span className="font-mono text-xs text-accent font-bold">
                      {step.number}
                    </span>
                  </div>

                  {/* Content - alternating sides */}
                  <div
                    className={`${
                      isEven
                        ? "md:text-right md:pr-16"
                        : "md:col-start-2 md:pl-16"
                    }`}
                  >
                    <div className="bg-bg-dark-lighter rounded-2xl p-8 border border-border-dark/50 transition-all duration-300 hover:border-accent/20">
                      <span className="md:hidden font-mono text-xs text-accent mb-3 block">
                        {step.number}
                      </span>
                      <h3 className="font-heading text-2xl font-bold text-text-on-dark mb-3">
                        {step.title}
                      </h3>
                      <p className="text-text-on-dark-muted leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Empty col for alignment on the other side */}
                  {isEven && <div className="hidden md:block" />}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
