"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useActiveSection } from "@/hooks/use-active-section";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          mobileOpen
            ? "bg-bg-primary border-b border-border shadow-sm"
            : scrolled
              ? "bg-bg-primary/80 backdrop-blur-lg border-b border-border shadow-sm"
              : "bg-transparent"
        )}
      >
        <Container>
          <nav className="flex items-center justify-between h-20">
            <Logo />

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors duration-200",
                    active === item.href.slice(1)
                      ? "text-accent"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {item.label}
                  {active === item.href.slice(1) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              ))}
              <Button href="#contact" size="default">
                Book a Chat
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 text-text-primary"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </Container>
      </header>

      {/* Mobile menu — rendered outside <header> to avoid backdrop-filter creating a containing block for fixed positioning */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 top-20 bg-bg-primary z-40"
          >
            <div className="flex flex-col items-center gap-8 pt-16">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <Button
                href="#contact"
                size="lg"
                onClick={() => setMobileOpen(false)}
              >
                Book a Chat
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
