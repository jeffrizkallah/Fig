"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  const offsetX = useTransform(springX, [0, 1], [-20, 20]);
  const offsetY = useTransform(springY, [0, 1], [-20, 20]);
  const offsetX2 = useTransform(springX, [0, 1], [15, -15]);
  const offsetY2 = useTransform(springY, [0, 1], [15, -15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Soft gradient blobs */}
      <motion.div
        style={{ x: offsetX, y: offsetY }}
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/[0.06] blur-[100px]"
      />
      <motion.div
        style={{ x: offsetX2, y: offsetY2 }}
        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-accent-warm/[0.06] blur-[100px]"
      />

      {/* Animated SVG shapes */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A7C59" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#C4956A" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Organic flowing lines */}
        <motion.path
          d="M0 400 Q 200 300 400 400 Q 600 500 800 350 Q 1000 200 1200 400"
          fill="none"
          stroke="url(#line-grad)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M0 500 Q 300 400 500 500 Q 700 600 900 450 Q 1100 300 1200 500"
          fill="none"
          stroke="url(#line-grad)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2.5, delay: 0.8, ease: "easeInOut" }}
        />
        <motion.path
          d="M0 300 Q 250 200 450 350 Q 650 500 850 300 Q 1050 150 1200 300"
          fill="none"
          stroke="url(#line-grad)"
          strokeWidth="0.8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 3, delay: 1, ease: "easeInOut" }}
        />

        {/* Floating circles */}
        <motion.circle
          cx="200"
          cy="200"
          r="4"
          fill="#4A7C59"
          fillOpacity="0.2"
          animate={{
            cy: [200, 180, 200],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="800"
          cy="350"
          r="6"
          fill="#C4956A"
          fillOpacity="0.15"
          animate={{
            cy: [350, 330, 350],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.circle
          cx="1000"
          cy="250"
          r="3"
          fill="#4A7C59"
          fillOpacity="0.25"
          animate={{
            cy: [250, 235, 250],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </svg>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

const headlineWords = ["Your", "business,", "digitally", "reimagined."];

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <HeroBackground />

      <Container className="relative z-10">
        <div className="max-w-3xl">
          {/* Headline with word-by-word reveal */}
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + i * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="inline-block mr-[0.3em]"
              >
                {word === "digitally" ? (
                  <span className="text-accent">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-lg md:text-xl text-text-secondary max-w-xl mb-10 leading-relaxed"
          >
            We help companies modernise their systems, automate their workflows,
            and build digital solutions that drive efficiency, innovation, and
            growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button href="#contact" size="lg">
              Book a Free Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button href="#process" variant="secondary" size="lg">
              See How We Work
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
