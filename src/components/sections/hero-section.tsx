"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 0.61, 0.36, 1] as const },
});

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section>
      <div className="relative overflow-hidden bg-gradient-to-b from-[#FBFBF9] to-[#E9E9E2] min-h-svh flex items-end justify-center">
        {/* Fine vertical lines, fading in from the top */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(26,26,26,0.05) 0px, rgba(26,26,26,0.05) 1px, transparent 1px, transparent 5px)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, #000 45%, #000 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, #000 45%, #000 100%)",
          }}
        />
        {/* Soft green glow rising from the bottom */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(50% 42% at 50% 100%, rgba(74,124,89,0.16), transparent 70%)",
          }}
        />
        {/* Bottom edge dissolves into the page so the next section starts without a seam */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-44 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(250,250,247,0) 0%, rgba(250,250,247,0.6) 55%, var(--bg-primary) 100%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center gap-6 px-6 pt-32 pb-16 sm:pb-24">
          <motion.h1
            {...rise(0.15)}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            className="font-heading font-semibold text-[29px] min-[380px]:text-[32px] min-[440px]:text-[37px] sm:text-6xl md:text-7xl lg:text-[80px] leading-[1.04] sm:leading-[0.98] text-text-primary [text-wrap:nowrap] mx-auto"
          >
            {/* One fixed break at every width, so phones get the same two-line
                shape as desktop and it never depends on the browser's
                text-balance heuristic. */}
            We Build The Tools Your{" "}
            <br />
            Business Is <span className="text-accent">Missing.</span>
          </motion.h1>

          <motion.p
            {...rise(0.3)}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            className="max-w-none sm:max-w-[46ch] md:max-w-none text-[15px] min-[380px]:text-base sm:text-lg leading-relaxed text-text-secondary [text-wrap:nowrap] sm:[text-wrap:balance] md:[text-wrap:nowrap]"
          >
            {/* Phones get a fixed break so the subtitle sits in two lines under
                the two-line headline rather than three. From md up there is room
                for the whole sentence on one line, so the cap comes off. */}
            We find what&apos;s slowing you down,{" "}
            <br className="sm:hidden" />
            build it, and train your team to run it.
          </motion.p>

          <motion.div
            {...rise(0.45)}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            className="mt-2.5"
          >
            <Button
              href="#contact"
              size="lg"
              className="h-[52px] px-[26px] py-0 bg-text-primary hover:bg-bg-dark-lighter font-semibold"
            >
              Book a call
              <ArrowRight className="ml-2.5 h-[18px] w-[18px]" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
