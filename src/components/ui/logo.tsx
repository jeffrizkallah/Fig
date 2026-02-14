import { cn } from "@/lib/utils";

export function Logo({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <a
      href="#"
      className={cn(
        "font-heading text-2xl font-bold tracking-tight transition-colors",
        dark ? "text-text-on-dark" : "text-text-primary",
        className
      )}
    >
      Fig<span className="text-accent">.</span>
    </a>
  );
}
