"use client";

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceModal } from "@/components/ui/service-modal";
import { SERVICES, type Service } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleClose = useCallback(() => setSelectedService(null), []);

  return (
    <section
      id="services"
      className="pt-24 md:pt-32 pb-32 md:pb-40 bg-bg-secondary"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, var(--bg-primary) 0px, var(--bg-secondary) 260px)",
      }}
    >
      <Container>
        <SectionHeading
          label="What We Build"
          title="What we actually build."
          subtitle="Custom software, dashboards, automation and AI, built around the way your business already works."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-6 gap-4"
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.title}
              variants={fadeInUp}
              onClick={() => setSelectedService(service)}
              className={cn(
                "group relative bg-white rounded-2xl border border-border p-8 transition-all duration-300 cursor-pointer",
                "hover:shadow-lg hover:shadow-accent/5 hover:border-accent/20 hover:-translate-y-1",
                service.span
              )}
              role="button"
              tabIndex={0}
              aria-label={`Learn more about ${service.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedService(service);
                }
              }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <service.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl text-text-primary mb-2">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              <span className="absolute bottom-4 right-5 flex items-center gap-1 text-xs text-accent transition-all duration-300 group-hover:gap-1.5">
                Learn more
                <ArrowRight className="w-3 h-3" />
              </span>
            </motion.div>
          ))}
        </motion.div>

        <ServiceModal service={selectedService} onClose={handleClose} />
      </Container>
    </section>
  );
}
