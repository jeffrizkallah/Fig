"use client";

import { motion } from "motion/react";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  className,
  align = "center",
  dark = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <span
          className={cn(
            "font-mono text-sm tracking-wider uppercase mb-4 block",
            dark ? "text-accent-warm" : "text-accent"
          )}
        >
          {label}
        </span>
      )}
      <h2
        className={cn(
          "font-heading text-4xl md:text-5xl font-bold tracking-tight",
          dark ? "text-text-on-dark" : "text-text-primary"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg max-w-2xl",
            align === "center" && "mx-auto",
            dark ? "text-text-on-dark-muted" : "text-text-secondary"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
