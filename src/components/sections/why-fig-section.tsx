"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { DIFFERENTIATORS } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Check } from "lucide-react";

export function WhyFigSection() {
  return (
    <section id="about" className="py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - text content */}
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
              className="space-y-6"
            >
              {DIFFERENTIATORS.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-text-primary mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right - visual element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Abstract visual - layered cards representing the process */}
              <div className="absolute inset-0 rounded-3xl bg-bg-secondary border border-border" />
              <div className="absolute inset-4 rounded-2xl bg-white border border-border shadow-sm" />

              {/* Visual content inside */}
              <div className="absolute inset-8 flex flex-col justify-between p-6">
                {/* Mock dashboard elements */}
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-accent/40" />
                    <div className="w-3 h-3 rounded-full bg-accent-warm/40" />
                    <div className="w-3 h-3 rounded-full bg-border" />
                  </div>
                  <div className="h-3 w-3/4 rounded bg-bg-secondary" />
                  <div className="h-3 w-1/2 rounded bg-bg-secondary" />
                </div>

                {/* Chart-like bars */}
                <div className="flex items-end gap-3 h-32">
                  {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-t-md bg-accent/15"
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: 0.8 + i * 0.1,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>

                {/* Bottom stats */}
                <div className="flex gap-4">
                  <div className="flex-1 rounded-lg bg-accent/5 p-3 border border-accent/10">
                    <div className="font-mono text-xs text-accent font-bold">+42%</div>
                    <div className="text-[10px] text-text-secondary mt-1">Efficiency</div>
                  </div>
                  <div className="flex-1 rounded-lg bg-accent-warm/5 p-3 border border-accent-warm/10">
                    <div className="font-mono text-xs text-accent-warm font-bold">-68%</div>
                    <div className="text-[10px] text-text-secondary mt-1">Manual Work</div>
                  </div>
                  <div className="flex-1 rounded-lg bg-accent/5 p-3 border border-accent/10">
                    <div className="font-mono text-xs text-accent font-bold">3.2x</div>
                    <div className="text-[10px] text-text-secondary mt-1">ROI</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
