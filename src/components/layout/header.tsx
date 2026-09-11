"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { useActiveSection } from "@/hooks/use-active-section";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const join = { type: "tween", duration: 0.55, ease: [0.22, 0.61, 0.36, 1] } as const;

/** The glass capsule. Shared layoutId lets it travel between the links group and the whole bar. */
function Pill() {
  return (
    <motion.span
      layoutId="nav-pill"
      transition={join}
      style={{ borderRadius: 9999 }}
      className="absolute inset-0 border border-black/[0.07] bg-white/70 backdrop-blur-xl shadow-[0_10px_40px_-16px_rgba(26,26,26,0.22)]"
      aria-hidden
    />
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection();

  // Read viewport + scroll before first paint so the bar starts in the right state without animating.
  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setDesktop(mq.matches);
    const onScroll = () => setScrolled(window.scrollY > 24);
    onChange();
    onScroll();
    mq.addEventListener("change", onChange);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // At the top on desktop the three pieces sit apart: logo left, links centre, button right.
  // Once you scroll they join into a single capsule. On phones it is always one capsule.
  const split = desktop && !scrolled && !mobileOpen;

  return (
    <>
      {/* The header itself is transparent; only the capsule carries a surface. */}
      <header className="fixed top-0 inset-x-0 z-50 px-3 pt-3 md:px-5 md:pt-4 pointer-events-none">
        <nav
          aria-label="Main"
          className={cn(
            "relative items-center",
            split
              ? "grid grid-cols-[1fr_auto_1fr] w-full"
              : "flex w-full md:w-fit md:mx-auto justify-between md:justify-start gap-2 py-1.5 md:py-0 pl-2.5 pr-1.5 pointer-events-auto"
          )}
        >
          {!split && <Pill />}

          <motion.div
            layout
            transition={join}
            className={cn("relative pointer-events-auto", split && "justify-self-start md:pl-1")}
          >
            <Logo />
          </motion.div>

          {/* Links */}
          <motion.div
            layout
            transition={join}
            className={cn(
              "relative hidden md:flex items-center gap-0.5 p-1.5 pointer-events-auto",
              split && "justify-self-center"
            )}
          >
            {split && <Pill />}
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative inline-flex items-center h-9 px-4 rounded-full text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-white border border-black/[0.05] shadow-[0_1px_2px_rgba(26,26,26,0.06)]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              );
            })}
          </motion.div>

          <motion.div
            layout
            transition={join}
            className={cn("relative hidden md:block pointer-events-auto", split && "justify-self-end")}
          >
            <Button href="#contact" className="h-9 px-4 py-0 text-sm">
              Book a call
            </Button>
          </motion.div>

          {/* Mobile toggle */}
          <button
            className="relative md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full text-text-primary hover:bg-black/[0.04] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu, outside the header so backdrop-filter cannot trap the fixed layer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 top-[72px] bg-bg-primary z-40"
          >
            <div className="flex flex-col items-center gap-8 pt-16">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-heading text-3xl text-text-primary"
                >
                  {item.label}
                </a>
              ))}
              <Button
                href="#contact"
                size="lg"
                onClick={() => setMobileOpen(false)}
              >
                Book a call
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
