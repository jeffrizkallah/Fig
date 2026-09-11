"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function FinalCtaSection() {
  return (
    <section className="relative bg-bg-secondary pb-24 md:pb-32">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative overflow-hidden rounded-[32px] bg-bg-dark px-8 py-20 md:px-16 md:py-28 text-center"
        >
          {/* Glow from below, mirroring the hero's upward light */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-96 pointer-events-none"
            style={{
              background:
                "radial-gradient(55% 100% at 50% 100%, rgba(74,124,89,0.26), transparent 72%)",
            }}
          />

          {/* Fine vertical rule texture, as on the hero */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-[0.55]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(245,245,240,0.05) 0px, rgba(245,245,240,0.05) 1px, transparent 1px, transparent 5px)",
              WebkitMaskImage:
                "linear-gradient(to top, transparent 0%, #000 60%, #000 100%)",
              maskImage:
                "linear-gradient(to top, transparent 0%, #000 60%, #000 100%)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-7">
            <motion.h2
              variants={fadeInUp}
              className="font-heading font-semibold text-[34px] sm:text-5xl md:text-[56px] leading-[1.04] tracking-[-0.02em] text-text-on-dark text-balance max-w-[18ch]"
            >
              Every business gets there eventually. The ones that choose{" "}
              <span className="text-accent-soft">when</span>, win.
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-lg leading-relaxed text-text-on-dark-muted"
            >
              We help you choose when.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-2">
              <Button
                href="#contact"
                size="lg"
                className="h-[52px] px-[26px] py-0 bg-white text-text-primary hover:bg-white/90 font-semibold"
              >
                Book a call
                <ArrowRight className="ml-2.5 h-[18px] w-[18px]" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
