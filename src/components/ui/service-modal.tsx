"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check } from "lucide-react";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { ServiceMockup } from "@/components/ui/service-mockups";
import type { Service } from "@/lib/constants";

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
}

export function ServiceModal({ service, onClose }: ServiceModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = service !== null;

  useBodyScrollLock(isOpen);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus close button on open
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  // Focus trap
  const handleTabTrap = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !modalRef.current) return;
    const focusable = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  return (
    <AnimatePresence>
      {service && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${service.title} details`}
          ref={modalRef}
          onKeyDown={handleTabTrap}
        >
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal-panel"
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl border border-border shadow-2xl z-[10001]"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 6 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
              mass: 0.8,
            }}
          >
            {/* Close button */}
            <div className="sticky top-0 z-10 flex justify-end p-4 pb-0">
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-bg-secondary/80 backdrop-blur-sm flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="px-8 pb-8 pt-2">
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  <service.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-text-primary">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary text-sm mt-1">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-border mb-6" />

              {/* Extended description */}
              <div className="mb-6">
                <p className="text-text-secondary leading-relaxed">
                  {service.extendedDescription}
                </p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="font-heading text-sm font-semibold text-text-primary uppercase tracking-wider mb-3">
                  Key Capabilities
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((feature) => (
                    <li
                      key={feature.label}
                      className="flex items-center gap-2"
                    >
                      <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                      <span className="text-sm text-text-secondary">
                        {feature.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual mockup + use case */}
              <div className="rounded-xl bg-accent/5 border border-accent/10 p-5">
                <div className="mb-4">
                  <ServiceMockup mockupId={service.useCase.mockupId} />
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {service.useCase.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
