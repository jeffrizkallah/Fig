"use client";

import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "lg";
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", href, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const variants = {
      primary:
        "bg-accent text-white hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98]",
      secondary:
        "border border-border text-text-primary hover:bg-bg-secondary hover:scale-[1.02] active:scale-[0.98]",
      ghost:
        "text-text-secondary hover:text-text-primary",
    };

    const sizes = {
      default: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    };

    if (href) {
      return (
        <a
          href={href}
          onClick={props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
          className={cn(baseStyles, variants[variant], sizes[size], className)}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
