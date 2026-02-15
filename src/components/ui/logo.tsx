import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <a
      href="#"
      className={cn("flex items-center gap-0 transition-opacity hover:opacity-80", className)}
    >
      <Image
        src="/Sliced Fig Logo with Cartoon Style.png"
        alt="Fig"
        width={36}
        height={36}
        className=""
      />
      <span
        className={cn(
          "font-heading text-xl font-bold tracking-tight",
          dark ? "text-text-on-dark" : "text-text-primary"
        )}
      >
        Fig
      </span>
    </a>
  );
}
