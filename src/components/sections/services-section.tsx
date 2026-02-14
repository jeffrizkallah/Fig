"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SERVICES } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32 bg-bg-secondary">
      <Container>
        <SectionHeading
          label="What We Build"
          title="Digital solutions that work as hard as you do."
          subtitle="From custom software to AI-powered automation, we build the tools your business needs to thrive."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.title}
              variants={fadeInUp}
              className={cn(
                "group relative bg-white rounded-2xl border border-border p-8 transition-all duration-300",
                "hover:shadow-lg hover:shadow-accent/5 hover:border-accent/20 hover:-translate-y-1",
                service.span
              )}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <service.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
